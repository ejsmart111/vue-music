import {base, clientId} from '@/axios_http/index'
import { PlaylistModel } from '@/models';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Commit } from 'vuex';

const state = {
  topPlaylists: []
}

interface InterfaceState {
  topPlaylists: PlaylistModel[];
}

const mutations = {
    setTopPlaylists(state: InterfaceState, payload: PlaylistModel[]) {
      state.topPlaylists = payload
    }
}

const getters = {
  getTopPlaylists(state: InterfaceState) {
    return state.topPlaylists
  }
}

const actions = {
    fetchTopPlaylists({commit}: {commit: Commit}) {
      commit('setTopPlaylists', [])
      return new Promise ((resolve, reject) => {
        axios.get(base+'playlists/?client_id='+clientId+'&format=jsonpretty&limit=16').then((response: AxiosResponse) => {
          resolve(response.data.results)
          commit('setTopPlaylists', response.data.results)
        }).catch((error: AxiosError) => {
          reject(error)
        })
      })
    },
    fetchTopPlaylistsPaged({commit}: {commit: Commit}, payload: number) {
      commit('setTopPlaylists', [])
      return new Promise ((resolve, reject) => {
        axios.get(base+'playlists/?client_id='+clientId+'&format=jsonpretty&limit=16&offset='+payload).then((response: AxiosResponse) => {
          resolve(response.data.results)
          commit('setTopPlaylists', response.data.results)
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
