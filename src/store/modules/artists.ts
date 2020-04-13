import {base, clientId} from '@/axios_http/index'
import axios from 'axios';

const state = {
  artistOfTheWeek: []
}

interface InterfaceState {
  artistOfTheWeek: any;
}

const mutations = {
    setWeekArtist(state: InterfaceState, payload: any) {
      state.artistOfTheWeek = payload
    }
}

const getters = {
  getWeekArtist(state: InterfaceState) {
    return state.artistOfTheWeek
  }
}

const actions = {
     fetchArtistOfTheWeek({commit}: {commit: any}) {
       return new Promise ((resolve, reject) => {
         axios.get(base+'artists/?client_id='+clientId+'&limit=1&format=jsonpretty&order=popularity_week').then((response: any) => {
          resolve(response.data.results)
          commit('setWeekArtist', response.data.results)
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
