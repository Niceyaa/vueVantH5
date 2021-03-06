import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {keepAlive: true}
  },
  {
    path: '/matchList',
    name: 'matchList',
    component: ()=>import('@/views/matchList'),
    meta: {keepAlive: false}
  },
  {
    path: '/projectDetail',
    name: 'projectDetail',
    component: ()=>import('@/views/projectDetail'),
    meta: {keepAlive: false}
  }
]

const router = new VueRouter({
  routes
})

export default router
