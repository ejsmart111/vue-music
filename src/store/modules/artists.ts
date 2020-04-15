import {base, clientId} from '@/axios_http/index'
import axios from 'axios';

const state = {
  artistOfTheWeek: [],
  artistInfo: [],
  artistsTotal: []
}

interface InterfaceState {
  artistOfTheWeek: any;
  artistInfo: any;
  artistsTotal: any;
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
  }
}

const actions = {
     fetchArtistOfTheWeek({commit}: {commit: any}, payload: any) {
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
       return new Promise ((resolve, reject) => {
         axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&order=popularity_total&limit=16&offset='+payload).then((response: any) => {
           resolve(response.data.results)
           commit('setArtistsTotal', response.data.results)
         }).catch((error: any) => {
           reject(error)
         })
       })
     }
}

const artistModule = {
  namespaced:true,
  state,
  mutations,
  getters,
  actions
}

export default artistModule;
