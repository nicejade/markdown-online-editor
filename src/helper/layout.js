/** @format */

export const MOBILE_BREAKPOINT = 960

export function isMobileViewport(width) {
  const viewportWidth = typeof width === 'number' ? width : window.innerWidth
  return viewportWidth <= MOBILE_BREAKPOINT
}

export function sidebarCollapsedForViewport({ wasMobile, isMobile, collapsed }) {
  if (!wasMobile && isMobile) return true
  return collapsed
}
