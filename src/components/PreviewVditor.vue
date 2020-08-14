<template>
  <div class="preview-vditor" v-loading="isLoading" element-loading-text="正在努力，请稍候...">
    <div id="khaleesi" class="vditor-preview" />
  </div>
</template>

<script>
import Vditor from 'vditor'

export default {
  name: 'PreviewVditor',

  data() {
    return {
      isLoading: true
    }
  },

  props: {
    pdata: {
      type: String,
      required: true,
      default: ''
    }
  },

  created() {
    this.$utils.updateHtmlStyle()
    this.setDefaultText()
  },

  components: {},

  mounted() {
    this.initVditor()
    this.$utils.hideVditorTextarea()
  },

  methods: {
    initVditor() {
      const options = {
        width: '61.8%',
        mode: 'sv',
        preview: {
          delay: 1000,
          show: true
        }
      }
      this.vditor = new Vditor('khaleesi', options)
      this.$nextTick(() => {
        this.isLoading = false
      })
    },

    setDefaultText() {
      localStorage.setItem('vditorkhaleesi', this.pdata)
    }
  }
}
</script>

<style lang="less">
@import './../assets/styles/style.less';

.preview-vditor {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: @white;
  .flex-box-center(column);
  #khaleesi {
    max-width: 960px;
    height: 100%;
    min-height: 100vh;
    margin: 20px auto;
    text-align: left;
    .vditor-toolbar {
      display: none;
    }
    .vditor-content {
      .vditor-sv {
        display: none !important;
      }
    }
    .vditor-preview {
      padding: 0 20px;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
      .vditor-preview__action {
        display: none;
      }
      .vditor-reset {
        h1 {
          text-align: center;
        }
      }
    }
  }
  .vditor {
    border: 0;
  }
}

@media (max-width: 768px) {
  .preview-vditor {
    #khaleesi {
      width: 100% !important;
      margin: 0 !important;
    }
    .vditor-preview {
      padding: 0 10px;
    }
    .vditor-reset {
      table {
        display: inline-block;
        overflow-x: auto;
      }
    }
  }
}
</style>
