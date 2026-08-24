<!-- @format -->

<template>
  <aside class="sidebar" :class="{ collapsed: collapsed, 'is-mobile': isMobile }">
    <div
      v-show="collapsed && !isMobile"
      class="sidebar__toggle"
      @click="$emit('toggle-sidebar')"
      aria-label="展开侧边栏"
      title="展开文档列表"
    >
      <icon name="sidebar" class="sidebar__toggle-icon" />
    </div>
    <div v-show="!collapsed" class="sidebar__panel">
      <div class="sidebar__header">
        <span class="sidebar__title">文档列表</span>
        <span
          class="sidebar__header-collapse"
          aria-label="收起侧边栏"
          @click="$emit('toggle-sidebar')"
        >
          <i class="el-icon-d-arrow-left" />
        </span>
      </div>
      <div class="sidebar__actions">
        <button type="button" class="sidebar__new-btn" @click="onNewDoc">
          <icon name="add" class="sidebar__new-icon" />
          <span>新建文档</span>
        </button>
      </div>
      <div class="sidebar__list">
        <div
          v-for="doc in documents"
          :key="doc.id"
          class="sidebar__item"
          :class="{ active: doc.id === activeDocId }"
          @click="onSelectDoc(doc.id)"
        >
          <span
            v-if="editingId !== doc.id"
            class="sidebar__item-title"
            :title="doc.title"
            @dblclick.stop="startRename(doc)"
          >
            {{ doc.title || '未命名文档' }}
          </span>
          <input
            v-else
            ref="renameInput"
            v-model="editingTitle"
            class="sidebar__item-input"
            @blur="submitRename"
            @keyup.enter="submitRename"
            @keyup.esc="cancelRename"
            @click.stop
          />
          <span v-if="doc.id === activeDocId && editingId !== doc.id" class="sidebar__item-actions">
            <span class="sidebar__item-action" aria-label="重命名" @click.stop="startRename(doc)">
              <i class="el-icon-edit" />
            </span>
            <span
              class="sidebar__item-action sidebar__item-action--danger"
              aria-label="删除"
              @click.stop="onDeleteDoc(doc)"
            >
              <i class="el-icon-delete" />
            </span>
          </span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { MessageBox } from 'element-ui'
import Icon from './Icon'
import { getDocuments, createDocument, renameDocument, deleteDocument } from '@helper/storage'
import { trackEvent } from '@helper/analytics'

export default {
  name: 'Sidebar',

  components: {
    Icon,
  },

  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
    activeDocId: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      documents: [],
      editingId: null,
      editingTitle: '',
    }
  },

  created() {
    this.refreshDocuments()
  },

  mounted() {
    this.$root.$on('reload-content', this.refreshDocuments)
  },

  beforeDestroy() {
    this.$root.$off('reload-content', this.refreshDocuments)
  },

  methods: {
    refreshDocuments() {
      this.documents = getDocuments()
    },
    onSelectDoc(id) {
      if (this.editingId) return
      this.$emit('select-doc', id)
      trackEvent('sidebar_doc_select', 'sidebar', id)
    },
    onNewDoc() {
      const doc = createDocument('未命名文档')
      this.refreshDocuments()
      this.$emit('select-doc', doc.id)
      trackEvent('sidebar_doc_create', 'sidebar', doc.id)
    },
    startRename(doc) {
      this.editingId = doc.id
      this.editingTitle = doc.title || '未命名文档'
      trackEvent('sidebar_doc_rename_start', 'sidebar', doc.id)
      this.$nextTick(() => {
        const ref = this.$refs.renameInput
        const input = Array.isArray(ref) ? ref[0] : ref
        if (input) {
          input.focus()
          input.select()
        }
      })
    },
    submitRename() {
      if (this.editingId == null) return
      const title = String(this.editingTitle || '').trim() || '未命名文档'
      renameDocument(this.editingId, title)
      trackEvent('sidebar_doc_rename_submit', 'sidebar', this.editingId)
      this.refreshDocuments()
      this.editingId = null
      this.editingTitle = ''
    },
    cancelRename() {
      trackEvent('sidebar_doc_rename_cancel', 'sidebar', this.editingId)
      this.editingId = null
      this.editingTitle = ''
    },
    onDeleteDoc(doc) {
      MessageBox.confirm('确定要删除该文档吗？删除后无法恢复。', '删除文档', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'is-destructive',
        showClose: true,
        center: false,
        roundButton: false,
      })
        .then(() => {
          deleteDocument(doc.id)
          this.refreshDocuments()
          this.$emit('doc-deleted', doc.id)
          trackEvent('sidebar_doc_delete', 'sidebar', doc.id)
        })
        .catch(() => {
          trackEvent('sidebar_doc_delete_cancel', 'sidebar', doc.id)
        })
    },
  },
}
</script>

<style lang="less" scoped>
@import '../assets/styles/style.less';

