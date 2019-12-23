import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'
import HhhUI from './index.js'
// import axios from './axios/index.js'//  请求响应拦截
// Vue.prototype.$axios = axios
Vue.use(HhhUI)
Vue.use(element)
new Vue({
  el: '#app',
  render: h => h(App)
})
