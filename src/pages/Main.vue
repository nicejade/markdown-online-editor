<!-- @format -->

<template>
  <div class="index-page" v-loading="isLoading">
    <HeaderNav :show-sidebar-toggle="isMobile" @toggle-sidebar="onToggleSidebar" />
    <div
      class="index-page__body"
      :class="{
        'is-sidebar-collapsed': sidebarCollapsed,
        'is-mobile': isMobile,
      }"
    >
      <div
        v-if="isMobile && !sidebarCollapsed"
        class="index-page__sidebar-overlay"
        @click="onToggleSidebar"
      />
      <div class="index-page__sidebar-layer">
        <Sidebar
          :collapsed="sidebarCollapsed"
          :is-mobile="isMobile"
          :active-doc-id="activeDocId"
          @select-doc="onSelectDoc"
          @doc-deleted="onDocDeleted"
          @toggle-sidebar="onToggleSidebar"
        />
      </div>
      <div class="index-page__editor">
        <div id="vditor" class="vditor" />
      </div>
    </div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/src/assets/less/index.less'
import HeaderNav from './partials/HeaderNav'
import Sidebar from '@components/Sidebar'
import defaultText from '@config/default'
import {
  migrateFromLegacy,
  getDocuments,
  getActiveDocId,
  setActiveDocId,
  getDocContent,
  saveDocContent,
  shouldPersistDocContent,
} from '@helper/storage'
import { trackEvent } from '@helper/analytics'
import { isMobileViewport, sidebarCollapsedForViewport } from '@helper/layout'

const SAVE_DEBOUNCE_MS = 1000

export default {
  name: 'index-page',

  data() {
    return {
      isLoading: true,
      isMobile: isMobileViewport(),
      vditor: null,
      activeDocId: null,
      sidebarCollapsed: isMobileViewport(),
      editorReady: false,
      saveTimer: null,
    }
  },

  created() {
    migrateFromLegacy(defaultText)
    if (getDocuments().length === 0) {
      const { createDocument } = require('@helper/storage')
      createDocument('未命名文档')
    }
    this.activeDocId = getActiveDocId() || (getDocuments()[0] && getDocuments()[0].id)
    if (this.activeDocId) {
      setActiveDocId(this.activeDocId)
    }
    console.log = () => {}
  },

  components: {
    HeaderNav,
    Sidebar,
  },

  mounted() {
    this.initVditor()
    this.$nextTick(() => {
      this.isLoading = false
    })
    this.$root.$on('reload-content', this.reloadContent)
    window.addEventListener('resize', this.onResize)
    window.addEventListener('orientationchange', this.onResize)
  },

  beforeDestroy() {
    this.saveCurrentDoc()
    this.$root.$off('reload-content', this.reloadContent)
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('orientationchange', this.onResize)
    if (this.saveTimer) clearTimeout(this.saveTimer)
  },

  methods: {
    onResize() {
      const wasMobile = this.isMobile
      this.isMobile = isMobileViewport()
      this.sidebarCollapsed = sidebarCollapsedForViewport({
        wasMobile,
        isMobile: this.isMobile,
        collapsed: this.sidebarCollapsed,
      })
    },
    onToggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
      trackEvent('sidebar_toggle', 'sidebar', this.sidebarCollapsed ? 'collapse' : 'expand')
    },
    initVditor() {
      const that = this
      const initialContent = getDocContent(this.activeDocId) || defaultText
      const options = {
        width: '100%',
        height: '0',
        tab: '\t',
        counter: '999999',
        typewriterMode: true,
        mode: 'sv',
        value: initialContent,
        cache: { enable: false },
        preview: {
          delay: 100,
          show: !this.isMobile,
        },
        outline: true,
        upload: {
          max: 5 * 1024 * 1024,
          handler(file) {
            let formData = new FormData()
            for (let i in file) {
              formData.append('smfile', file[i])
            }
            let request = new XMLHttpRequest()
            request.open('POST', 'https://sm.ms/api/upload')
            request.onload = that.onloadCallback
            request.send(formData)
          },
        },
        input: () => {
          that.debouncedSave()
        },
        after: () => {
          const content = getDocContent(this.activeDocId) || defaultText
          this.vditor.setValue(content)
          this.$nextTick(() => {
            this.editorReady = true
            if (!this.isMobile && this.vditor && this.vditor.focus) {
              this.vditor.focus()
            }
          })
        },
      }
      this.vditor = new Vditor('vditor', options)
    },
    persistActiveDoc(content) {
      if (!this.activeDocId) return
      const stored = getDocContent(this.activeDocId)
      if (!shouldPersistDocContent(content, stored, this.editorReady)) return
      saveDocContent(this.activeDocId, content)
    },
    debouncedSave() {
      if (this.saveTimer) clearTimeout(this.saveTimer)
      this.saveTimer = setTimeout(() => {
        if (this.vditor && typeof this.vditor.getValue === 'function') {
          this.persistActiveDoc(this.vditor.getValue())
        }
        this.saveTimer = null
      }, SAVE_DEBOUNCE_MS)
    },
    saveCurrentDoc() {
      if (this.saveTimer) {
        clearTimeout(this.saveTimer)
        this.saveTimer = null
      }
      if (this.activeDocId && this.vditor && typeof this.vditor.getValue === 'function') {
        this.persistActiveDoc(this.vditor.getValue())
      }
    },
    onSelectDoc(id) {
      this.saveCurrentDoc()
      setActiveDocId(id)
      this.activeDocId = id
      const content = getDocContent(id) || ''
      this.vditor.setValue(content)
      this.vditor.focus()
      if (this.isMobile) this.sidebarCollapsed = true
    },
    onDocDeleted() {
      this.activeDocId = getActiveDocId()
      if (this.activeDocId && this.vditor) {
        this.vditor.setValue(getDocContent(this.activeDocId) || '')
        this.vditor.focus()
      } else if (this.vditor) {
        this.vditor.setValue('')
      }
    },
    onloadCallback(oEvent) {
      const currentTarget = oEvent.currentTarget
      if (currentTarget.status !== 200) {
        trackEvent('editor_image_upload_error', 'editor', currentTarget.statusText)
        return this.$message({
          type: 'error',
          message: currentTarget.status + ' ' + currentTarget.statusText,
        })
      }
      let resp = JSON.parse(currentTarget.response)
      let imgMdStr = ''
      if (resp.code === 'invalid_source') {
        trackEvent('editor_image_upload_invalid', 'editor', resp.message)
        return this.$message({
          type: 'error',
          message: resp.message,
        })
      }
      if (resp.code === 'image_repeated') {
        imgMdStr = `![](${resp.images})`
      } else if (resp.code === 'success' || resp.success) {
        imgMdStr = `![${resp.data.filename}](${resp.data.url})`
      }
      this.vditor.insertValue(imgMdStr)
      trackEvent('editor_image_upload_success', 'editor', resp.data ? resp.data.filename : '')
    },
    reloadContent() {
      this.activeDocId = getActiveDocId()
      if (this.vditor && this.vditor.getValue) {
        const content = getDocContent(this.activeDocId) || ''
        this.vditor.setValue(content)
        this.vditor.focus()
      }
    },
  },
}
</script>

