// 导入vue
import Vue from 'vue'
// 导入vue路由
import VueRouter from 'vue-router'
// 注册路由
Vue.use(VueRouter)
// 导入组件
import home from '@/views/home/index.vue';
import login from '@/views/login/index.vue';
// 路由规则
const routes = [
  {
    path:'/home',
    component:home
  },
  {
    path:'/login',
    component:login
  },
]
// 实例化路由对象
const router = new VueRouter({
  routes
})
// 暴露路由对象
export default router