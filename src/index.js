import HhhForm from './packages/form/index.js'
import HhhMenu from './packages/menu/index.js'
import HhhHead from './packages/head/index.js'
import HhhTable from './packages/table/index.js'


const components = [
  HhhForm,
  HhhMenu,
  HhhHead,
  HhhTable
]

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  HhhForm,
  HhhMenu,
  HhhHead,
  HhhTable
}