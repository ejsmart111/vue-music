import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeComponent from '@/views/home.vue'
import Albums from "@/views/albums.vue"
import Artist from '@/views/artist.vue'

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
  },
  {
    path: '/artist/:id',
    name: 'Artist',
    component: Artist,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
