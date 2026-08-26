/**
 * Generate brand-styled star-history SVGs for the README.
 *
 * 横轴为年份（对齐每年 1 月 1 日），纵轴为 Star 数量。
 * Requires GITHUB_TOKEN to read stargazer timestamps (available as
 * ${{ github.token }} inside this repo's Actions). Fails hard if history
 * cannot be fetched — never writes a fake straight-line chart.
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const OWNER = process.env.STAR_HISTORY_OWNER || 'nicejade'
const REPO = process.env.STAR_HISTORY_REPO || 'markdown-online-editor'
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.STAR_HISTORY_TOKEN || ''
const OUT_DIR = process.env.STAR_HISTORY_OUT || '.github/shieldcn'
const WIDTH = 800
const HEIGHT = 360
const BRAND = '#f59e0b'
const MAX_POINTS = 48
const Y_TICKS = 4
const MAX_X_TICKS = 9
const MAX_PAGE = 400

const THEMES = {
  light: {
    muted: '#636366',
    grid: 'rgba(0,0,0,0.08)',
    areaOpacity: 0.22,
  },
  dark: {
    muted: '#a1a1aa',
    grid: 'rgba(255,255,255,0.12)',
    areaOpacity: 0.28,
  },
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function r2(n) {
  return Math.round(n * 100) / 100
}

function niceMax(value) {
  if (value <= 5) return 5
  const pow = Math.pow(10, Math.floor(Math.log10(value)))
  for (const s of [1, 2, 2.5, 5, 10]) {
    const candidate = s * pow
    if (candidate >= value) return candidate
  }
  return 10 * pow
}

function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}k`
  return String(Math.round(n))
}

/**
 * X-axis ticks anchored to Jan 1 (UTC) of each year in range, plus the
 * left edge labeled with its starting year — e.g. 2018 … 2026.
 */
function buildYearTicks(tMin, tMax) {
  const ticks = [{ t: tMin, label: String(new Date(tMin).getUTCFullYear()) }]
  const startYear = new Date(tMin).getUTCFullYear() + 1
  const endYear = new Date(tMax).getUTCFullYear()
  for (let y = startYear; y <= endYear; y++) {
    const t = Date.UTC(y, 0, 1)
    if (t > tMin && t <= tMax) ticks.push({ t, label: String(y) })
  }
  if (ticks.length > MAX_X_TICKS) {
    const step = Math.ceil(ticks.length / MAX_X_TICKS)
    return ticks.filter((_, i) => i % step === 0 || i === ticks.length - 1)
  }
  return ticks
}

function evenSpread(start, end, count) {
  if (count <= 1) return [start]
  const out = []
  for (let i = 0; i < count; i++) {
    out.push(Math.round(start + ((end - start) * i) / (count - 1)))
  }
  return [...new Set(out)]
}

