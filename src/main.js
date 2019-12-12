import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'
import HhhUI from './index.js'
Vue.use(HhhUI)
Vue.use(element)
new Vue({
  el: '#app',
  render: h => h(App)
})
