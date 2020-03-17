// 导入axios
import axios from 'axios';
import store from '@/store/';
// 导入JSONBIG
import JSONBig from 'json-bigint';
// 创建一个新的axios实例
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
    return response.data;
}, function (error) {
    // 响应错误触发的函数
    return Promise.reject(error);
});
// 暴露请求对象
export default request