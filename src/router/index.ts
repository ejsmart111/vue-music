import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeComponent from '@/views/Home.vue'
import Albums from "@/views/albums.vue"
import Artist from '@/views/artist.vue'
import ArtistList from '@/views/artistsList.vue'
import AlbumList from '@/views/albumsList.vue'
import PlayList from '@/views/playlists.vue'
import Plays from '@/views/plays.vue'
import Genre from '@/views/genre.vue'
import GenreTracks from '@/views/genreTracks.vue'
import Tracks from '@/views/tracks.vue'
import Search from '@/views/search.vue'

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
  },
  {
    path: '/artists/',
    name: 'ArtistList',
    component: ArtistList,
  },
  {
    path: '/albums/',
    name: 'AlbumList',
    component: AlbumList,
  },
  {
    path: '/playlists/',
    name: 'Playlist',
    component: PlayList,
  },
  {
    path: '/playlist/tracks/:id',
    name: 'PlayTracks',
    component: Plays,
  },
  {
    path: '/genres',
    name: 'Genres',
    component: Genre,
  },
  {
    path: '/genres/tracks/:link',
    name: 'GenreTracks',
    component: GenreTracks,
  },
  {
    path: '/tracks',
    name: 'Tracks',
    component: Tracks,
  },
  {
    path: '/search/:query',
    name: 'Search',
    component: Search,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
