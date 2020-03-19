// 导入axios
import axios from 'axios';
import store from '@/store/';
// 导入JSONBIG
import JSONBig from 'json-bigint';
// 导入操作本地存储的方法
import { setLocal } from '@/utils/local.js';
// 创建一个请求对象
let request = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/app/v1_0/",

    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理,这里的data是服务器返回的未做处理的JSON字符串
        // 用JSONBig对响应体 转换一下，返回给.then使用
        // 转换后，.then拿到的响应体就是经过大数字处理的对象
        return JSONBig.parse(data);
    }],
});
// 创建一个新的请求对象，用来在响应出错时，专门发新的请求的对象
let temReq = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/app/v1_0/"
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 加请求头，请求头里带token
    if (store.state.token) {
        // 登录后有token了，才加请求头
        config.headers.Authorization = 'Bearer ' + store.state.token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 正常响应触发的函数，参数：response就是响应体
    // 返回值是什么，发请求时.then中的res就是什么
    return response.data;
}, async function (error) {
    // 响应错误触发的函数
    // 专门用来输出对象的，可以看到对象中的属性
    // console.dir(error);
    /*
        error中的属性：
            config：保存了发请求出错的这次请求时的配置信息
            request：请求报文的一些数据
            response：响应报文的一些数据
    */

    // 判断：如果报错信息是401，就重新获取token
    if (error.response.status == 401) {
        // 表示token有问题，利用refresh_token去服务器获取一个新的token
        // 不用request发请求，因为这里就是request请求出错了，意味着request对象中保存了一些错误配置
        let res = await temReq({
            url: "authorizations",
            method: "put",
            headers: {
                'Authorization': 'Bearer ' + store.state.refresh_token
            }
        });
        // 更新token到vuex
        store.commit('changeToken', res.data.data.token);
        // 更新token到本地存储
        setLocal('ttToken', JSON.stringify({
            token: res.data.data.token,
            refresh_token: store.state.refresh_token
        }));
    } else {
        // 表示只要不是token过期，而是别的错误，就报错
        // 返回一个报错(输出一段报错)
        // Promise.reject会让js强行报错，会影响后面的代码执行
        return Promise.reject(error);
    }
});
// 暴露请求对象
export default request