.sidebar {
  position: fixed;
  top: @chrome-top;
  left: @page-gutter;
  height: calc(100vh - @chrome-top - @page-gutter);
  z-index: 100;
  background-color: @sidebar-bg;
  border: 1px solid @sidebar-border;
  border-radius: @radius-xl;
  box-shadow: @shadow-xs;
  display: flex;
  overflow: hidden;
  pointer-events: auto;
  transition: width @duration-normal @ease-out;

  &.collapsed {
    width: @sidebar-collapsed-width;

    .sidebar__panel {
      display: none;
    }
  }

  &:not(.collapsed) {
    width: @sidebar-width;
  }

  .sidebar__toggle {
    width: @sidebar-collapsed-width;
    min-width: @sidebar-collapsed-width;
    height: 100%;
    .flex-box-center(column);
    cursor: pointer;
    color: @icon-grey;
    transition: background @duration-fast @ease-out, color @duration-fast @ease-out;

    &:hover {
      background-color: @sidebar-item-hover;
      color: @text-primary;
    }

    .sidebar__toggle-icon {
      width: 18px;
      height: 18px;
      opacity: 0.7;
    }
  }

  .sidebar__panel {
    flex: 1;
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .sidebar__header {
    padding: 20px 14px 12px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    .sidebar__title {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.01em;
      color: @text-secondary;
      line-height: 1.4;
    }

    .sidebar__header-collapse {
      cursor: pointer;
      color: @icon-grey;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: @radius-pill;
      transition: background @duration-fast @ease-out, color @duration-fast @ease-out;

      &:hover {
        background-color: @sidebar-item-hover;
        color: @text-primary;
      }
    }
  }

  .sidebar__list {
    flex: 1;
    overflow-y: auto;
    padding: 2px 10px 12px;
    -webkit-overflow-scrolling: touch;
  }

  .sidebar__item {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    margin-bottom: 4px;
    border-radius: @radius-pill;
    cursor: pointer;
    transition: background @duration-fast @ease-out, color @duration-fast @ease-out,
      box-shadow @duration-fast @ease-out;
    position: relative;
    color: @sidebar-text;

    &:hover {
      background-color: @sidebar-item-hover;
      color: @sidebar-text-active;
    }

    &.active {
      background-color: @sidebar-item-active-bg;
      color: @sidebar-text-active;
      font-weight: 500;
      box-shadow: @shadow-xs;

      .sidebar__item-title {
        color: @sidebar-text-active;
      }

      .sidebar__item-actions {
        opacity: 1;
      }
    }

    .sidebar__item-title {
      flex: 1;
      .text-overflow();
      font-size: 14px;
      letter-spacing: -0.005em;
      text-align: left;
      color: inherit;
      user-select: none;
    }

    .sidebar__item-input {
      flex: 1;
      min-width: 0;
      padding: 5px 10px;
      font-size: 14px;
      font-family: @font-family;
      border: 1px solid @border-grey;
      background: @paper;
      border-radius: @radius-sm;
      outline: none;
      box-shadow: none;
      color: @text-primary;

      &:focus {
        border-color: rgba(28, 25, 23, 0.2);
        box-shadow: @shadow-focus;
      }
    }

    .sidebar__item-actions {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      opacity: 0;
      transition: opacity @duration-fast @ease-out;
      margin-left: 4px;

      .sidebar__item:hover & {
        opacity: 1;
      }
    }

    .sidebar__item-action {
      width: 26px;
      height: 26px;
      color: @icon-grey;
      font-size: 13px;
      border-radius: @radius-pill;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background @duration-fast @ease-out, color @duration-fast @ease-out;

      &:hover {
        background-color: fade(@text-primary, 6%);
        color: @text-primary;
      }

      &--danger:hover {
        background-color: @red-soft;
        color: @red;
      }
    }
  }

  .sidebar__actions {
    flex-shrink: 0;
    padding: 0 14px 12px;
  }

  .sidebar__new-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 500;
    font-family: @font-family;
    letter-spacing: -0.01em;
    color: @paper;
    background: @text-primary;
    border: 1px solid transparent;
    border-radius: @radius-pill;
    cursor: pointer;
    box-shadow: none;
    transition: background @duration-fast @ease-out, color @duration-fast @ease-out,
      transform @duration-fast @ease-out;

    &:hover {
      background: lighten(@text-primary, 10%);
      color: @paper;
    }

    &:active {
      transform: scale(0.98);
    }

    .sidebar__new-icon {
      width: 13px;
      height: 13px;
      fill: currentColor;
    }
  }

  &.is-mobile {
    // Absolute inside the editor body so overflow:hidden + iOS 100vh
    // cannot clip the drawer or its actions the way position:fixed can.
    // Keep a stable width and slide off-canvas — animating width from 0
    // makes percentage max-width resolve circularly (~2px).
    position: absolute;
    top: 8px;
    right: auto;
    bottom: 8px;
    left: 8px;
    height: auto;
    width: @sidebar-width;
    max-width: calc(100% - 16px);
    z-index: 120;
    box-shadow: @shadow-md;
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
    transition: opacity @duration-normal @ease-out, transform @duration-normal @ease-out;

    &.collapsed {
      width: @sidebar-width;
      min-width: 0;
      max-width: calc(100% - 16px);
      opacity: 0;
      pointer-events: none;
      border-color: transparent;
      box-shadow: none;
      transform: translateX(-110%);
    }
  }
}
</style>
