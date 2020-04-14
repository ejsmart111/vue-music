import {base, clientId} from '@/axios_http/index'
import axios from 'axios';

const state = {
  artistOfTheWeek: [],
  artistInfo: [],
}

interface InterfaceState {
  artistOfTheWeek: any;
  artistInfo: any;
}

const mutations = {
    setWeekArtist(state: InterfaceState, payload: any) {
      state.artistOfTheWeek = payload
    },
    setArtistInfo(state: InterfaceState, payload: any) {
      state.artistInfo = payload
    }
}

const getters = {
  getWeekArtist(state: InterfaceState) {
    return state.artistOfTheWeek
  },
  getArtistInfo(state: InterfaceState) {
    return state.artistInfo
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
