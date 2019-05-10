/** @format */

import Vue from 'vue'

export default {
  updatePageMeta(to, from, next) {
    if (to.meta.title && to.meta.title[Vue.config.lang]) {
      document.title = to.meta.title[Vue.config.lang]
    }
    next()
  }
}
