<!-- @format -->

<template>
  <div class="export-page" v-loading="isLoading">
    <div class="button-group">
      <el-button round @click="onBackToMainPage">返回主页</el-button>
      <el-button round @click="onExportBtnClick" type="primary">{{ btnTextStr }}</el-button>
    </div>
    <div id="export-vditor" />
  </div>
</template>

<script>
import Vditor from 'vditor'
import domtoimage from 'dom-to-image'
import html2pdf from 'html2pdf.js'
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
    exportToImg(element, type, filename) {
      const apiMapping = {
        png: 'toPng',
        jpeg: 'toJpeg'
      }
      domtoimage[apiMapping[type]](element)
        .then(function(dataUrl) {
          const link = document.createElement('a')
          link.download = filename
          link.href = dataUrl
          link.click()
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
    },
    /* ---------------------Callback Event--------------------- */
    onBackToMainPage() {
      this.$router.push('/')
    },
    onExportBtnClick() {
      const element = document.getElementsByClassName('vditor-preview')[0]
      const type = this.$route.params.type
      const imgTypeArr = ['png', 'jpeg', 'webp']
      const isToImg = imgTypeArr.includes(type)
      const filename = `arya-${Date.now()}.${type}`
      isToImg
        ? this.exportToImg(element, type, filename)
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
