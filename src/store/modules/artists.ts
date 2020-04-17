import {base, clientId} from '@/axios_http/index'
import axios from 'axios';

const state = {
  artistOfTheWeek: [],
  artistInfo: [],
  artistsTotal: [],
  artistsMonth: []
}

interface InterfaceState {
  artistOfTheWeek: any;
  artistInfo: any;
  artistsTotal: any;
  artistsMonth: any;
}

const mutations = {
    setWeekArtist(state: InterfaceState, payload: any) {
      state.artistOfTheWeek = payload
    },
    setArtistInfo(state: InterfaceState, payload: any) {
      state.artistInfo = payload
    },
    setArtistsTotal(state: InterfaceState, payload: any) {
      state.artistsTotal = payload
    },
    setArtistsMonth(state: InterfaceState, payload: any) {
      state.artistsMonth = payload
    }
}

const getters = {
  getWeekArtist(state: InterfaceState) {
    return state.artistOfTheWeek
  },
  getArtistInfo(state: InterfaceState) {
    return state.artistInfo
  },
  getArtistsTotal(state: InterfaceState) {
    return state.artistsTotal
  },
  getArtistsMonth(state: InterfaceState) {
    return state.artistsMonth
  }
}

const actions = {
     fetchArtistOfTheWeek({commit}: {commit: any}, payload: any) {
        commit('setWeekArtist', [])
       return new Promise ((resolve, reject) => {
         axios.get(base+'artists/?client_id='+clientId+'&limit='+payload+'&format=jsonpretty&order=popularity_month').then((response: any) => {
          resolve(response.data.results)
          commit('setWeekArtist', response.data.results)
         }).catch((error: any) => {
           reject(error)
         })
       })
     },
     fetchArtistInfo({commit}: {commit: any}, payload: any) {
      commit ('setArtistInfo', [])
       return new Promise ((resolve, reject) => {
         axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&id='+payload).then((response: any) => {
           resolve (response.data.results)
           commit ('setArtistInfo', response.data.results)
         }).catch((error) => {
           resolve(error)
         })
       })
     },
     fetchTopArtists({commit}: {commit: any}) {
        commit('setArtistsTotal', [])
       return new Promise ((resolve, reject) => {
         axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&order=popularity_total&limit=16').then((response: any) => {
           resolve(response.data.results)
           commit('setArtistsTotal', response.data.results)
         }).catch((error: any) => {
           reject(error)
         })
       })
     },
     fetchPagesForTopArtists({commit}: {commit: any}, payload: any) {
      commit('setArtistsTotal', [])
       return new Promise ((resolve, reject) => {
         axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&order=popularity_total&limit=16&offset='+payload).then((response: any) => {
           resolve(response.data.results)
           commit('setArtistsTotal', response.data.results)
         }).catch((error: any) => {
           reject(error)
         })
       })
     },
     fetchTopArtistsMonth({commit}: {commit: any}) {
      commit('setArtistsMonth', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&order=popularity_month&limit=16').then((response: any) => {
         resolve(response.data.results)
         commit('setArtistsMonth', response.data.results)
       }).catch((error: any) => {
         reject(error)
       })
     })
   },
   fetchPagesForTopArtistsMonth({commit}: {commit: any}, payload: any) {
    commit('setArtistsMonth', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&order=popularity_month&limit=16&offset='+payload).then((response: any) => {
         resolve(response.data.results)
         commit('setArtistsMonth', response.data.results)
       }).catch((error: any) => {
         reject(error)
       })
     })
   },
   fetchSearchedArtists({commit}: {commit: any}, payload: any) {
    commit('setArtistsTotal', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&limit=50&name='+payload).then((response: any) => {
         resolve(response.data.results)
         commit('setArtistsTotal', response.data.results)
       }).catch((error: any) => {
         reject(error)
       })
     })
   },
}

const artistModule = {
  namespaced:true,
  state,
  mutations,
  getters,
  actions
}

export default artistModule;
