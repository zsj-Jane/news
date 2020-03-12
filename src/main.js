// 导入模块
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 是否显示提示信息
Vue.config.productionTip = false
// 实例化vue
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
