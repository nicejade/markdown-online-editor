<!-- @format -->

<template>
  <div class="index-page" v-loading="isLoading">
    <div id="vditor" class="vditor" />
  </div>
</template>

<script>
import Vditor from 'vditor'
import defaultText from '@config/default'

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
    console.log = () => { }
  },


  mounted() {
    this.initVditor()
    this.$nextTick(() => {
      this.isLoading = false
    })
    this.$root.$on('reload-content', this.reloadContent)
  },

  beforeDestroy() {
    this.$root.$off('reload-content', this.reloadContent)
  },

  methods: {
    initVditor() {
      const that = this
      const options = {
        width: this.isMobile ? '100%' : '100%',
        height: '0',
        tab: '\t',
        counter: '999999',
        typewriterMode: true,
        mode: 'sv',
        preview: {
          delay: 100,
          show: !this.isMobile
        },
        outline: true,
        upload: {
          max: 5 * 1024 * 1024,
          handler(file) {
            let formData = new FormData()
            for (let i in file) {
              formData.append('smfile', file[i])
            }
            let request = new XMLHttpRequest()
            request.open('POST', 'https://sm.ms/api/upload')
            request.onload = that.onloadCallback
            request.send(formData)
          }
        },
        preview: {
          actions: ["desktop", "tablet", "mobile", "mp-wechat", "zhihu"],
          delay: 1000,
          hljs: {
            enable: true,
            lineNumber: false,
            defaultLang: "",
            style: "github",
          },
          markdown: {
            autoSpace: false,
            gfmAutoLink: true,
            codeBlockPreview: true,
            fixTermTypo: false,
            footnotes: true,
            linkBase: "",
            linkPrefix: "",
            listStyle: false,
            mark: false,
            mathBlockPreview: true,
            paragraphBeginningSpace: false,
            sanitize: true,
            sub: false,
            sup: false,
            toc: false,
          },
          math: {
            engine: "KaTeX",
            inlineDigit: false,
            macros: {},
          },
          maxWidth: 800,
          mode: "both",
          theme: {
            current: "light",
            list: {
              "ant-design": "Ant Design",
              "dark": "Dark",
              "light": "Light",
              "wechat": "WeChat",
            },
            path: `https://unpkg.com/vditor@3.10.8/dist/css/content-theme`,
          },
          render: {
            media: {
              enable: true,
            }
          }
        },
        toolbar: [
          "emoji",
          "headings",
          "bold",
          "italic",
          "strike",
          "link",
          "|",
          "list",
          "ordered-list",
          "check",
          "outdent",
          "indent",
          "|",
          "quote",
          "line",
          "code",
          "inline-code",
          "insert-before",
          "insert-after",
          "|",
          "upload",
          "record",
          "table",
          "|",
          "undo",
          "redo",
          "|",
          "fullscreen",
          "edit-mode",
          {
            name: "more",
            toolbar: [
              "both",
              "code-theme",
              "content-theme",
              "export",
              "outline",
              "preview"
            ],
          },
        ],
        after: () => {
          const content = localStorage.getItem('vditorvditor') || defaultText
          this.vditor.setValue(content)
          this.vditor.focus()
        }
      }
      this.vditor = new Vditor('vditor', options)
      console.log(this.vditor);
    },
    onloadCallback(oEvent) {
      const currentTarget = oEvent.currentTarget
      if (currentTarget.status !== 200) {
        return this.$message({
          type: 'error',
          message: currentTarget.status + ' ' + currentTarget.statusText
        })
      }
      let resp = JSON.parse(currentTarget.response)
      let imgMdStr = ''
      if (resp.code === 'invalid_source') {
        return this.$message({
          type: 'error',
          message: resp.message
        })
      }
      if (resp.code === 'image_repeated') {
        imgMdStr = `![](${resp.images})`
      } else if (resp.code === 'success' || resp.success) {
        imgMdStr = `![${resp.data.filename}](${resp.data.url})`
      }
      this.vditor.insertValue(imgMdStr)
    },
    setDefaultText() {
      const savedMdContent = localStorage.getItem('vditorvditor') || ''
      if (!savedMdContent.trim()) {
        localStorage.setItem('vditorvditor', defaultText)
      }
    },
    reloadContent() {
      if (this.vditor && this.vditor.getValue) {
        const content = localStorage.getItem('vditorvditor') || ''
        this.vditor.setValue(content)
        this.vditor.focus()
      }
    }
  }
}
</script>

<style lang="less">
@import './../assets/styles/style.less';

.index-page {
  width: 100%;
  height: 100%;
  background-color: @white;
  .flex-box-center(column);

  .vditor {
    position: absolute;
    // top: @header-height;
    // max-width: @max-body-width;
    width: 100%;
    height: calc(100vh - 100px);
    margin: 20px auto;
    text-align: left;

    .vditor-toolbar {
      border-left: 1px solid #d1d5da;
      border-right: 1px solid #d1d5da;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
    }

    .vditor-content {
      margin-top: 36px;
      height: auto;
      min-height: auto;
      border: 1px solid #d1d5da;
      border-top: none;
    }
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
      padding: 10px;
      margin: 0px auto;
    }
  }
}
</style>
