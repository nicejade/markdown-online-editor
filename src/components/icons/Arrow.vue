<!-- @format -->

<template>
  <i :class="className" :style="styleObject" />
</template>

<script>
export default {
  name: 'arrow',

  props: {
    direction: {
      type: String,
      default: 'left'
    },
    color: {
      type: String,
      default: '#479537'
    }
  },

  computed: {
    className() {
      const isExpected = /^(top|bottom|left|right)$/g.test(this.direction)
      const arrowDirection = isExpected ? this.direction : 'left'
      return `arrow-component ${arrowDirection}`
    },
    styleObject() {
      const isExpected = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/g.test(this.color)
      const arrowBorderColor = isExpected ? this.color : '#479537'
      return {
        'border-color': arrowBorderColor
      }
    }
  }
}
</script>

<style lang="scss">
.arrow-component {
  border: 1px solid $brand;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  &.right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  &.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }
  &.top {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }
  &.bottom {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
}
</style>
