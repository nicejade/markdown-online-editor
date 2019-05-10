/** @format */

import Vue from 'vue'
import Filters from './filters'

/* ------------------------Vue Global Config------------------------------ */
Vue.config.productionTip = false

/* ------------------------- Global Variable ------------------------------- */
import { appTitle } from './config/constant'
window.$appTitle = appTitle

/* ------------------------Vue Global Variable------------------------------ */
import { $apis, $utils, $document, $lodash } from '@helper'
Vue.prototype.$_ = $lodash
Vue.prototype.$apis = $apis
Vue.prototype.$utils = $utils
Vue.prototype.$document = $document

for (let key in Filters) {
  Vue.filter(key, Filters[key])
}

/* ------------------------Vue Global Components------------------------------ */
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import Icon from '@components/Icon'
Vue.component('icon', Icon)

import Arrow from '@components/icons/Arrow'
Vue.component('arrow', Arrow)
