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
// 对评论或评论回复点赞
export function commentLiking(data) {
    return request({
        url:'comment/likings',
        method:'post',
        data
    });
}
// 取消对评论或评论回复点赞
export function commentCancelLiking(data) {
    return request({
        url:`comment/likings/${data.target}`,
        method:'delete'
    });
}
// 添加评论或评论回复
export function commentAdd(data) {
    return request({
        url:'comments',
        method:'post',
        data
    });
}