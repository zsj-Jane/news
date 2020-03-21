// 导入请求对象
import request from '@/utils/request.js';
// 获取评论或评论回复
export function commentList(params) {
    return request({
        url:'comments',
        method:'get',
        params
    });
}