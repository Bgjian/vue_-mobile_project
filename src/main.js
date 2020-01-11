// 导入vue
import Vue from 'vue'

// 导入App根组件
import App from './App.vue'

// 导入路由router.js
import router from './router'

// 导入vuex的实例
import store from './store'

// 导入vant-ui
import './plugins/vant'

// 导入axios
import axios from 'axios'

// 导入全局样式表
import './assets/css/global.css'

// 导入animate样式表
import './assets/css/animate.css'

// 配置请求的基准地址
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'

// 将axios挂载到vue原型上
Vue.prototype.$http = axios

// 时间格式的过滤器, 年月日
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  return `${y}-${m}-${d}`
})

Vue.config.productionTip = false

// vue的实例
new Vue({
  // 挂载vuex的实例
  store,
  // 挂载路由的实例
  router,
  // 挂载根组件
  // render: h => h(App)
  render (createElement) {
    return createElement(App)
  }
}).$mount('#app')
