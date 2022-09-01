import {base, clientId} from '@/axios_http/index'
import { GenreModel, TrackModel } from '@/models';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Commit } from 'vuex';

const state = {
  topTracks: [],
  tracks: []
}

interface InterfaceState {
    topTracks: TrackModel[];
    tracks: TrackModel[];
}

const mutations = {
    setTopTracks(state: InterfaceState, payload: TrackModel[]) {
      state.topTracks = payload
    },
    setTracks(state: InterfaceState, payload: TrackModel[]) {
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
    fetchTopTracks({commit}: {commit: Commit}, payload: number) {
      commit('setTopTracks', [])
      return new Promise ((resolve, reject) => {
        axios.get(base+'tracks/?client_id='+clientId+'&limit='+payload+'&format=jsonpretty&imagesize=600&boost=popularity_month').then((response: AxiosResponse) => {
        resolve(response.data.results)
        commit('setTopTracks', response.data.results)
        }).catch((error: AxiosError) => {
          reject(error)
        })
      })
    },
    fetchAlbumTracks({commit}: {commit: Commit}, payload: string) {
      commit('setTracks', [])
      return new Promise ((resolve, reject)=> {
        axios.get(base+'albums/tracks/?client_id='+clientId+'&format=jsonpretty&limit=1&imagesize=600&id='+payload).then((response: AxiosResponse) => {
          resolve(response.data.results)
          commit('setTracks', response.data.results)
        }).catch((error: AxiosError) => {
          reject(error)
        })
      })
    },
    fetchArtistTracks({commit}: {commit: Commit}, payload: string) {
      commit('setTracks', [])
      return new Promise ((resolve, reject)=> {
        axios.get(base+'artists/tracks/?client_id='+clientId+'&format=jsonpretty&imagesize=600&order=popularity_week&id='+payload).then((response: AxiosResponse) => {
          resolve(response.data.results)
          commit('setTracks', response.data.results)
        }).catch((error: AxiosError) => {
          reject(error)
        })
      })
    },
    fetchPlaylistTracks({commit}: {commit: Commit}, payload: string) {
      return new Promise ((resolve, reject)=> {
        axios.get(base+'playlists/tracks/?client_id='+clientId+'&format=jsonpretty&imagesize=600&id='+payload).then((response: AxiosResponse) => {
          resolve(response.data.results)
          commit('setTracks', response.data.results)
        }).catch((error: AxiosError) => {
          reject(error)
        })
      })
    },
    fetchGenreTracks({commit}: {commit: Commit}, genre: GenreModel,) {
      commit('setTracks', [])
      return new Promise ((resolve, reject) => {
        axios.get(base+'tracks/?client_id='+clientId+'&format=jsonpretty&tags='+genre.genre+'&imagesize=600&limit=20&offset='+genre.offset).then((response: AxiosResponse) => {
          resolve(response.data.results)
          commit('setTracks', response.data.results)
        }).catch((error: AxiosError) => {
          reject(error)
        })
      })
    },
    fetchSearchedTracks({commit}: {commit: Commit}, payload: string) {
      commit('setTracks', [])
      return new Promise((resolve, reject) => {
        axios.get(base+'tracks?client_id='+clientId+'&format=jsonpretty&limit=50&imagesize=600&namesearch='+payload).then((response: AxiosResponse) => {
          resolve(response.data.results)
          commit('setTracks', response.data.results)
        }).catch((error: AxiosError) => {
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
