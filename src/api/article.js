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
