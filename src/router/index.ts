import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeComponent from '@/views/home.vue'
Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
