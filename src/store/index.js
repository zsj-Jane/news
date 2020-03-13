// 导入vue
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// 注册vuex
Vue.use(Vuex)
// 导入操作本地存储的方法
import {getLocal} from '@/utils/local.js';

export default new Vuex.Store({
  state: {
    token: getLocal('ttToken').token,
    refresh_token: getLocal('ttToken').refresh_token
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
