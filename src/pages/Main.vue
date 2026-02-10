<!-- @format -->

<template>
  <div class="index-page" v-loading="isLoading">
    <HeaderNav @toggle-sidebar="onToggleSidebar" />
    <div class="index-page__body">
      <Sidebar
        v-if="!isMobile"
        :collapsed="sidebarCollapsed"
        :active-doc-id="activeDocId"
        @select-doc="onSelectDoc"
        @doc-deleted="onDocDeleted"
        @toggle-sidebar="onToggleSidebar"
      />
      <div
        class="index-page__editor"
        :style="{ marginLeft: isMobile ? 0 : sidebarCollapsed ? '48px' : '260px' }"
      >
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
} from '@helper/storage'
import { trackEvent } from '@helper/analytics'

const SAVE_DEBOUNCE_MS = 1000

export default {
  name: 'index-page',

  data() {
    return {
      isLoading: true,
      isMobile: window.innerWidth <= 960,
      vditor: null,
      activeDocId: null,
      sidebarCollapsed: window.innerWidth <= 960,
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
  },

  beforeDestroy() {
    this.saveCurrentDoc()
    this.$root.$off('reload-content', this.reloadContent)
    window.removeEventListener('resize', this.onResize)
    if (this.saveTimer) clearTimeout(this.saveTimer)
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth <= 960
    },
    onToggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
      trackEvent('sidebar_toggle', 'sidebar', this.sidebarCollapsed ? 'collapse' : 'expand')
    },
    initVditor() {
      const that = this
      const options = {
        width: '100%',
        height: '0',
        tab: '\t',
        counter: '999999',
        typewriterMode: true,
        mode: 'sv',
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
        input: (value) => {
          that.debouncedSave(value)
        },
        after: () => {
          const content = getDocContent(this.activeDocId) || defaultText
          this.vditor.setValue(content)
          this.vditor.focus()
        },
      }
      this.vditor = new Vditor('vditor', options)
    },
    debouncedSave(value) {
      if (this.saveTimer) clearTimeout(this.saveTimer)
      this.saveTimer = setTimeout(() => {
        if (this.activeDocId && this.vditor && typeof this.vditor.getValue === 'function') {
          const content = this.vditor.getValue()
          saveDocContent(this.activeDocId, content)
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
        saveDocContent(this.activeDocId, this.vditor.getValue())
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
  min-height: 100vh;
  height: 100%;
  background-color: @white;
  display: flex;
  flex-direction: column;

  .index-page__body {
    flex: 1;
    display: flex;
    margin-top: @header-height;
    margin-left: auto;
    margin-right: auto;
    min-height: calc(100vh - @header-height);
    overflow: hidden;
    position: relative;
  }

  .index-page__sidebar-overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.3);
    transition: opacity 0.2s ease;
  }

  .index-page__editor {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    max-width: @max-body-width;
    margin: 0 auto;
    width: 100%;
    transition: all 0.3s ease;
  }

  .vditor {
    flex: 1;
    height: 100%;
    min-height: calc(100vh - @header-height - 48px);
    text-align: left;
    overflow: hidden;

    .vditor-toolbar {
      border-bottom: none;
      background-color: #fcfcfc;
    }

    .vditor-content {
      height: auto;
      min-height: auto;
      border-top: none;
    }
  }

  .vditor-reset {
    font-size: 14px;
  }

  .vditor-textarea {
    font-size: 14px;
    height: 100% !important;
  }
}

@media (max-width: 960px) {
  .index-page {
    .index-page__editor {
      padding: 10px;
    }

    .vditor {
      min-height: calc(100vh - 60px - 20px);
    }
  }
}
</style>
