import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入Elementui资源文件
import ElementUI from 'element-ui'; // 组件代码js
import 'element-ui/lib/theme-chalk/index.css'; // 样式代码css
// 在Vue对象上 注册 ElementUI
Vue.use(ElementUI);
//引入公共样式
import '@/common/css/bass.css';
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
