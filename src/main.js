import './plugins/axios'
import Vue from 'vue'
import App from './App.vue'
// import './plugins/normalize.css'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/main.css'

import './utils/components.js'

import './permission.js'

// import * as api from './utils/serve.js'

// Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
