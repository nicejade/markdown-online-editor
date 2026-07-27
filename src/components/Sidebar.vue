<!-- @format -->

<template>
  <aside class="sidebar" :class="{ collapsed: collapsed }">
    <div
      v-show="collapsed"
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
      <div class="sidebar__list">
        <div
          v-for="doc in documents"
          :key="doc.id"
          class="sidebar__item"
          :class="{ active: doc.id === activeDocId }"
          @click="onSelectDoc(doc.id)"
        >
          <span v-if="editingId !== doc.id" class="sidebar__item-title" :title="doc.title">
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
      <div class="sidebar__footer">
        <button type="button" class="sidebar__new-btn" @click="onNewDoc">
          <icon name="add" class="sidebar__new-icon" />
          <span>新建文档</span>
        </button>
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
        if (input) input.focus()
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
  top: @header-height;
  left: 0;
  height: calc(100vh - @header-height);
  z-index: 100;
  background-color: @sidebar-bg;
  border-right: 1px solid @sidebar-border;
  display: flex;
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
      font-size: 14px;
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
      border-radius: @radius-sm;
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
  }

  .sidebar__item {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    margin-bottom: 1px;
    border-radius: @radius-sm;
    cursor: pointer;
    transition: background @duration-fast @ease-out, color @duration-fast @ease-out;
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
        border-color: rgba(42, 42, 44, 0.2);
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
      border-radius: @radius-xs;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background @duration-fast @ease-out, color @duration-fast @ease-out;

      &:hover {
        background-color: rgba(255, 252, 248, 0.9);
        color: @text-primary;
      }

      &--danger:hover {
        background-color: @red-soft;
        color: @red;
      }
    }
  }

  .sidebar__footer {
    padding: 12px 14px 18px;
    border-top: 1px solid @separator;
  }

  .sidebar__new-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 9px 14px;
    font-size: 13px;
    font-weight: 500;
    font-family: @font-family;
    letter-spacing: -0.01em;
    color: @text-secondary;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: none;
    transition: background @duration-fast @ease-out, color @duration-fast @ease-out;

    &:hover {
      background: fade(@text-primary, 5%);
      color: @text-primary;
    }

    &:active {
      background: fade(@text-primary, 8%);
    }

    .sidebar__new-icon {
      width: 13px;
      height: 13px;
      fill: currentColor;
    }
  }
}
</style>
