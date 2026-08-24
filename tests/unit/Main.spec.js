/** @format */

const mockVditorApi = {
  setValue: jest.fn(),
  getValue: jest.fn(() => '# one'),
  focus: jest.fn(),
  insertValue: jest.fn(),
  lastOptions: null,
}

jest.mock('vditor', () => {
  return jest.fn().mockImplementation(function VditorMock(id, options) {
    mockVditorApi.lastOptions = options
    this.setValue = mockVditorApi.setValue
    this.getValue = mockVditorApi.getValue
    this.focus = mockVditorApi.focus
    this.insertValue = mockVditorApi.insertValue
  })
})

jest.mock('vditor/src/assets/less/index.less', () => ({}), { virtual: true })

jest.mock('hint.css', () => ({}))

jest.mock('@/pages/partials/HeaderNav.vue', () => ({
  name: 'HeaderNav',
  render(h) {
    return h('div')
  },
}))

jest.mock('@components/Sidebar', () => ({
  name: 'Sidebar',
  render(h) {
    return h('div')
  },
}))

jest.mock('@helper/analytics', () => ({
  trackEvent: jest.fn(),
}))

jest.mock('@helper/layout', () => ({
  isMobileViewport: jest.fn(() => false),
  sidebarCollapsedForViewport: jest.fn(({ collapsed }) => collapsed),
}))

jest.mock('@helper/storage', () => ({
  migrateFromLegacy: jest.fn(),
  getDocuments: jest.fn(() => [{ id: 'doc_1', title: '已有文档' }]),
  getActiveDocId: jest.fn(() => 'doc_1'),
  setActiveDocId: jest.fn(),
  getDocContent: jest.fn((id) => (id === 'doc_1' ? '# one' : '# two')),
  saveDocContent: jest.fn(),
  shouldPersistDocContent: jest.fn(() => true),
  createDocument: jest.fn(),
}))

import { shallowMount } from '@vue/test-utils'
import { getDocContent, setActiveDocId } from '@helper/storage'
import Main from '@/pages/Main.vue'

const stubs = ['HeaderNav', 'Sidebar']

function mountMain() {
  return shallowMount(Main, {
    stubs,
    directives: {
      loading() {},
    },
  })
}

describe('Main.vue document switching', () => {
  beforeEach(() => {
    mockVditorApi.setValue.mockReset()
    mockVditorApi.getValue.mockReset()
    mockVditorApi.getValue.mockReturnValue('# one')
    mockVditorApi.focus.mockReset()
    mockVditorApi.insertValue.mockReset()
    mockVditorApi.lastOptions = null
    getDocContent.mockClear()
    setActiveDocId.mockClear()
  })

  it('does not call setValue when switching documents before Vditor lute is ready', () => {
    const wrapper = mountMain()

    expect(() => wrapper.vm.onSelectDoc('doc_2')).not.toThrow()

    expect(setActiveDocId).toHaveBeenCalledWith('doc_2')
    expect(wrapper.vm.activeDocId).toBe('doc_2')
    expect(mockVditorApi.setValue).not.toHaveBeenCalled()

    wrapper.destroy()
  })

  it('keeps the loading mask until Vditor finishes initializing', async () => {
    const wrapper = mountMain()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isLoading).toBe(true)
    expect(wrapper.vm.editorReady).toBe(false)

    mockVditorApi.lastOptions.after()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.editorReady).toBe(true)
    expect(wrapper.vm.isLoading).toBe(false)

    wrapper.destroy()
  })

  it('applies the document selected while Vditor was still loading', () => {
    const wrapper = mountMain()
    wrapper.vm.onSelectDoc('doc_2')
    mockVditorApi.setValue.mockClear()

    mockVditorApi.lastOptions.after()

    expect(mockVditorApi.setValue).toHaveBeenCalledWith('# two')

    wrapper.destroy()
  })

  it('loads document content when switching after the editor is ready', () => {
    const wrapper = mountMain()
    mockVditorApi.lastOptions.after()
    mockVditorApi.setValue.mockClear()
    mockVditorApi.focus.mockClear()

    wrapper.vm.onSelectDoc('doc_2')

    expect(mockVditorApi.setValue).toHaveBeenCalledWith('# two')
    expect(mockVditorApi.focus).toHaveBeenCalled()

    wrapper.destroy()
  })
})
