<!-- @format -->

<template>
  <div id="app" style="text-autospace: normal">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

  components: {},
}
</script>

<style lang="less">
@import './assets/styles/element/index.css';
@import './assets/styles/style.less';
@import '~vditor/dist/index.css';

#app {
  font-family: @font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @text-primary;
  min-height: 100vh;
  background-color: @bg-page;
}
</style>
