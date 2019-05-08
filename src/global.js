/** @format */

import Vue from 'vue'
import Cookies from 'js-cookie'
import Filters from './filters'

/* ------------------------Vue Global Config------------------------------ */
Vue.config.productionTip = false

const lang = Cookies.get('lang') || 'en'
Vue.config.lang = lang

/* ------------------------Vue Global Variable------------------------------ */
import { $apis, $utils, $document, $auth, $lodash } from '@helper'
Vue.prototype.$_ = $lodash
Vue.prototype.$apis = $apis
Vue.prototype.$utils = $utils
Vue.prototype.$auth = $auth
Vue.prototype.$document = $document

for (let key in Filters) {
  Vue.filter(key, Filters[key])
}

/* ------------------------Vue Global Components------------------------------ */
import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import Icon from '@components/Icon'
Vue.component('icon', Icon)

import Arrow from '@components/icons/Arrow'
Vue.component('arrow', Arrow)
