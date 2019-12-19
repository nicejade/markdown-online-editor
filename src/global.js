/** @format */

import Vue from 'vue'

/* ------------------------Vue Global Config------------------------------ */
Vue.config.productionTip = false

/* ------------------------- Global Variable ------------------------------- */
import { appTitle } from './config/constant'
window.$appTitle = appTitle

/* ------------------------Vue Global Variable------------------------------ */
import { $utils, $document, $lodash } from '@helper'
import { Message } from 'element-ui'
Vue.prototype.$_ = $lodash
Vue.prototype.$utils = $utils
Vue.prototype.$document = $document
Vue.prototype.$message = options => Message(options)

/* ------------------------Vue Global Components------------------------------ */
import { Button, Dropdown, DropdownMenu, DropdownItem, Loading } from 'element-ui'
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Loading)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import Icon from '@components/Icon'
Vue.component('icon', Icon)
