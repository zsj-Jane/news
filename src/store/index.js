// 导入vue
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// 注册vuex
Vue.use(Vuex)
// 导入操作本地存储的方法
import { getLocal } from '@/utils/local.js';

export default new Vuex.Store({
  state: {
    //利用逻辑运算符短路，解决vuex默认值的bug
    // 第一次登录，左边式子为null，短路
    // 登录后有了token值，左边式子为true，取右边式子结果
    token: getLocal('ttToken') && getLocal('ttToken').token,
    refresh_token: getLocal('ttToken') && getLocal('ttToken').refresh_token
  },
  mutations: {
    // 修改token值的方法
    changeToken(state, token) {
      state.token = token;
    },
    // 修改refresh_token值的方法
    changeRefreshToken(state, token) {
      state.refresh_token = token;
    }
  },
  actions: {
  },
  modules: {
  }
})
