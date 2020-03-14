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