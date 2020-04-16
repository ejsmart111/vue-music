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
      commit('setTopPlaylists', [])
      return new Promise ((resolve, reject) => {
        axios.get(base+'playlists/?client_id='+clientId+'&format=jsonpretty&limit=16').then((response: any) => {
          resolve(response.data.results)
          commit('setTopPlaylists', response.data.results)
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
    fetchTopPlaylistsPaged({commit}: {commit: any}, payload: number) {
      commit('setTopPlaylists', [])
      return new Promise ((resolve, reject) => {
        axios.get(base+'playlists/?client_id='+clientId+'&format=jsonpretty&limit=16&offset='+payload).then((response: any) => {
          resolve(response.data.results)
          commit('setTopPlaylists', response.data.results)
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
