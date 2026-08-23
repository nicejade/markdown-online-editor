<!-- @format -->

<template>
  <div class="page-frame">
    <HeaderNav />
    <main id="main" class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import HeaderNav from '@pages/partials/HeaderNav'

export default {
  name: 'Frame',
  props: {},
  data() {
    return {}
  },
  created() {},
  components: {
    HeaderNav,
  },
  methods: {},
}
</script>

<style lang="less">
@import './../../assets/styles/style.less';
.page-frame {
  height: 100%;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: transparent;

  .main-content {
    flex: 1;
    display: flex;
    margin-top: @chrome-top;
    min-height: calc(100vh - @chrome-top);
  }
}
</style>
