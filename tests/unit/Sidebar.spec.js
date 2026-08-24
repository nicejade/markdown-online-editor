/** @format */

jest.mock('@helper/storage', () => ({
  getDocuments: jest.fn(),
  createDocument: jest.fn(),
  renameDocument: jest.fn(),
  deleteDocument: jest.fn(),
}))

jest.mock('@helper/analytics', () => ({
  trackEvent: jest.fn(),
}))

jest.mock('@/components/Icon.vue', () => ({
  name: 'Icon',
  render(h) {
    return h('span')
  },
}))

jest.mock('element-ui', () => ({
  MessageBox: {
    confirm: jest.fn(),
  },
}))

import { shallowMount } from '@vue/test-utils'
import { getDocuments } from '@helper/storage'
import Sidebar from '@/components/Sidebar.vue'

describe('Sidebar.vue', () => {
  const existingDoc = {
    id: 'doc_1',
    title: '已有文档',
    createdAt: 1,
    updatedAt: 1,
  }
  const importedDoc = {
    id: 'doc_imported',
    title: '导入的文档',
    createdAt: 2,
    updatedAt: 2,
  }

  beforeEach(() => {
    getDocuments.mockReset()
    getDocuments.mockReturnValue([existingDoc])
  })

  it('refreshes document list when reload-content is emitted after import', async () => {
    const wrapper = shallowMount(Sidebar, {
      stubs: ['icon'],
      propsData: { activeDocId: existingDoc.id },
    })

    expect(wrapper.text()).toContain('已有文档')
    expect(wrapper.text()).not.toContain('导入的文档')

    getDocuments.mockReturnValue([importedDoc, existingDoc])
    wrapper.vm.$root.$emit('reload-content')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.documents).toEqual([importedDoc, existingDoc])
    expect(wrapper.text()).toContain('导入的文档')
    expect(wrapper.text()).toContain('已有文档')

    wrapper.destroy()
  })

  it('enters rename mode when a document title is double-clicked', async () => {
    const wrapper = shallowMount(Sidebar, {
      stubs: ['icon'],
      propsData: { activeDocId: existingDoc.id },
    })

    const title = wrapper.find('.sidebar__item-title')
    expect(title.exists()).toBe(true)

    await title.trigger('dblclick')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.editingId).toBe(existingDoc.id)
    expect(wrapper.vm.editingTitle).toBe(existingDoc.title)
    expect(wrapper.find('.sidebar__item-input').exists()).toBe(true)
    expect(wrapper.find('.sidebar__item-title').exists()).toBe(false)

    wrapper.destroy()
  })

  it('places the new document button above the document list', () => {
    const wrapper = shallowMount(Sidebar, {
      stubs: ['icon'],
      propsData: { activeDocId: existingDoc.id },
    })

    const panel = wrapper.find('.sidebar__panel')
    const panelHtml = panel.html()
    const actionsIndex = panelHtml.indexOf('sidebar__actions')
    const listIndex = panelHtml.indexOf('sidebar__list')

    expect(wrapper.find('.sidebar__actions .sidebar__new-btn').exists()).toBe(true)
    expect(wrapper.find('.sidebar__footer').exists()).toBe(false)
    expect(actionsIndex).toBeGreaterThan(-1)
    expect(listIndex).toBeGreaterThan(-1)
    expect(actionsIndex).toBeLessThan(listIndex)

    wrapper.destroy()
  })

  it('hides the collapsed rail toggle on mobile', async () => {
    const wrapper = shallowMount(Sidebar, {
      stubs: ['icon'],
      propsData: {
        activeDocId: existingDoc.id,
        collapsed: true,
        isMobile: true,
      },
    })

    expect(wrapper.find('.sidebar__toggle').isVisible()).toBe(false)
    expect(wrapper.classes()).toContain('is-mobile')

    await wrapper.setProps({ collapsed: false })
    expect(wrapper.find('.sidebar__panel').isVisible()).toBe(true)

    wrapper.destroy()
  })
})
