import {base, clientId} from '@/axios_http/index'
import axios from 'axios';

const state = {
  topTracks: [],
  tracks: []
}

interface InterfaceState {
    topTracks: any;
    tracks: any;
}

const mutations = {
    setTopTracks(state: InterfaceState, payload: any) {
      state.topTracks = payload
    },
    setTracks(state: InterfaceState, payload: any) {
      state.tracks = payload
    },
}

const getters = {
  getTopTracks(state: InterfaceState) {
    return state.topTracks
  },
  getTracks(state: InterfaceState) {
    return state.tracks
  }
}

const actions = {
    fetchTopTracks({commit}: {commit: any}, payload: any) {
      return new Promise ((resolve, reject) => {
        axios.get(base+'tracks/?client_id='+clientId+'&limit='+payload+'&format=jsonpretty&boost=popularity_week').then((response: any) => {
        resolve(response.data.results)
        commit('setTopTracks', response.data.results)
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
    fetchAlbumTracks({commit}: {commit: any}, payload: any) {
      return new Promise ((resolve: any, reject: any)=> {
        axios.get(base+'albums/tracks/?client_id='+clientId+'&format=jsonpretty&limit=1&id='+payload).then((response: any) => {
          resolve(response.data.results)
          commit('setTracks', response.data.results)
        }).catch((error: any) => {
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
