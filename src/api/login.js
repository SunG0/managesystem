import _axios from './request'

function getCode(data){
    return _axios({
        url:'/sendsms',
        method:'post',
        data
    })
}

function registerUser(data){
    return _axios({
        url:'/register',
        method:'post',
        data
    })
}

function getPhoneCode(data){
     return _axios({
         url:'/sendsms',
         method:'post',
         data
     })
}

function toLogin(data){
    return _axios({
        url:'/login',
        method:'post',
        data
    })
}


export {getCode,registerUser,getPhoneCode,toLogin}