// 导入请求对象
import request from '@/utils/request.js';
// 获取频道新闻推荐列表
export function articleList(params) {
    return request({
        // 接口版本不同，不能省略基地址
        url:'http://ttapi.research.itcast.cn/app/v1_1/articles',
        method:'get',
        params
    });
}
// 对文章不喜欢
export function articleDislike(data) {
    return request({
        url:'article/dislikes',
        method:'post',
        data
    });
}
// 举报文章
export function articleReport(data) {
    return request({
        url:'article/reports',
        method:'post',
        data
    });
}
// 获取文章详情
export function articleDetail(params) {
    return request({
        url:`articles/${params.art_id}`,
        method:'get'
    });
}
// 对文章点赞
export function articleLiking(data) {
    return request({
        url:'article/likings',
        method:'post',
        data
    });
}
// 取消对文章点赞
export function articleUnlike(data) {
    return request({
        url:`article/likings/${data.art_id}`,
        method:'delete',
    });
}
// 取消对文章不喜欢
export function articleCannelDislike(data) {
    return request({
        url:`article/dislikes/${data.art_id}`,
        method:'delete',
    });
}
// 收藏文章
export function articleCollect(data) {
    return request({
        url:'article/collections',
        method:'post',
        data
    });
}
// 取消收藏文章
export function articleCancleCollect(data) {
    return request({
        url:`article/collections/${data.art_id}`,
        method:'delete',
    });
}