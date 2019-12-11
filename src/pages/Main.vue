<!-- @format -->

<template>
  <div class="index-page" v-loading="isLoading">
    <HeaderNav />
    <div id="vditor" class="vditor" />
  </div>
</template>

<script>
import Vditor from 'vditor'
import HeaderNav from './partials/HeaderNav'
import defaultText from '@config/default'
import { toolbarConf } from '@config/constant'

export default {
  name: 'index-page',

  data() {
    return {
      isLoading: true,
      isMobile: window.innerWidth <= 960,
      vditor: null
    }
  },

  created() {
    this.setDefaultText()
  },

  components: {
    HeaderNav
  },

  mounted() {
    this.initVditor()
    this.$nextTick(() => {
      this.isLoading = false
    })
  },

  methods: {
    initVditor() {
      const that = this
      const options = {
        cache: true,
        toolbar: toolbarConf,
        width: this.isMobile ? '100%' : '80%',
        height: '0',
        tab: '\t',
        counter: '999999',
        typewriterMode: true,
        preview: {
          delay: 100,
          show: !this.isMobile
        },
        upload: {
          max: 5 * 1024 * 1024,
          // linkToImgUrl: 'https://sm.ms/api/upload',
          handler(file) {
            let formData = new FormData()
            for (let i in file) {
              formData.append('smfile', file[i])
            }
            let request = new XMLHttpRequest()
            request.open('POST', 'https://sm.ms/api/upload')
            request.onload = oEvent => {
              let currentTarget = oEvent.currentTarget
              if (currentTarget.status !== 200) {
                alert(currentTarget.status + ' ' + currentTarget.statusText, { icon: 2 })
                return ''
              }
              let json = JSON.parse(currentTarget.response)
              // json.code === 'image_repeated'
              if (json.code === 'success' || json.success === true) {
                let imgSuffixArr = ['.jpg', '.png', '.gif', '.jpeg', '.bmp']
                let imgMdStr = '[' + json.data.filename + '](' + json.data.url + ')'
                for (let j in imgSuffixArr) {
                  const imgSuffix = json.data.url.substr(0 - imgSuffixArr[j].length)
                  if (imgSuffix.toLocaleLowerCase() === imgSuffixArr[j]) {
                    imgMdStr = '!' + imgMdStr
                    break
                  }
                }
                that.vditor.insertValue(imgMdStr)
              }
            }
            request.send(formData)
          }
        }
      }
      this.vditor = new Vditor('vditor', options)
      this.vditor.focus()
    },
    setDefaultText() {
      const savedMdContent = localStorage.getItem('vditorvditor') || ''
      if (!savedMdContent.trim()) {
        localStorage.setItem('vditorvditor', defaultText)
      }
    }
  }
}
</script>

<style lang="scss">
.index-page {
  width: 100%;
  height: 100%;
  background-color: $white;
  @include flex-box-center(column);
  .vditor {
    position: absolute;
    top: $header-height;
    max-width: $max-body-width;
    width: 80%;
    height: calc(100vh - 100px);
    margin: 20px auto;
    text-align: left;
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
    .vditor {
      height: calc(100vh - 60px);
      padding: auto 10px;
      margin: 0px auto;
    }
  }
}
</style>
