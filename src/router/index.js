// 导入vue
import Vue from 'vue'
// 导入vue路由
import VueRouter from 'vue-router'
// 注册路由
Vue.use(VueRouter)
// 导入组件
import login from '@/views/login/index.vue';
import layout from '@/views/layout/index.vue';
import home from '@/views/home/index.vue';
import faq  from '@/views/faq/';
import video from '@/views/video/';
import mine from '@/views/mine/';
import search from '@/views/search/';
// 路由规则
const routes = [
  {
    path:'/login',
    component:login
  },
  {
    path:'/layout',
    component:layout,
    children:[
      {
        path:'/home',
        component:home
      },
      {
        path:'/faq',
        component:faq
      },
      {
        path:'/video',
        component:video
      },
      {
        path:'/mine',
        component:mine
      }
    ]
  },
  {
    path:'/search',
    component:search
  }
]
// 实例化路由对象
const router = new VueRouter({
  routes
})
// 暴露路由对象
export default router