import {base, clientId} from '@/axios_http/index'
import axios from 'axios';

const state = {
  topPlaylists: []
}

interface InterfaceState {
  topPlaylists: any;
}

const mutations = {
    setTopPlaylists(state: InterfaceState, payload: any) {
      state.topPlaylists = payload
    }
}

const getters = {
  getTopPlaylists(state: InterfaceState) {
    return state.topPlaylists
  }
}

const actions = {
    fetchTopPlaylists({commit}: {commit: any}, payload: number) {
      return new Promise ((resolve, reject) => {
        axios.get(base+'playlists/?client_id='+clientId+'&format=jsonpretty').then((response: any) => {
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
