import {base, clientId} from '@/axios_http/index'
import axios from 'axios';

const state = {
  albumOfTheWeek: []
}

interface InterfaceState {
  albumOfTheWeek: any;
}

const mutations = {
    setWeekAlbum(state: InterfaceState, payload: any) {
      state.albumOfTheWeek = payload
    }
}

const getters = {
  getWeekAlbum(state: InterfaceState) {
    return state.albumOfTheWeek
  }
}

const actions = {
    fetchAlbumOfTheWeek({commit}: {commit: any}, payload: number) {
      return new Promise ((resolve, reject) => {
        axios.get(base+'albums/?client_id='+clientId+'&limit='+payload+'&format=jsonpretty&order=popularity_week').then((response: any) => {
          resolve(response.data.results)
          commit('setWeekAlbum', response.data.results)
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
