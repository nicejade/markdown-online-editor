/** @format */

jest.mock('hint.css', () => ({}))

jest.mock('@helper/analytics', () => ({
  trackEvent: jest.fn(),
}))

jest.mock('@helper/storage', () => ({
  createDocument: jest.fn(),
  setActiveDocId: jest.fn(),
  saveDocContent: jest.fn(),
}))

jest.mock('@helper/theme', () => ({
  THEMES: [
    {
      id: 'paper',
      name: '纸墨',
      scheme: 'light',
      page: '#f7f4ee',
      swatch: ['#fffcf7', '#1c1917'],
    },
    {
      id: 'night',
      name: '夜读',
      scheme: 'dark',
      page: '#14120f',
      swatch: ['#1e1b16', '#ece6da'],
    },
  ],
  getThemeId: jest.fn(() => 'paper'),
  applyTheme: jest.fn((id) => ({
    id,
    name: id === 'night' ? '夜读' : '纸墨',
    scheme: id === 'night' ? 'dark' : 'light',
  })),
}))

jest.mock('@/components/Icon.vue', () => ({
  name: 'Icon',
  render(h) {
    return h('span')
  },
}))

import { shallowMount } from '@vue/test-utils'
import HeaderNav from '@/pages/partials/HeaderNav.vue'
import { applyTheme } from '@helper/theme'
import { trackEvent } from '@helper/analytics'

const stubs = ['icon', 'el-dropdown', 'el-dropdown-menu', 'el-dropdown-item', 'router-link']

describe('HeaderNav.vue', () => {
  it('hides the sidebar toggle by default so export pages stay clean', () => {
    const wrapper = shallowMount(HeaderNav, { stubs })

    expect(wrapper.find('.header-sidebar-toggle').exists()).toBe(false)

    wrapper.destroy()
  })

  it('shows a header control that can reopen the sidebar on mobile', () => {
    const wrapper = shallowMount(HeaderNav, {
      stubs,
      propsData: { showSidebarToggle: true },
    })

    const toggle = wrapper.find('.header-sidebar-toggle')
    expect(toggle.exists()).toBe(true)
    expect(toggle.attributes('aria-label')).toBe('文档列表')

    toggle.trigger('click')
    expect(wrapper.emitted('toggle-sidebar')).toBeTruthy()
    expect(wrapper.emitted('toggle-sidebar')).toHaveLength(1)

    wrapper.destroy()
  })

  it('exposes a header control for switching color themes', () => {
    const wrapper = shallowMount(HeaderNav, { stubs })
    const trigger = wrapper.find('[aria-label^="切换主题"]')

    expect(trigger.exists()).toBe(true)
    expect(trigger.attributes('aria-label')).toBe('切换主题，当前：纸墨')
    expect(wrapper.findAll('.theme-picker-name').length).toBe(2)

    wrapper.destroy()
  })

  it('applies the chosen theme and records it as current', () => {
    applyTheme.mockClear()
    trackEvent.mockClear()
    const wrapper = shallowMount(HeaderNav, { stubs })

    wrapper.vm.onSelectTheme('night')

    expect(applyTheme).toHaveBeenCalledWith('night')
    expect(wrapper.vm.currentThemeId).toBe('night')
    expect(trackEvent).toHaveBeenCalledWith('header_theme', 'header', 'night')

    wrapper.destroy()
  })
})
