import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './registerServiceWorker'
import './assets/icon/index'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

import Loading from '@/components/base/loading/index'
import PreviewImage from '@/components/base/preview-image/index'

Vue.prototype.$Loading = Loading
Vue.prototype.$PreviewImage = PreviewImage
Vue.directive('highlight', (el) => {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
