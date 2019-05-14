/** @format */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './global.js'
import './registerServiceWorker'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
