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
      commit('setTopTracks', [])
      return new Promise ((resolve, reject) => {
        axios.get(base+'tracks/?client_id='+clientId+'&limit='+payload+'&format=jsonpretty&boost=popularity_month').then((response: any) => {
        resolve(response.data.results)
        commit('setTopTracks', response.data.results)
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
    fetchAlbumTracks({commit}: {commit: any}, payload: any) {
      commit('setTracks', [])
      return new Promise ((resolve: any, reject: any)=> {
        axios.get(base+'albums/tracks/?client_id='+clientId+'&format=jsonpretty&limit=1&id='+payload).then((response: any) => {
          resolve(response.data.results)
          commit('setTracks', response.data.results)
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
    fetchArtistTracks({commit}: {commit: any}, payload: any) {
      commit('setTracks', [])
      return new Promise ((resolve: any, reject: any)=> {
        axios.get(base+'artists/tracks/?client_id='+clientId+'&format=jsonpretty&order=popularity_week&id='+payload).then((response: any) => {
          resolve(response.data.results)
          commit('setTracks', response.data.results)
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
    fetchPlaylistTracks({commit}: {commit: any}, payload: any) {
      return new Promise ((resolve: any, reject: any)=> {
        axios.get(base+'playlists/tracks/?client_id='+clientId+'&format=jsonpretty&id='+payload).then((response: any) => {
          resolve(response.data.results)
          commit('setTracks', response.data.results)
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
    fetchGenreTracks({commit}: {commit: any}, genre: any,) {
      commit('setTracks', [])
      return new Promise ((resolve, reject) => {
        axios.get(base+'tracks/?client_id='+clientId+'&format=jsonpretty&tags='+genre.genre+'&limit=20&offset='+genre.offset).then((response: any) => {
          resolve(response.data.results)
          commit('setTracks', response.data.results)
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
    fetchSearchedTracks({commit}: {commit: any}, payload: any) {
      commit('setTracks', [])
      return new Promise((resolve, reject) => {
        axios.get(base+'tracks?client_id='+clientId+'&format=jsonpretty&limit=50&name='+payload).then((response: any) => {
          resolve(response.data.results)
          commit('setTracks', response.data.results)
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
