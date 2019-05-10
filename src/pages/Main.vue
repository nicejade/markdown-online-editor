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

export default {
  name: 'index-page',

  data() {
    return {
      isBigScreenFlag: window.innerWidth > 768,
      titleText: '在线 Markdown 编辑器'
    }
  },

  created() {},

  mounted() {
    const options = {
      cache: true,
      width: '80%',
      height: '3160',
      tab: '\t',
      preview: {
        delay: 100,
        show: true
      }
    }
    const vditor = new Vditor('vditor', options)
    vditor.focus()
  },

  components: {
    HeaderNav
  }
}
</script>

<style lang="scss">
@import '~vditor/src/assets/scss/classic';

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
