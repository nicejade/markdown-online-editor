/** @format */

import Vue from 'vue'
import './global.js'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
