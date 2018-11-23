// 引入vue
import Vue from 'vue'
//引入路由
import Router from 'vue-router'
//Home组件
// import Home from './views/Home.vue'
//登录组件
import Login from '@/views/Login/login.vue'
//后端首页
// import Admin from '@/views/Admin/index.vue'
//注册路由
Vue.use(Router)

//注册login
export default new Router({
  routes: [
    {
    name: 'login',
    path: '/',
    component: Login
  }
]

})

 

   
