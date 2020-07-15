import axios from 'axios'
import {
  Message
} from 'element-ui'
import { getToken ,removeToken} from '@/untils/local.js'
import {router} from '@/router/router.js'
let _axios = axios.create({
    baseURL:process.env.VUE_APP_URL,
    withCredentials : true
})
_axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //在每次发送请求的时候带上token
    config.headers.token = getToken()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
_axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //表示数据请求成功，直接返回data
    if(response.data.code == 200){
        return response.data;
    }
    else if(response.data.code == 206) {
        //移除token
        removeToken()
        //跳转到首页
        router.push('/login')
        //阻止.then的执行
        return Promise.reject('error');
    }
    else{
      Message.error(response.data.message)
        //表示就扣请求失败，此时要阻止.then 的执行
        return Promise.reject('error');
    }
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


export default _axios