<!-- @format -->

<template>
  <div class="index-page">
    <section class="header-wrapper">
      <h1 class="header-area">
        <a href="/" class="header-link">
          <img class="mark-markdown" src="@assets/images/markdown.png" alt="在线 Markdown 编辑器" />
          <strong class="header-text">{{ titleText }}</strong>
        </a>
      </h1>
    </section>
    <div id="vditor" class="vditor" />
  </div>
</template>

<script>
import Vditor from 'vditor'

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
      preview: {
        delay: 100,
        show: true
      }
    }
    const vditor = new Vditor('vditor', options)
    vditor.focus()
  },

  components: {}
}
</script>

<style lang="scss">
@import '~vditor/src/assets/scss/classic';

.index-page {
  width: 100%;
  height: 100%;
  background-color: $white;
  @include flex-box-center(column);
  .header-wrapper {
    position: fixed;
    top: 0;
    height: $header-height;
    .header-area {
      height: 100%;
      .header-link {
        .mark-markdown {
          width: 80px;
          vertical-align: middle;
        }
        .header-text {
          font-size: 30px;
          color: transparent;
          background-clip: text;
          background-image: linear-gradient(to bottom, #928dab, #1f1c2c);
          vertical-align: middle;
        }
      }
    }
  }
  .vditor {
    position: absolute;
    top: $header-height;
    width: 80%;
    height: calc(100vh - 120px);
    max-width: 960px;
    text-align: left;
  }
}

@media (max-width: 768px) {
  .index-page {
    padding: 0 2 * $size-factor;
  }
}
</style>
