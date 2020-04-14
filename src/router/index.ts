import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeComponent from '@/views/home.vue'
import Albums from "@/views/albums.vue";

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
  },
  {
    path: '/album/:id',
    name: 'Albums',
    component: Albums,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
