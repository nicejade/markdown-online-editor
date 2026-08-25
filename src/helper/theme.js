/** @format
 * Theme persistence and application.
 * Stored in localStorage under arya_theme; applied as data-theme / data-scheme on <html>.
 */

import { THEMES, DEFAULT_THEME_ID } from '@config/themes'

export const THEME_STORAGE_KEY = 'arya_theme'

export { THEMES, DEFAULT_THEME_ID }

export function getThemeById(id) {
  return THEMES.find((theme) => theme.id === id) || null
}

export function getStoredThemeId() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

export function getThemeId() {
  const stored = getStoredThemeId()
  return getThemeById(stored) ? stored : DEFAULT_THEME_ID
}

export function applyTheme(id) {
  const theme = getThemeById(id) || getThemeById(DEFAULT_THEME_ID)
  const root = document.documentElement
  root.setAttribute('data-theme', theme.id)
  root.setAttribute('data-scheme', theme.scheme)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme.id)
  } catch {
    // private mode / quota — chrome still updates for this session
  }
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', theme.page)
  }
  return theme
}

export function initTheme() {
  return applyTheme(getThemeId())
}
