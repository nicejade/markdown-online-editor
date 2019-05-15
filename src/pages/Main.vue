<!-- @format -->

<template>
  <div class="index-page">
    <HeaderNav />
    <div id="vditor" class="vditor" />
  </div>
</template>

<script>
import Vditor from 'vditor'
import HeaderNav from './partials/HeaderNav'
import defaultText from '@config/default'

export default {
  name: 'index-page',

  data() {
    return {
      isBigScreenFlag: window.innerWidth > 768,
      vditor: null
    }
  },

  created() {},

  components: {
    HeaderNav
  },

  mounted() {
    const options = {
      cache: true,
      width: '80%',
      height: '0',
      tab: '\t',
      counter: '716800',
      preview: {
        delay: 100,
        show: true
      }
    }
    this.vditor = new Vditor('vditor', options)
    this.vditor.focus()
    this.setDefaultText()
  },

  methods: {
    setDefaultText() {
      const savedValue = this.vditor.getValue()
      if (!savedValue) {
        this.vditor.insertValue(defaultText)
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
}

@media (max-width: 768px) {
  .index-page {
    padding: 0 2 * $size-factor;
  }
}
</style>
