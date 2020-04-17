import {base, clientId} from '@/axios_http/index'
import axios from 'axios';

const state = {
  albumOfTheWeek: [],
  albums: [],
  albumsTotal: [],
  albumsMonth: []
}

interface InterfaceState {
  albumOfTheWeek: any;
  albums: any;
  albumsTotal: any;
  albumsMonth: any;
}

const mutations = {
    setWeekAlbum(state: InterfaceState, payload: any) {
      state.albumOfTheWeek = payload
    },
    setAlbums (state: InterfaceState, payload: any) {
      state.albums = payload
    },
    setAlbumsTotal(state: InterfaceState, payload: any) {
      state.albumsTotal = payload
    },
    setAlbumsMonth(state: InterfaceState, payload: any) {
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
    fetchAlbumOfTheWeek({commit}: {commit: any}, payload: number) {
      commit('setWeekAlbum', [])
      return new Promise ((resolve, reject) => {
        axios.get(base+'albums/?client_id='+clientId+'&limit='+payload+'&format=jsonpretty&order=popularity_week').then((response: any) => {
          resolve(response.data.results)
          commit('setWeekAlbum', response.data.results)
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
    fetchArtistAlbums ({commit}: {commit: any}, payload: any) {
    commit('setAlbums', [])
      return new Promise ((resolve, reject) => {
        axios.get(base+'artists/albums/?client_id='+clientId+'&format=jsonpretty&id='+payload).then((response: any) => {
          resolve(response.data.results)
          commit('setAlbums', response.data.results)
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
    fetchTopAlbums({commit}: {commit: any}) {
      commit('setAlbumsTotal', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'albums/?client_id='+clientId+'&format=jsonpretty&order=popularity_total&limit=16').then((response: any) => {
         resolve(response.data.results)
         commit('setAlbumsTotal', response.data.results)
       }).catch((error: any) => {
         reject(error)
       })
     })
   },
   fetchPagesForTopAlbums({commit}: {commit: any}, payload: any) {
    commit('setAlbumsTotal', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'albums/?client_id='+clientId+'&format=jsonpretty&order=popularity_total&limit=16&offset='+payload).then((response: any) => {
         resolve(response.data.results)
         commit('setAlbumsTotal', response.data.results)
       }).catch((error: any) => {
         reject(error)
       })
     })
   },
    fetchTopAlbumsMonth({commit}: {commit: any}) {
      commit('setAlbumsMonth', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'albums/?client_id='+clientId+'&format=jsonpretty&order=popularity_month&limit=16').then((response: any) => {
         resolve(response.data.results)
         commit('setAlbumsMonth', response.data.results)
       }).catch((error: any) => {
         reject(error)
       })
     })
   },
   fetchPagesForTopAlbumsMonth({commit}: {commit: any}, payload: any) {
    commit('setAlbumsMonth', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'albums/?client_id='+clientId+'&format=jsonpretty&order=popularity_month&limit=16&offset='+payload).then((response: any) => {
         resolve(response.data.results)
         commit('setAlbumsMonth', response.data.results)
       }).catch((error: any) => {
         reject(error)
       })
     })
   },
   fetchSearchrdAlbums({commit}: {commit: any}, payload: any) {
    commit('setAlbums', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'albums/?client_id='+clientId+'&format=jsonpretty&limit=50&name='+payload).then((response: any) => {
         resolve(response.data.results)
         commit('setAlbums', response.data.results)
       }).catch((error: any) => {
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
