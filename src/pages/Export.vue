<!-- @format -->

<template>
  <div class="export-page">
    <div class="button-group">
      <el-button round @click="onBackToMainPage">返回主页</el-button>
      <el-button round @click="onExportBtnClick" type="primary">{{ btnTextStr }}</el-button>
    </div>
    <div id="export-vditor" v-loading="isLoading" element-loading-text="正在努力，请稍候..." />
  </div>
</template>

<script>
import Vditor from 'vditor'
import domtoimage from 'dom-to-image'
import html2pdf from 'html2pdf.js'
import { saveAs } from 'file-saver'
import { exportTextMap } from '@config/constant'

export default {
  name: 'export-page',

  data() {
    return {
      isLoading: true,
      btnTextStr: ''
    }
  },

  created() {
    this.btnTextStr = exportTextMap[this.$route.path]
  },

  components: {},

  mounted() {
    this.initVditor()
    this.$nextTick(async () => {
      const vditorTextarea = document.getElementsByClassName('vditor-textarea')
      vditorTextarea[0].style.display = 'none'
      await this.vditor.getHTML(true)
      this.isLoading = false
    })
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
      this.vditor = new Vditor('export-vditor', options)
      const savedMdContent = localStorage.getItem('vditorvditor')
      this.vditor.setValue(savedMdContent)
    },
    exportAndSaveImg(element, type, filename) {
      const isSupportDownload = 'download' in document.createElement('a')
      isSupportDownload
        ? this.exportImgUseDownload(element, type, filename)
        : this.exportImgUseFileSaver(element, type, filename)
    },
    exportImgUseDownload(element, type, filename) {
      const apiMapping = {
        png: 'toPng',
        jpeg: 'toJpeg'
      }
      domtoimage[apiMapping[type]](element)
        .then(dataUrl => {
          console.log('this.isLoading', this.isLoading)
          this.isLoading = false
          const link = document.createElement('a')
          link.download = filename
          link.href = dataUrl
          link.click()
        })
        .catch(function(error) {
          console.error('Oops, Something went wrong!', error)
        })
    },
    exportImgUseFileSaver(element, type, filename) {
      domtoimage
        .toBlob(element)
        .then(blob => {
          this.isLoading = false
          saveAs(blob, filename)
        })
        .catch(function(error) {
          console.error('Oops, Something went wrong!', error)
        })
    },
    exportToPdf(element, type, filename) {
      const opt = {
        margin: 1,
        filename: filename,
        image: { type: type, quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }
      html2pdf()
        .set(opt)
        .from(element)
        .save()
      this.isLoading = false
    },
    getExportTimestamp() {
      const date = new Date()
      const y = date.getFullYear()
      let mo = this.$utils.makeUpZero(date.getMonth() + 1)
      const d = this.$utils.makeUpZero(date.getDate())
      const h = this.$utils.makeUpZero(date.getHours())
      const m = this.$utils.makeUpZero(date.getMinutes())
      const s = this.$utils.makeUpZero(date.getSeconds())
      return `${y}${mo}${d}-${h}${m}${s}`
    },
    /* ---------------------Callback Event--------------------- */
    onBackToMainPage() {
      this.$router.push('/')
    },
    onExportBtnClick() {
      this.isLoading = true
      const element = document.getElementsByClassName('vditor-preview')[0]
      const type = this.$route.params.type
      const imgTypeArr = ['png', 'jpeg', 'webp']
      const isToImg = imgTypeArr.includes(type)
      const timestamp = this.getExportTimestamp()
      const filename = `arya-${timestamp}.${type}`
      isToImg
        ? this.exportAndSaveImg(element, type, filename)
        : this.exportToPdf(element, type, filename)
    }
  }
}
</script>

<style lang="scss">
.export-page {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: $white;
  @include flex-box-center(column);
  .button-group {
    width: 100%;
    margin: 20px auto;
  }
  #export-vditor {
    max-width: 960px;
    height: 100%;
    min-height: 100vh;
    margin-bottom: 20px;
    text-align: left;
  }
  .vditor-toolbar {
    display: none;
  }
  .vditor {
    border: 0;
  }
  .vditor-preview {
    padding: 0 20px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  }
  .vditor-reset h1 {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .export-page {
    #export-vditor {
      width: 100% !important;
      margin: 0 !important;
    }
    .vditor-preview {
      padding: 0 10px;
    }
  }
}
</style>
