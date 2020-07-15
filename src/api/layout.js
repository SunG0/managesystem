import _axios from './request'

function getInfo(){
    return _axios({
        url:'/info'
    })
}

function logout(){
    return _axios({
        url:'/logout'
    })
}

export {getInfo,logout}