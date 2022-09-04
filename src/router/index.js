
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Login from '../views/Login/login.vue'

import Order from '../views/Order/index.vue'
Vue.use(Router)
const home = () => import('../views/Home/home.vue')
const router= new Router({
  routes: [
    {
      path: '',
      component: Layout,
      //路由元信息
      meta:{
        isLogin:true
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: home
        },
        {
          path: '/goods',
          name: 'Goods',
          component: () => import('../views/Goods/Goods.vue')
        },
        {
          path: '/addGoods',
          name: 'addGoods',
          component: () => import('../views/Goods/addGoods.vue')
        }
        ,
        {
          path: '/params',
          name: 'Params',
          component: () => import('../views/Params/Params.vue'),
          redirect:'/params/paramsc',
          children:[
            {
              path:'paramsc',
              name:'Paramsc',
              component:()=>import('../views/Params/ParamsInfo/Paramsc')
            }
          ]
        },
        {
          path: '/advert',
          name: 'Advert',
          component: () => import('../views/Advert/Advert.vue')
        },
      
        {
          path: '/order',
          name: 'Order',
          component: Order,
          // redirect: '/order-list',
          children: [
            {
              path: '/order-list',
              component: () => import('../views/Order/OrderList/index.vue')
            },
            {
              path: '/order-back',
              component: () => import('../views/Order/OrderBack/orderBack.vue')
            }
          ]
        },
        {
          path: '/user',
          name: 'User',
          component: () => import('../views/User/index.vue')
        },
      ]
    },
    {
      path: '/login',
      component: Login,
      children: []
    },
    {
      path: '/NavMenu',
      name: 'NavMenu',
      component: () => import('../views/Layout/NavMenu.vue')
    }
  ]
})

export default router
