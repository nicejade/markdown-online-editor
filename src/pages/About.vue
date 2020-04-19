<!-- @format -->

<template>
  <PreviewVditor :pdata="pdata" @callback="handleCallBack" />
</template>

<script>
import PreviewVditor from '@components/PreviewVditor'
import AboutAryaMd from '@config/aboutArya'

export default {
  name: 'about-arya',

  data() {
    return {
      isLoading: true,
      pdata: AboutAryaMd
    }
  },

  created() {},

  components: {
    PreviewVditor
  },

  mounted() {},

  methods: {
    handleCallBack() {
      this.isLoading = false
    }
  }
}
</script>
