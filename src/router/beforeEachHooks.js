/** @format */

import Vue from 'vue'
import { $auth } from '@helper'

export default {
  // Check the login status
  checkLoginAuth(to, from, next) {
    if (to.meta.title && to.meta.title[Vue.config.lang]) {
      document.title = to.meta.title[Vue.config.lang]
    }

    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      if ($auth.checkSession()) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  },

  // Check page permissions
  checkPageAuth(to, from, next) {
    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      // check user auth here....
      next()
    }
  }
}
