// 导入请求对象
import request from '@/utils/request.js';
// 关注用户
export function followUser(data) {
    return request({
        url:'user/followings',
        method:'post',
        data
    });
}
// 取消关注用户
export function unfollowUser(data) {
    return request({
        url:`user/followings/${data.aut_id}`,
        method:'DELETE',
    });
}
// 获取用户自己的信息
export function getInfo() {
    return request({
        url:'user',
        method:'get'
    });
}