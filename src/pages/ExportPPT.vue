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

  created() {
    this.$utils.updateHtmlStyle()
    this.savedMdContent = localStorage.getItem('vditorvditor')
  },

  components: {},

  mounted() {
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
        display: 'block',
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
    }
    /* ---------------------Callback Event--------------------- */
  }
}
</script>

<style lang="less">
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
