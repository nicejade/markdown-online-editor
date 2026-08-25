/** @format */

import {
  THEME_STORAGE_KEY,
  DEFAULT_THEME_ID,
  THEMES,
  getThemeId,
  applyTheme,
  getThemeById,
  initTheme,
} from '@helper/theme'

describe('theme helper', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.removeAttribute('data-scheme')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.remove()
  })

  it('exposes a catalog of named palettes', () => {
    const ids = THEMES.map((theme) => theme.id)
    expect(ids).toEqual(['paper', 'moon', 'celadon', 'cinnabar', 'night', 'pine'])
    expect(DEFAULT_THEME_ID).toBe('paper')
  })

  it('falls back to paper when nothing is stored', () => {
    expect(getThemeId()).toBe(DEFAULT_THEME_ID)
  })

  it('ignores unknown stored theme ids', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'neon')
    expect(getThemeId()).toBe('paper')
  })

  it('applies a theme to the document and persists it', () => {
    const theme = applyTheme('night')
    expect(theme.id).toBe('night')
    expect(document.documentElement.getAttribute('data-theme')).toBe('night')
    expect(document.documentElement.getAttribute('data-scheme')).toBe('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('night')
    expect(getThemeId()).toBe('night')
  })

  it('falls back when applying an unknown id', () => {
    applyTheme('does-not-exist')
    expect(document.documentElement.getAttribute('data-theme')).toBe('paper')
    expect(document.documentElement.getAttribute('data-scheme')).toBe('light')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('paper')
  })

  it('looks up catalog entries by id', () => {
    expect(getThemeById('celadon').name).toBe('青瓷')
    expect(getThemeById('missing')).toBe(null)
  })

  it('restores the stored theme on init', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'pine')
    const theme = initTheme()
    expect(theme.id).toBe('pine')
    expect(document.documentElement.getAttribute('data-scheme')).toBe('dark')
  })

  it('updates theme-color meta when present', () => {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    meta.setAttribute('content', '#000000')
    document.head.appendChild(meta)
    applyTheme('moon')
    expect(meta.getAttribute('content')).toBe('#eef2f6')
  })
})
