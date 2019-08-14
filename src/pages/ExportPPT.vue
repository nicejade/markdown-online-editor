<!-- @format -->

<template>
  <div class="export-ppt">
    <div class="reveal">
      <div class="slides">
        <section data-markdown data-separator="---" data-separator-vertical="--">
          <section data-template>
            {{ savedMdContent }}
          </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import Reveal from 'reveal.js/js/reveal'
import 'reveal.js/css/reset.css'
import 'reveal.js/css/reveal.css'
import 'reveal.js/css/theme/beige.css'

export default {
  name: 'export-ppt',

  data() {
    return {
      savedMdContent: ''
    }
  },

  created() {},

  components: {},

  mounted() {
    this.savedMdContent = localStorage.getItem('vditorvditor')
    this.initReveal()
  },

  methods: {
    initReveal() {
      window.Reveal = Reveal
      const revealSourcePath = `https://cdn.bootcss.com/reveal.js/3.8.0/`
      Reveal.initialize({
        controls: true,
        progress: true,
        center: true,
        hash: true,
        transition: 'slide',
        dependencies: [
          {
            src: `${revealSourcePath}/plugin/markdown/marked.js`,
            condition: function() {
              return !!document.querySelector('[data-markdown]')
            }
          },
          {
            src: `${revealSourcePath}/plugin/markdown/markdown.js`,
            condition: function() {
              return !!document.querySelector('[data-markdown]')
            }
          },
          { src: `${revealSourcePath}/plugin/highlight/highlight.js`, async: true },
          { src: `${revealSourcePath}/plugin/search/search.js`, async: true },
          { src: `${revealSourcePath}/plugin/zoom-js/zoom.js`, async: true },
          { src: `${revealSourcePath}/plugin/notes/notes.js`, async: true }
        ]
      })
    },
    exportAndDownloadPPT(element, filename) {},
    /* ---------------------Callback Event--------------------- */
    onBackToMainPage() {
      this.$router.push('/')
    },
    onExportBtnClick() {
      this.isLoading = true
      const element = document.getElementsByClassName('vditor-preview')[0]
      const filename = this.$utils.getExportFileName()
      this.exportAndDownloadPPT(element, filename)
    }
  }
}
</script>

<style lang="scss">
.export-ppt {
  width: 100%;
  .reveal {
    font-size: 2em;
    background-color: #ffffff;
    height: calc(100vh - 60px);
    h1 {
      font-size: 2em !important;
    }
  }
}
</style>
