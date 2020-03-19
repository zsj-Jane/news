// 导入vuex的store对象
import store from '@/store/';
// 导入vue-router的router对象
import router from '@/router/';
// 按需导入vant中的toast
import { Toast } from 'vant';
// 封装登录状态
// 准备一个对象，里面有判断登录的方法
let myPlugin = {
    /**
    * @description:判断登录状态
    * @return: boolean (true:已登录，false:未登录)
    */
    checkLogin() {
        // 判断token的值
        if (store.state.token) {
            // 返回结果(有token)
            return true;
        } else {
            // 弹出提示
            Toast.fail("请先登录！");
            // 跳转登录页
            router.push("/login");
            // 返回结果(没有token)
            return false;
        }
    },
    /**
    * @description:给Vue的原型添加属性(一般插件内的对象要提供install方法)
    * @param {type} Vue对象
    */
    install(Vue) {
        // 给vue的原型添加checkLogin属性，值为判断登录的方法
        Vue.prototype.checkLogin = myPlugin.checkLogin;
    }
};
// 暴露登录状态插件
export default myPlugin