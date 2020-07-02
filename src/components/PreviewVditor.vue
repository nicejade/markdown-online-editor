<template>
  <div class="preview-vditor" v-loading="isLoading" element-loading-text="正在努力，请稍候...">
    <div id="j-preview-vditor" class="vditor-preview" />
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
      this.vditor = new Vditor('j-preview-vditor', options)
      try {
        this.vditor.setValue(this.pdata)
      } catch (err) {
        console.log(`Something Error: `, err)
      }
      this.$nextTick(() => {
        this.isLoading = false
      })
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
  #j-preview-vditor {
    max-width: 960px;
    height: 100%;
    min-height: 100vh;
    margin: 20px auto;
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
  .preview-vditor {
    #j-preview-vditor {
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
