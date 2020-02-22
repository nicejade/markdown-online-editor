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
import html2pdf from 'html2pdf.js'

export default {
  name: 'export-pdf',

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
    exportAndDownloadPdf(element, filename) {
      const scale = window.devicePixelRatio
      const opt = {
        margin: 1,
        filename: filename,
        html2canvas: { scale },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }
      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          this.isLoading = false
        })
    },
    /* ---------------------Callback Event--------------------- */
    onBackToMainPage() {
      this.$router.push('/')
    },
    onExportBtnClick() {
      this.isLoading = true
      const element = document.getElementsByClassName('vditor-preview')[0]
      const filename = this.$utils.getExportFileName()
      this.exportAndDownloadPdf(element, filename)
    }
  }
}
</script>

<style lang="less"></style>
