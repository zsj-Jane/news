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
// 获取用户名、头像、简介、发布文章数量、关注数量、被关注数量、被点赞数量
export function getInfo() {
    return request({
        url:'user',
        method:'get'
    });
}
// 获取用户个人资料（用户自己的其他资料）
// 头像、用户名、手机号、性别、生日
export function getProfile() {
    return request({
        url:'user/profile',
        method:'get'
    });
}