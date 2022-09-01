import {base, clientId} from '@/axios_http/index'
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AlbumModel } from '@/models';
import { Commit } from 'vuex';

const state = {
  albumOfTheWeek: [],
  albums: [],
  albumsTotal: [],
  albumsMonth: []
}

interface InterfaceState {
  albumOfTheWeek: AlbumModel[];
  albums: AlbumModel[];
  albumsTotal: AlbumModel[];
  albumsMonth: AlbumModel[];
}

const mutations = {
    setWeekAlbum(state: InterfaceState, payload: AlbumModel[]) {
      state.albumOfTheWeek = payload
    },
    setAlbums (state: InterfaceState, payload: AlbumModel[]) {
      state.albums = payload
    },
    setAlbumsTotal(state: InterfaceState, payload: AlbumModel[]) {
      state.albumsTotal = payload
    },
    setAlbumsMonth(state: InterfaceState, payload: AlbumModel[]) {
      state.albumsMonth = payload
    },
}

const getters = {
  getWeekAlbum(state: InterfaceState) {
    return state.albumOfTheWeek
  },
  getAlbums(state: InterfaceState) {
    return state.albums
  },
  getAlbumsTotal(state: InterfaceState) {
    return state.albumsTotal
  },
  getAlbumsMonth(state: InterfaceState) {
    return state.albumsMonth
  },
}

const actions = {
    fetchAlbumOfTheWeek({commit}: {commit: Commit}, payload: number) {
      commit('setWeekAlbum', [])
      return new Promise ((resolve, reject) => {
        axios.get(base + 'albums/?client_id=' + clientId + '&limit=' + payload +'&format=jsonpretty&order=popularity_week&imagesize=600').then((response: AxiosResponse) => {
          resolve(response.data.results)
          commit('setWeekAlbum', response.data.results)
        }).catch((error: AxiosError) => {
          reject(error)
        })
      })
    },
    fetchArtistAlbums ({commit}: {commit: Commit}, payload: string) {
      commit('setAlbums', [])
      return new Promise ((resolve, reject) => {
        axios.get(base+'artists/albums/?client_id='+clientId+'&format=jsonpretty&imagesize=600&id='+payload).then((response: AxiosResponse) => {
          resolve(response.data.results)
          commit('setAlbums', response.data.results)
        }).catch((error: AxiosError) => {
          reject(error)
        })
      })
    },
    fetchTopAlbums({commit}: {commit: Commit}) {
      commit('setAlbumsTotal', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'albums/?client_id='+clientId+'&format=jsonpretty&order=popularity_total&imagesize=600&limit=16').then((response: AxiosResponse) => {
         resolve(response.data.results)
         commit('setAlbumsTotal', response.data.results)
       }).catch((error: AxiosError) => {
         reject(error)
       })
     })
   },
   fetchPagesForTopAlbums({commit}: {commit: Commit}, payload: number) {
    commit('setAlbumsTotal', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'albums/?client_id='+clientId+'&format=jsonpretty&order=popularity_total&imagesize=600&limit=16&offset='+payload).then((response: AxiosResponse) => {
         resolve(response.data.results)
         commit('setAlbumsTotal', response.data.results)
       }).catch((error: AxiosError) => {
         reject(error)
       })
     })
   },
    fetchTopAlbumsMonth({commit}: {commit: Commit}) {
      commit('setAlbumsMonth', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'albums/?client_id='+clientId+'&format=jsonpretty&order=popularity_month&imagesize=600&limit=16').then((response: AxiosResponse) => {
         resolve(response.data.results)
         commit('setAlbumsMonth', response.data.results)
       }).catch((error: AxiosError) => {
         reject(error)
       })
     })
   },
   fetchPagesForTopAlbumsMonth({commit}: {commit: Commit}, payload: number) {
    commit('setAlbumsMonth', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'albums/?client_id='+clientId+'&format=jsonpretty&order=popularity_month&limit=16&imagesize=600&offset='+payload).then((response: AxiosResponse) => {
         resolve(response.data.results)
         commit('setAlbumsMonth', response.data.results)
       }).catch((error: AxiosError) => {
         reject(error)
       })
     })
   },
   fetchSearchrdAlbums({commit}: {commit: Commit}, payload: string) {
    commit('setAlbums', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'albums/?client_id='+clientId+'&format=jsonpretty&limit=50&imagesize=600&namesearch='+payload).then((response: AxiosResponse) => {
         resolve(response.data.results)
         commit('setAlbums', response.data.results)
       }).catch((error: AxiosError) => {
         reject(error)
       })
     })
   },
}

const albumModule = {
  namespaced:true,
  state,
  mutations,
  getters,
  actions
}

export default albumModule;
