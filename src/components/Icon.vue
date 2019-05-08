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
      }
    }
  },

  computed: {
    iconClass() {
      return 'icon-' + this.name
    }
  }
}
</script>

<style lang="scss">
.svg-icon {
  width: $font-medium;
  height: $font-medium;
}
</style>
