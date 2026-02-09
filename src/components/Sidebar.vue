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
  border-right: 1px solid @border-grey;
  display: flex;
  transition: width 0.2s ease;

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
    transition: all 0.2s ease;
    border-right: 1px solid transparent;

    &:hover {
      background-color: @sidebar-item-hover;
      color: @brand;
    }

    .sidebar__toggle-icon {
      width: 20px;
      height: 20px;
      opacity: 0.8;
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
    padding: 20px 16px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    .sidebar__title {
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: @text-grey;
    }

    .sidebar__header-collapse {
      cursor: pointer;
      color: @icon-grey;
      padding: 4px;
      display: flex;
      align-items: center;
      border-radius: 4px;
      transition: all 0.2s ease;

      &:hover {
        background-color: @sidebar-item-hover;
        color: @brand;
      }
    }
  }

  .sidebar__list {
    flex: 1;
    overflow-y: auto;
    padding: 8px 12px;
  }

  .sidebar__item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    margin-bottom: 2px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
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

      .sidebar__item-actions {
        opacity: 1;
      }
    }

    .sidebar__item-title {
      flex: 1;
      .text-overflow();
      font-size: 14px;
      text-align: left;
    }

    .sidebar__item-input {
      flex: 1;
      min-width: 0;
      padding: 4px 8px;
      font-size: 14px;
      border: 1px solid @brand;
      background: @white;
      border-radius: 4px;
      outline: none;
      box-shadow: 0 0 0 2px rgba(3, 169, 244, 0.1);
    }

    .sidebar__item-actions {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      opacity: 0;
      transition: opacity 0.2s ease;

      .sidebar__item:hover & {
        opacity: 1;
      }
    }

    .sidebar__item-action {
      padding: 4px;
      color: @icon-grey;
      font-size: 14px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &:hover {
        background-color: @white;
        color: @brand;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }

      &--danger:hover {
        color: @red;
      }
    }
  }

  .sidebar__footer {
    padding: 16px;
    border-top: 1px solid @sidebar-border;
  }

  .sidebar__new-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 12px;
    font-size: 14px;
    font-weight: 500;
    color: @brand;
    background: @white;
    border: 1px solid @sidebar-border;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;

    &:hover {
      border-color: @brand;
      background-color: @sidebar-item-hover;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    &:active {
      transform: translateY(0);
    }

    .sidebar__new-icon {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