async function ghFetch(url, accept) {
  const res = await fetch(url, {
    headers: {
      Accept: accept,
      Authorization: `Bearer ${TOKEN}`,
      'User-Agent': 'markdown-online-editor-star-history',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (res.status === 403 || res.status === 429) {
    throw new Error(
      `GitHub rate limited (${res.status}). Remaining: ${res.headers.get('x-ratelimit-remaining') ?? '?'}`,
    )
  }
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`GitHub ${res.status} ${url}: ${body.slice(0, 240)}`)
  }
  return res
}

async function fetchStarPage(page) {
  const url = `https://api.github.com/repos/${encodeURIComponent(OWNER)}/${encodeURIComponent(REPO)}/stargazers?per_page=100&page=${page}`
  const res = await ghFetch(url, 'application/vnd.github.v3.star+json')
  const json = await res.json()
  if (!Array.isArray(json)) return []
  return json.map((s) => s.starred_at).filter((d) => typeof d === 'string')
}

async function fetchMeta() {
  const res = await ghFetch(
    `https://api.github.com/repos/${encodeURIComponent(OWNER)}/${encodeURIComponent(REPO)}`,
    'application/vnd.github.v3+json',
  )
  return res.json()
}

/**
 * Reconstruct cumulative star history.
 * Small/medium repos: every page (exact). Large: sample pages evenly.
 */
async function getStarHistory(total) {
  const pages = Math.min(MAX_PAGE, Math.max(1, Math.ceil(total / 100)))
  const pageNums =
    pages <= MAX_POINTS ? evenSpread(1, pages, pages) : evenSpread(1, pages, MAX_POINTS)

  const results = await Promise.all(pageNums.map((p) => fetchStarPage(p)))
  const points = []

  if (pages <= MAX_POINTS) {
    // Exact: flatten all starred_at, cumulative index.
    const dates = results.flat()
    if (!dates.length) {
      throw new Error('Stargazers API returned no starred_at timestamps')
    }
    const step = Math.max(1, Math.floor(dates.length / MAX_POINTS))
    for (let i = 0; i < dates.length; i += step) {
      points.push({ t: new Date(dates[i]).getTime(), v: i + 1 })
    }
    const lastIdx = dates.length - 1
    if (points[points.length - 1].v !== dates.length) {
      points.push({ t: new Date(dates[lastIdx]).getTime(), v: dates.length })
    }
  } else {
    // Sampled: first star of each sampled page ≈ page * 100.
    pageNums.forEach((page, i) => {
      const first = results[i][0]
      if (!first) return
      points.push({ t: new Date(first).getTime(), v: Math.min(total, (page - 1) * 100 + 1) })
    })
  }

  // Anchor at "now" with live total.
  const now = Date.now()
  if (!points.length) throw new Error('No star history points reconstructed')
  if (now > points[points.length - 1].t) {
    points.push({ t: now, v: total })
  } else {
    points[points.length - 1].v = total
  }

  return points
}

function renderSvg(points, mode) {
  const theme = THEMES[mode]
  const pad = { top: 24, right: 36, bottom: 36, left: 52 }
  const plotW = WIDTH - pad.left - pad.right
  const plotH = HEIGHT - pad.top - pad.bottom

  const tMin = points[0].t
  const tMax = points[points.length - 1].t || tMin + 1
  const yMax = niceMax(Math.max(...points.map((p) => p.v), 1))

  const xOf = (t) => pad.left + ((t - tMin) / (tMax - tMin || 1)) * plotW
  const yOf = (v) => pad.top + plotH - (v / yMax) * plotH

  // Smooth path via polyline through sampled points (real timestamps).
  const linePts = points.map((p) => `${r2(xOf(p.t))},${r2(yOf(p.v))}`).join(' ')
  const areaPts = [
    `${r2(xOf(points[0].t))},${r2(pad.top + plotH)}`,
    ...points.map((p) => `${r2(xOf(p.t))},${r2(yOf(p.v))}`),
    `${r2(xOf(points[points.length - 1].t))},${r2(pad.top + plotH)}`,
  ].join(' ')

  let grid = ''
  for (let i = 0; i <= Y_TICKS; i++) {
    const v = (yMax * i) / Y_TICKS
    const y = r2(yOf(v))
    grid += `<line x1="${pad.left}" y1="${y}" x2="${pad.left + plotW}" y2="${y}" stroke="${theme.grid}" stroke-width="1"${i === 0 ? '' : ' stroke-dasharray="3 3"'} />`
    grid += `<text x="${pad.left - 10}" y="${y + 3.5}" text-anchor="end" font-size="11" fill="${theme.muted}" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">${esc(formatCount(v))}</text>`
  }

  const font = `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
  let xLabels = ''
  for (const tick of buildYearTicks(tMin, tMax)) {
    const x = r2(xOf(tick.t))
    const anchor = x < pad.left + 24 ? 'start' : x > pad.left + plotW - 24 ? 'end' : 'middle'
    xLabels += `<text x="${x}" y="${pad.top + plotH + 22}" text-anchor="${anchor}" font-size="11" fill="${theme.muted}" font-family="${font}">${esc(tick.label)}</text>`
  }

  const last = points[points.length - 1]
  const endDot = `<circle cx="${r2(xOf(last.t))}" cy="${r2(yOf(last.v))}" r="4" fill="${BRAND}" />`

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Star history of ${OWNER}/${REPO}">
  <defs>
    <linearGradient id="area-${mode}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${BRAND}" stop-opacity="${theme.areaOpacity}"/>
      <stop offset="100%" stop-color="${BRAND}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  ${grid}
  <polygon fill="url(#area-${mode})" points="${areaPts}"/>
  <polyline fill="none" stroke="${BRAND}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="${linePts}"/>
  ${endDot}
  ${xLabels}
</svg>
`
}

async function main() {
  if (!TOKEN) {
    throw new Error(
      'Missing GITHUB_TOKEN. Run in GitHub Actions, or export a PAT with stargazer read access.',
    )
  }

  const meta = await fetchMeta()
  const total = meta.stargazers_count || 0
  console.log(`Repo ${OWNER}/${REPO}: ${total} stars`)

  if (total <= 0) {
    throw new Error('Repository has 0 stars — nothing to chart')
  }

  const series = await getStarHistory(total)
  console.log(`Reconstructed ${series.length} curve points (real starred_at)`)

  mkdirSync(OUT_DIR, { recursive: true })
  for (const mode of ['light', 'dark']) {
    const path = join(OUT_DIR, `star-chart-${mode}.svg`)
    writeFileSync(path, renderSvg(series, mode))
    console.log(`Wrote ${path}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
