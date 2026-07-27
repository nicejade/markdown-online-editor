<!-- @format -->

<template>
  <svg class="svg-icon" :class="iconClass">
    <use :xlink:href="'#' + name"></use>
  </svg>
</template>

<script>
import Icons from '@assets/icons'

export default {
  data() {
    return {}
  },

  props: {
    name: {
      type: String,
      required: true,
      default: '',
      validator(val) {
        return Icons[val]
      },
    },
  },

  computed: {
    iconClass() {
      return 'icon-' + this.name
    },
  },
}
</script>

<style lang="less">
@import './../assets/styles/style.less';
.svg-icon {
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
