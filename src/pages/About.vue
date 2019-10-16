<!-- @format -->

<template>
  <div class="about-arya" v-loading="isLoading">
    <div id="j-preview-vditor" />
  </div>
</template>

<script>
import Vditor from 'vditor'
import AboutAryaMd from '@config/aboutArya'

export default {
  name: 'about-arya',

  data() {
    return {
      isLoading: true
    }
  },

  created() {},

  components: {},

  mounted() {
    this.initVditor()
    this.$utils.hideVditorTextarea()
  },

  methods: {
    initVditor() {
      const options = {
        cache: false,
        width: '61.8%',
        preview: {
          delay: 1000,
          show: true
        }
      }
      this.vditor = new Vditor('j-preview-vditor', options)
      this.vditor.setValue(AboutAryaMd)
      this.$nextTick(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
.about-arya {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: $white;
  @include flex-box-center(column);
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
  .about-arya {
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
