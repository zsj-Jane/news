// 导入请求对象
import request from '@/utils/request.js';
// 获取联想建议(自动补全)
export function getSuggestion(params) {
    return request({
        url:"suggestion",
        method:"get",
        params
    });
}
// 获取搜索结果
export function getSearch(params) {
    return request({
        url:"search",
        method:"get",
        params
    });
}