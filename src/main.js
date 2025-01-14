/** @format */

import Vue from 'vue'
import './global.js'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

const updateCanonical = (url) => {
  let link = document.querySelector("link[rel='canonical']")
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

router.beforeEach((to, _, next) => {
  const canonicalUrl = `${to.path}`
  updateCanonical(canonicalUrl)
  next()
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
