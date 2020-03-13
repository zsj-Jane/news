// 导入请求对象
import request from '@/utils/request.js';
// 获取用户频道列表
export function channelList() {
    return request({
        url:'user/channels',
        method:'get'
    })
}