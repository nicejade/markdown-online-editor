/** @format */

import { MOBILE_BREAKPOINT, isMobileViewport, sidebarCollapsedForViewport } from '@helper/layout'

describe('layout helpers', () => {
  it('treats 960px and below as the mobile drawer breakpoint', () => {
    expect(MOBILE_BREAKPOINT).toBe(960)
    expect(isMobileViewport(375)).toBe(true)
    expect(isMobileViewport(960)).toBe(true)
    expect(isMobileViewport(961)).toBe(false)
  })

  it('closes the sidebar when the viewport first enters mobile width', () => {
    expect(
      sidebarCollapsedForViewport({
        wasMobile: false,
        isMobile: true,
        collapsed: false,
      })
    ).toBe(true)
  })

  it('keeps the drawer open if the user already expanded it on mobile', () => {
    expect(
      sidebarCollapsedForViewport({
        wasMobile: true,
        isMobile: true,
        collapsed: false,
      })
    ).toBe(false)
  })

  it('does not reopen the sidebar when leaving the mobile breakpoint', () => {
    expect(
      sidebarCollapsedForViewport({
        wasMobile: true,
        isMobile: false,
        collapsed: true,
      })
    ).toBe(true)
  })
})
