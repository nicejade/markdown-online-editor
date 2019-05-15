<!-- @format -->

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

  components: {}
}
</script>

<style lang="scss">
@import './assets/styles/element/index.css';
@import './assets/styles/style.scss';
@import '~vditor/src/assets/scss/classic';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
