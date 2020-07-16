import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    // 共享数据
    state:{
        userInfo:''
    }
})
export default store