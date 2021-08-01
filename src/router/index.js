import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from './../store/index'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/me',
    name: 'Me',
    beforeEnter: (to, from, next) => {
      if(store.state.user.isLogin){
        next()
      }else{
        next('/login')
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Me" */ '../views/Me.vue')
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: (to, from, next) => {
      if(store.state.user.isLogin){
        next('/me')
      }else{
        next()
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/listview',
    name: 'ListView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/ListView.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  }
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
