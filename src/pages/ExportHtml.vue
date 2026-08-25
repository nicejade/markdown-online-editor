<!-- @format -->

<template>
  <div class="export-page">
    <div class="button-group">
      <el-button round @click="onBackToMainPage">返回主页</el-button>
      <el-button round @click="onExportBtnClick" type="primary" :disabled="exporting">
        {{ exporting ? '正在导出...' : '生成导出' }}
      </el-button>
    </div>
    <PreviewVditor :pdata="pdata" />
  </div>
</template>

<script>
import PreviewVditor from '@components/PreviewVditor'
import { getExportFileName } from '@helper/utils'
import { getActiveDocId, getDocContent, getDocuments } from '@helper/storage'
import { buildStandaloneHtml, downloadHtml } from '@helper/exportHtml'
import { trackEvent } from '@helper/analytics'

export default {
  name: 'export-html',

  data() {
    return {
      isLoading: true,
      pdata: getDocContent(getActiveDocId()) || '',
      exporting: false,
    }
  },

  components: {
    PreviewVditor,
  },

  methods: {
    getActiveDocTitle() {
      const id = getActiveDocId()
      const docs = getDocuments()
      const doc = docs.find((item) => item.id === id)
      return (doc && doc.title) || 'Arya'
    },

    exportAndDownloadHtml(contentElement, filename) {
      try {
        const html = buildStandaloneHtml(contentElement, this.getActiveDocTitle())
        downloadHtml(html, filename)
        this.$message.success('HTML 导出成功')
      } catch (error) {
        console.error('HTML 导出失败:', error)
        this.$message.error('HTML 导出失败，请重试')
      } finally {
        this.isLoading = false
        this.exporting = false
      }
    },

    onBackToMainPage() {
      this.$router.push('/')
    },

    onExportBtnClick() {
      const contentElement = document.querySelector('#khaleesi .vditor-preview .vditor-reset')
      if (!contentElement || !contentElement.innerHTML.trim()) {
        this.$message.warning('预览尚未就绪，请稍候再试')
        return
      }
      this.isLoading = true
      this.exporting = true
      const filename = getExportFileName()
      this.exportAndDownloadHtml(contentElement, filename)
      trackEvent('export_html_submit', 'export', filename)
    },
  },
}
</script>
