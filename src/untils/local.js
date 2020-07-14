
//存储token
function saveToken(value){
    window.localStorage.setItem('token',value)
}
//获取token
function getToken(){
    return window.localStorage.getItem('token')
}
//移出token
function removeToken(){
    window.localStorage.removeItem()
}
export {saveToken,getToken,removeToken}