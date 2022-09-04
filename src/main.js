import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import './router/permission'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/reset.css'
import './utils/localStorage'
//导入语言
import i18n from './language/index'
import api from './api/index'

Vue.prototype.$api=api;
import store from './store/index'
//导入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(element)

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
