import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import layout from '@/views/layout/layout.vue'
import dataList from '@/views/layout/child/data/dataList.vue'
import textList from '@/views/layout/child/text/textList.vue'
import userList from '@/views/layout/child/user/userList.vue'
import companyList from '@/views/layout/child/company/companyList.vue'
import subjectList from '@/views/layout/child/subject/subjectList.vue'
Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        {
            path:'*',
            redirect:'/login',
            
        },
        {
            path:'/login',
            component:login,
            meta:{
                title:'登录'
            }
        },
        {
            path:'/layout',
            component:layout,
            children:[
                {
                    path:'/layout/dataList',
                    component:dataList,
                    meta:{
                        title:'数据概览'
                    }
                },
                {
                    path:'/layout/textList',
                    component:textList,
                    meta:{
                        title:'题库列表'
                    }
                },
                {
                    path:'/layout/userList',
                    component:userList,
                    meta:{
                        title:'用户列表'
                    }
                },
                {
                    path:'/layout/companyList',
                    component:companyList,
                    meta:{
                        title:'企业列表'
                    }
                },
                {
                    path:'/layout/subjectList',
                    component:subjectList,
                    meta:{
                        title:'学科列表'
                    }
                },
            ]
        }
    ]
})
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//前置守卫  箭头函数的三个参数： to：去哪里的路由信息（$route）  from：从哪里来（$route） next（）：允许通过，必填，否则页面不会跳转
router.beforeEach((to,from,next)=>{
    // console.log(to);
    // console.log(from);
    NProgress.start()//开始进度条
    next()
})
//后置守卫   箭头函数两个参数 ： to   from
router.afterEach((to)=>{
    document.title = to.meta.title//设置页面标题
    NProgress.done()//结束进度条
})
export {router}