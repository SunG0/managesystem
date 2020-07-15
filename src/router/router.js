import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import layout from '@/views/layout/layout.vue'
import dataList from '@/views/layout/child/dataList.vue'
import textList from '@/views/layout/child/textList.vue'
import userList from '@/views/layout/child/userList.vue'
import companyList from '@/views/layout/child/companyList.vue'
import subjectList from '@/views/layout/child/subjectList.vue'
Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        {
            path:'*',
            redirect:'/login'
        },
        {
            path:'/login',
            component:login
        },
        {
            path:'/layout',
            component:layout,
            children:[
                {
                    path:'/layout/dataList',
                    component:dataList
                },
                {
                    path:'/layout/textList',
                    component:textList
                },
                {
                    path:'/layout/userList',
                    component:userList
                },
                {
                    path:'/layout/companyList',
                    component:companyList
                },
                {
                    path:'/layout/subjectList',
                    component:subjectList
                },
            ]
        }
    ]
})
export {router}