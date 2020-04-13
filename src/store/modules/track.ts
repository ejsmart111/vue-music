import {base, clientId} from '@/axios_http/index'
import axios from 'axios';

const state = {
  topTracks: [],
}

interface InterfaceState {
    topTracks: any;
}

const mutations = {
    setTopTracks(state: InterfaceState, payload: any) {
      state.topTracks = payload
    },
}

const getters = {
  getTopTracks(state: InterfaceState) {
    return state.topTracks
  }
}

const actions = {
     fetchTopTracks({commit}: {commit: any}) {
       return new Promise ((resolve, reject) => {
         axios.get(base+'tracks/?client_id='+clientId+'&limit=3&format=jsonpretty&boost=popularity_week').then((response: any) => {
          resolve(response.data.results)
          commit('setTopTracks', response.data.results)
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
