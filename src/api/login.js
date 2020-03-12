// 导入请求对象
import request from '@/utils/request.js';
// 封装登录的接口
export function login(data) {
    return request({
        url:"authorizations",
        method:"post",
        data
    });
}