import './plugins/axios'
import Vue from 'vue'
import App from './App.vue'
// import './plugins/normalize.css'
import './registerServiceWorker'
// 路由
import router from './router'
// vuex
import store from './store'
// element ui
import './plugins/element.js'
// 图标
import './icon/iconfont.css'
// 全局样式
import './plugins/main.css'
// 全局组件
import './utils/components.js'
// 路由守卫
import './permission.js'
// 处理时间格式
import { handleTime } from './utils/dataTime.js'
Vue.prototype.$handleTime = handleTime
// echarts图表
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//打印
import Print from 'vue-print-nb'
Vue.use(Print)
// 导出
import { exportExcel } from './utils/publiFun.js'
Vue.prototype.$exportExcel = exportExcel


// import * as api from './utils/serve.js'

// Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
