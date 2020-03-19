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
// 封装登录状态
// 准备一个对象，里面有判断登录的方法
let obj = { 
  /**
  * @description:判断登录状态
  * @return: boolean (true:已登录，false:未登录)
  */
  checkLogin() {
    // 判断token的值
    if (this.$store.state.token) {
      // 返回结果(有token)
      return true;
    } else {
      // 弹出提示
      this.$toast.fail("请先登录！");
      // 跳转登录页
      this.$router.push("/login");
      // 返回结果(没有token)
      return false;
    }
  },
};
// 给vue的原型添加checkLogin属性，值为判断登录的方法
Vue.prototype.checkLogin = obj.checkLogin;
// 实例化vue
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