<style lang="less">
@import './../assets/styles/style.less';

.index-page {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background-color: transparent;
  display: flex;
  flex-direction: column;

  .index-page__body {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-top: @chrome-top;
    margin-left: auto;
    margin-right: auto;
    height: calc(100vh - @chrome-top);
    min-height: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding-left: @page-gutter + @sidebar-width + @panel-gap;
    transition: padding-left @duration-normal @ease-out;

    &.is-sidebar-collapsed {
      padding-left: @page-gutter + @sidebar-collapsed-width + @panel-gap;
    }

    &.is-mobile {
      padding-left: 0;
    }
  }

  .index-page__sidebar-layer {
    position: absolute;
    inset: 0;
    z-index: 120;
    overflow: visible;
    pointer-events: none;
  }

  .index-page__sidebar-overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 110;
    background: rgba(28, 25, 23, 0.18);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .index-page__editor {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: 0 @page-gutter @page-gutter 0;
    max-width: @max-body-width;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  // Editor chrome only — do not restyle markdown preview content
  .vditor {
    flex: 1;
    display: flex !important;
    flex-direction: column;
    height: 100% !important;
    min-height: 0 !important;
    max-height: 100%;
    text-align: left;
    overflow: visible;
    border: 1px solid @border-hairline !important;
    border-radius: @radius-xl !important;
    background: @paper !important;
    box-shadow: @shadow-sm;
    font-family: @font-family;

    // Override Vditor’s product-blue tokens (#4285f4)
    --border-color: fade(@text-primary, 8%);
    --second-color: fade(@text-primary, 18%);
    --panel-background-color: @paper;
    --panel-shadow: @shadow-sm;
    --toolbar-background-color: transparent;
    --toolbar-icon-color: @icon-grey;
    --toolbar-icon-hover-color: @text-primary;
    --textarea-background-color: @paper;
    --textarea-text-color: @text-primary;
    --resize-icon-color: @icon-grey;
    --resize-background-color: transparent;
    --resize-hover-icon-color: @text-primary;
    --resize-hover-background-color: fade(@text-primary, 8%);
    --count-background-color: fade(@text-primary, 4%);
    --heading-border-color: @separator;

    &:focus,
    &:focus-within {
      outline: none !important;
      box-shadow: none !important;
      border-color: @border-hairline !important;
    }

    .vditor-toolbar {
      position: relative;
      z-index: 30;
      flex-shrink: 0;
      overflow: visible;
      border-bottom: 1px solid @separator !important;
      background: @paper !important;
      padding: 8px 12px !important;
      border-radius: @radius-xl @radius-xl 0 0;
    }

    .vditor-toolbar__item {
      overflow: visible;
      position: relative;
      z-index: 1;

      &:hover {
        z-index: 40;
      }
    }

    .vditor-toolbar__item .vditor-tooltipped {
      border-radius: @radius-pill;
      overflow: visible;
      transition: background @duration-fast @ease-out, color @duration-fast @ease-out;

      &:hover,
      &:focus {
        background: fade(@text-primary, 4%) !important;
        color: @text-primary !important;
      }
    }

    // Toolbar sits under the header — flip default "north" tips downward
    // so they stay visible (Vditor uses .vditor-tooltipped__n by default).
    .vditor-toolbar {
      .vditor-tooltipped::after {
        background: fade(@text-primary, 92%);
        border-radius: 6px;
        font-family: @font-family;
        font-size: 11px;
        font-weight: 500;
        letter-spacing: -0.01em;
        padding: 5px 8px;
        line-height: 1.3;
        box-shadow: @shadow-sm;
      }

      .vditor-tooltipped__n::after,
      .vditor-tooltipped__ne::after,
      .vditor-tooltipped__nw::after {
        top: 100% !important;
        bottom: auto !important;
        margin-top: 8px !important;
        margin-bottom: 0 !important;
      }

      .vditor-tooltipped__n::before,
      .vditor-tooltipped__ne::before,
      .vditor-tooltipped__nw::before {
        top: auto !important;
        bottom: -5px !important;
        margin-right: -5px;
        border-top-color: transparent !important;
        border-bottom-color: fade(@text-primary, 92%) !important;
      }

      // Keep south tips as-is (already correct direction)
      .vditor-tooltipped__s::after,
      .vditor-tooltipped__se::after,
      .vditor-tooltipped__sw::after {
        margin-top: 8px;
      }

      .vditor-tooltipped__s::before,
      .vditor-tooltipped__se::before,
      .vditor-tooltipped__sw::before {
        border-bottom-color: fade(@text-primary, 92%);
      }
    }

    .vditor-icon--current,
    .vditor-menu--current {
      color: @text-primary !important;
    }

    .vditor-toolbar__divider {
      border-color: @separator !important;
    }

    .vditor-content {
      flex: 1;
      height: auto;
      min-height: 0;
      border-top: none;
      overflow: auto;
      border-radius: 0 0 @radius-xl @radius-xl;
      position: relative;
      z-index: 1;
    }

    .vditor-sv,
    .vditor-ir,
    .vditor-wysiwyg,
    .vditor-preview,
    .vditor-content > div {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }

    .vditor-sv,
    .vditor-ir,
    .vditor-wysiwyg {
      background: @paper !important;
    }

    .vditor-preview {
      background: darken(@bg-page, 0.5%) !important;
      border-left: 1px solid @separator !important;
    }

    .vditor-sv:focus,
    .vditor-ir:focus,
    .vditor-wysiwyg:focus,
    .vditor-sv:focus-within,
    .vditor-ir:focus-within,
    .vditor-wysiwyg:focus-within,
    .vditor-textarea:focus,
    .vditor-reset:focus {
      outline: none !important;
      border-color: transparent !important;
      box-shadow: none !important;
    }

    .vditor-outline {
      background: transparent;
      border-right: 1px solid @separator;
    }

    .vditor-counter {
      color: @text-tertiary !important;
      background: transparent !important;
    }

    .vditor-upload {
      background-color: fade(@text-primary, 35%) !important;
    }

    .vditor-tip,
    .vditor-panel {
      border-radius: @radius-md !important;
      border: 1px solid @border-hairline !important;
      box-shadow: @shadow-md !important;
      background: @paper !important;
    }

    .vditor-tip a {
      color: @brand !important;
    }
  }

  .vditor-textarea {
    height: 100% !important;
    font-family: @font-family !important;
    letter-spacing: -0.005em;
    caret-color: @text-primary !important;
    color: @text-primary !important;
  }

  // Neutralize residual focus rings inside editor chrome
  .vditor *:focus {
    outline: none;
  }
}

@media (max-width: 960px) {
  .index-page {
    .index-page__editor {
      padding: 0 8px 8px;
    }

    .vditor {
      min-height: 0 !important;
      border-radius: @radius-lg !important;

      .vditor-toolbar {
        border-radius: @radius-lg @radius-lg 0 0;
      }
    }
  }
}
</style>
