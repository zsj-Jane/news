// 导入请求对象
import request from '@/utils/request.js';
// 关注用户
export function followUser(data) {
    return request({
        url:'user/followings',
        method:'post',
        data
    })
}