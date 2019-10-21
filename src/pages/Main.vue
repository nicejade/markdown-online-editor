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
        }
      }
      this.vditor = new Vditor('vditor', options)
      this.vditor.focus()
    },
    setDefaultText() {
      const savedMdContent = localStorage.getItem('vditorvditor')
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
