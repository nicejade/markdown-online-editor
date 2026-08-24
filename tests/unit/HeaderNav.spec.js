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

jest.mock('@/components/Icon.vue', () => ({
  name: 'Icon',
  render(h) {
    return h('span')
  },
}))

import { shallowMount } from '@vue/test-utils'
import HeaderNav from '@/pages/partials/HeaderNav.vue'

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
})
