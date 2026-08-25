/** @format */

const PREVIEW_CHROME_SELECTORS = [
  '.vditor-copy',
  '.vditor-linenumber',
  '.vditor-speech',
  '.vditor-preview__action',
  '.vditor-anchor',
]

const PAGE_CSS = `
html, body {
  margin: 0;
  padding: 0;
  background: var(--c-page, #f7f4ee);
  color: var(--c-text, #1c1917);
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
}
article.vditor-reset {
  box-sizing: border-box;
  max-width: 42rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
  font-size: 17px;
  word-break: break-word;
  overflow-wrap: break-word;
}
article.vditor-reset img,
article.vditor-reset svg,
article.vditor-reset video {
  max-width: 100%;
  height: auto;
}
article.vditor-reset img {
  display: block;
}
article.vditor-reset [data-processed] {
  max-width: 100%;
  overflow: auto;
}
article.vditor-reset h1 {
  text-align: center;
}
article.vditor-reset a {
  color: inherit;
}
article.vditor-reset pre {
  overflow: auto;
  padding: 1em;
  border-radius: 8px;
  background: var(--c-grey, #f3f1ec);
  color: var(--c-text, #1c1917);
}
article.vditor-reset code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.9em;
}
article.vditor-reset table {
  border-collapse: collapse;
  display: block;
  overflow-x: auto;
  width: 100%;
}
article.vditor-reset th,
article.vditor-reset td {
  border: 1px solid var(--c-border-grey, #e7e3db);
  padding: 8px 12px;
}
article.vditor-reset blockquote {
  margin: 1em 0;
  padding: 0 1em;
  color: var(--c-text-2, #57534e);
  border-left: 3px solid var(--c-separator, #e7e3db);
}
article.vditor-reset hr {
  border: 0;
  height: 1px;
  background: var(--c-separator, #e7e3db);
}
article.vditor-reset input[type='checkbox'] {
  margin-right: 0.4em;
}
@media print {
  html, body { background: #fff; }
  article.vditor-reset { max-width: none; padding: 0; }
}
`.trim()

const HLJS_LIGHT = `
.hljs-comment, .hljs-quote { color: #6a737d; }
.hljs-keyword, .hljs-selector-tag, .hljs-deletion { color: #d73a49; }
.hljs-string, .hljs-attr, .hljs-addition { color: #032f62; }
.hljs-number, .hljs-literal, .hljs-variable { color: #005cc5; }
.hljs-title, .hljs-section { color: #6f42c1; }
.hljs-built_in, .hljs-type { color: #e36209; }
`.trim()

const HLJS_DARK = `
.hljs-comment, .hljs-quote { color: #8b949e; }
.hljs-keyword, .hljs-selector-tag, .hljs-deletion { color: #ff7b72; }
.hljs-string, .hljs-attr, .hljs-addition { color: #a5d6ff; }
.hljs-number, .hljs-literal, .hljs-variable { color: #79c0ff; }
.hljs-title, .hljs-section { color: #d2a8ff; }
.hljs-built_in, .hljs-type { color: #ffa657; }
`.trim()

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function isContentSelector(selectorText) {
  if (!selectorText) return false
  const selector = selectorText.toLowerCase()
  return (
    selector.indexOf('vditor-reset') !== -1 ||
    selector.indexOf('hljs') !== -1 ||
    selector.indexOf('katex') !== -1 ||
    selector.indexOf('language-') !== -1 ||
    selector.indexOf('mermaid') !== -1
  )
}

function collectRules(rules, out) {
  if (!rules) return
  const styleType = typeof CSSRule !== 'undefined' ? CSSRule.STYLE_RULE : 1
  const mediaType = typeof CSSRule !== 'undefined' ? CSSRule.MEDIA_RULE : 4
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    if (!rule) continue
    if (rule.type === styleType) {
      if (isContentSelector(rule.selectorText)) out.push(rule.cssText)
    } else if (rule.type === mediaType) {
      const nested = []
      collectRules(rule.cssRules, nested)
      if (nested.length) {
        out.push(`@media ${rule.conditionText} {\n${nested.join('\n')}\n}`)
      }
    }
  }
}

export function collectCssVars(root = document.documentElement) {
  const styles = window.getComputedStyle(root)
  const decls = []
  for (let i = 0; i < styles.length; i++) {
    const name = styles[i]
    if (name && name.indexOf('--') === 0) {
      decls.push(`${name}: ${styles.getPropertyValue(name).trim()};`)
    }
  }
  if (!decls.length) return ''
  return `:root {\n  ${decls.join('\n  ')}\n}`
}

export function collectContentCss() {
  const chunks = []
  const sheets = document.styleSheets || []
  for (let i = 0; i < sheets.length; i++) {
    try {
      collectRules(sheets[i].cssRules, chunks)
    } catch (error) {
      // Cross-origin stylesheets (KaTeX / highlight.js CDN) are not readable.
    }
  }
  return chunks.join('\n')
}

export function serializePreview(previewEl) {
  const clone = previewEl.cloneNode(true)
  PREVIEW_CHROME_SELECTORS.forEach((selector) => {
    clone.querySelectorAll(selector).forEach((node) => node.remove())
  })

  const sourceCanvases = previewEl.querySelectorAll('canvas')
  const clonedCanvases = clone.querySelectorAll('canvas')
  sourceCanvases.forEach((canvas, index) => {
    const cloned = clonedCanvases[index]
    if (!cloned || !cloned.parentNode) return
    try {
      const img = document.createElement('img')
      img.src = canvas.toDataURL('image/png')
      img.alt = canvas.getAttribute('aria-label') || ''
      img.style.maxWidth = '100%'
      img.style.height = 'auto'
      img.style.display = 'block'
      const wrapper = cloned.closest('[data-processed="true"]')
      const target = wrapper && wrapper !== clone ? wrapper : cloned
      if (!target.parentNode) return
      target.parentNode.replaceChild(img, target)
    } catch (error) {
      // Tainted canvas: keep the original node so the rest of the document still exports.
    }
  })

  return clone.innerHTML
}

export function buildStandaloneHtml(previewEl, title = 'Arya') {
  if (!previewEl) {
    throw new Error('preview element is required')
  }

  const scheme = document.documentElement.getAttribute('data-scheme') || 'light'
  const styles = [
    collectCssVars(),
    PAGE_CSS,
    scheme === 'dark' ? HLJS_DARK : HLJS_LIGHT,
    collectContentCss(),
  ]
    .filter(Boolean)
    .join('\n')

  return `<!DOCTYPE html>
<html lang="zh-CN" data-scheme="${escapeHtml(scheme)}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="generator" content="Arya Markdown Editor">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <style>
${styles}
  </style>
</head>
<body>
  <article class="vditor-reset">${serializePreview(previewEl)}</article>
</body>
</html>
`
}

export function downloadHtml(html, filename) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
