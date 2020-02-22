<!-- @format -->

<template>
  <div class="export-page">
    <div class="button-group">
      <el-button round @click="onBackToMainPage">返回主页</el-button>
      <el-button round @click="onExportBtnClick" type="primary">生成导出</el-button>
    </div>
    <div id="j-preview-vditor" v-loading="isLoading" element-loading-text="正在努力，请稍候..." />
  </div>
</template>

<script>
import Vditor from 'vditor'
import { generateScreenshot } from '@helper/export'

export default {
  name: 'export-image',

  data() {
    return {
      isLoading: true
    }
  },

  created() {
    this.$utils.updateHtmlStyle()
  },

  components: {},

  mounted() {
    this.initVditor()
    this.$utils.hideVditorTextarea()
  },

  updated() {},

  methods: {
    initVditor() {
      const options = {
        cache: false,
        width: '61.8%',
        preview: {
          delay: 1000,
          show: true
        }
      }
      this.vditor = new Vditor('j-preview-vditor', options)
      const savedMdContent = localStorage.getItem('vditorvditor')
      this.vditor.setValue(savedMdContent)
      this.$nextTick(() => {
        this.isLoading = false
      })
    },
    async exportAndDownloadImg(element, filename) {
      const canvas = await generateScreenshot(element)
      const isSupportDownload = 'download' in document.createElement('a')
      if (isSupportDownload) {
        const link = document.createElement('a')
        link.download = filename
        link.href = canvas.toDataURL()
        link.click()
      }
      this.isLoading = false
    },
    /* ---------------------Callback Event--------------------- */
    onBackToMainPage() {
      this.$router.push('/')
    },
    onExportBtnClick() {
      this.isLoading = true
      const element = document.getElementsByClassName('vditor-preview')[0]
      const filename = this.$utils.getExportFileName()
      this.exportAndDownloadImg(element, filename)
    }
  }
}
</script>

<style lang="less">
#j-preview-vditor {
  width: 100%;
}
</style>
