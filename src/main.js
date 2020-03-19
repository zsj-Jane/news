// 导入模块
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 是否显示提示信息
Vue.config.productionTip = false
// 导入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 导入样式（字体库，基础样式）
import '@/style/font.css';
import '@/style/base.css';
// 导入dayjs
import dayjs from 'dayjs';
// 导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime';
// 让day.js加载这个插件
dayjs.extend(relativeTime);
// 导入中文包
import 'dayjs/locale/zh-cn';
// 把day.js设置为使用中文
dayjs.locale('zh-cn');
// 设置一个全局过滤器(相对时间)
Vue.filter('formatTime', val => {
  // 过滤时间，返回相对时间
  return dayjs().from(val);
});
// 导入自定义的登录状态判断的插件
import myPlugin from '@/utils/myPlugin.js';
// Vue.use()本质：调用myPlugin对象里的install方法，给Vue原型添加属性
Vue.use(myPlugin);
// 实例化vue
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
