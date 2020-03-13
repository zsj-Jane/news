// 设置localStorage
export function setLocal(key,value) {
    window.localStorage.setItem(key,value);
}
// 获取localStorage
export function getLocal(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
// 删除localStorage
export function removeLocal(key) {
    window.localStorage.removeItem(key);
}