// 导入vue
import Vue from 'vue'
// 导入vue路由
import VueRouter from 'vue-router'
// 注册路由
Vue.use(VueRouter)
// 导入组件
// 如果写views/login/找到views下面的login文件夹里的index.js或者index.vue
// 但不会找到其他名字的文件
// 注意：文件夹名字后面的/不能省略
import login from '@/views/login/index.vue';
import layout from '@/views/layout/index.vue';
import home from '@/views/home/index.vue';
import faq  from '@/views/faq/';
import video from '@/views/video/';
import mine from '@/views/mine/';
import search from '@/views/search/';
import searchResult from '@/views/searchResult/';
import detail from '@/views/detail/';
import profile from '@/views/profile/';
import robot from '@/views/robot/';
// 路由规则
const routes = [
  {
    // 路由重定向
    path:'/',
    redirect:'/home'
  },
  {
    path:'/login',
    component:login
  },
  // login模块可以有2个路径访问
  {
    path:'/checkLogin',
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
  },
  {
    path:'/searchResult/:key',
    component:searchResult
  },
  {
    path:'/detail/:art_id',
    component:detail
  },
  {
    path:'/profile',
    component:profile
  },
  {
    name:'robot',
    path:'/robot',
    component:robot
  }
]
// 实例化路由对象
const router = new VueRouter({
  routes
})
// 暴露路由对象
export default router