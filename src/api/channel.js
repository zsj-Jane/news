// 导入请求对象
import request from '@/utils/request.js';
// 获取用户频道列表
export function channelList() {
    return request({
        url: 'user/channels',
        method: 'get'
    })
}
// 获取所有频道
export function channelAll() {
    return request({
        url: 'channels',
        method: 'get'
    })
}
// 添加频道(批量修改用户频道列表（重置式）)
export function channelSave(data) {
    return request({
        url: 'user/channels',
        method: 'put',//跟post是一样的，参数也要叫data
        data
    })
}
// 删除频道(批量删除用户频道列表)
export function channelDel(data) {
    return request({
        url: 'user/channels',
        method: 'delete',//跟post是一样的，参数也要叫data
        data
    })
}
// 删除频道(删除指定用户频道)，调用该接口时，直接传id就行
export function channelDel2(data) {
    return request({
        // 这个接口要求把参数拼接在路径上 /user/channels/:target
        url: 'user/channels'+data,
        method: 'delete',//跟post是一样的，参数也要叫data
    })
}