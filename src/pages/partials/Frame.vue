<template>
  <div class="page-frame">
    <HeaderNav />
    <main class="main-content">
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
    HeaderNav
  },
  methods: {}
}
</script>

<style lang="scss">
.page-frame {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .main-content {
    flex: 1;
    display: flex;
    margin-top: $header-height;
  }
}
</style>
