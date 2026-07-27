<template>
  <div class="preview-vditor" v-loading="isLoading" element-loading-text="正在努力，请稍候...">
    <div v-show="!isLoading" id="khaleesi" class="vditor-preview" />
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/src/assets/less/index.less'
import { updateHtmlStyle, hideVditorTextarea } from '@helper/utils'

export default {
  name: 'PreviewVditor',

  data() {
    return {
      isLoading: true,
    }
  },

  props: {
    pdata: {
      type: String,
      required: true,
      default: '',
    },
  },

  created() {
    updateHtmlStyle()
    this.setDefaultText()
  },

  components: {},

  mounted() {
    this.initVditor()
    hideVditorTextarea()
  },

  methods: {
    initVditor() {
      const options = {
        width: '61.8%',
        mode: 'sv',
        preview: {
          delay: 1000,
          show: true,
        },
      }
      this.vditor = new Vditor('khaleesi', options)
      this.$nextTick(() => {
        this.isLoading = false
      })
    },

    setDefaultText() {
      localStorage.setItem('vditorkhaleesi', this.pdata)
    },
  },
}
</script>

<style lang="less">
@import './../assets/styles/style.less';

// Chrome only: page surface + card shell. Markdown content (.vditor-reset) left as-is.
.preview-vditor {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: @bg-page;
  .flex-box-center(column);
  padding: 28px 16px 48px;

  #khaleesi {
    max-width: 960px;
    min-width: 50vw;
    height: 100%;
    min-height: 70vh;
    margin: 0 auto;
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
      background: @paper;
      border-radius: @radius-lg;
      border: 1px solid @border-hairline;
      box-shadow: @shadow-sm;

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
    border: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    --toolbar-icon-hover-color: @text-primary;
  }
}

@media (max-width: 768px) {
  .preview-vditor {
    padding: 12px 8px 32px;

    #khaleesi {
      width: 100% !important;
      margin: 0 !important;
    }

    .vditor-preview {
      padding: 0 10px;
      border-radius: @radius-md;
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
