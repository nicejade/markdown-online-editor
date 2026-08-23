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
})
