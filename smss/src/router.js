// 引入vue
import Vue from 'vue'
//引入路由
import Router from 'vue-router'
//Home组件
// import Home from './views/Home.vue'
//登录组件
import Login from '@/views/Login/login.vue'
//后端首页
import Admin from '@/views/Admin/index.vue'
//添加账号
import Accountadd from '@/views/Accountadd/accountadd.vue';
// 修改密码
import Editpwd from '@/views/Editpwd/editpwd.vue';
//系统管理
import Home from '@/views/Home/home.vue';

//账号管理
import UsersManage from '@/views/usersmanage/UsersManage.vue';

//注册路由
Vue.use(Router)

//注册login
export default new Router({
  routes: [{
      name: 'login',
      path: '/login',
      component: Login
    },
    //注册后端首页
    {
      name: 'index',
      path: '/',
      component: Admin,
      children:[
        //默认子组件
        {
          name:'home',
          path:'/',
          component:Home
        },
     
        //添加账号
        {
         
          path:'/accountadd',
          component:Accountadd
        },
        //修改密码
        {
         
          path:'/editpwd',
          component:Editpwd
        },
        //账号管理
        {
          path:'/usersmanage',
          component:UsersManage
        }
      ]
    }
  ]

})