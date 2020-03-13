// 导入axios
import axios from 'axios';
// 创建一个新的axios实例
let request = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/app/v1_0/"
});
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
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