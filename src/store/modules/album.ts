import {base, clientId} from '@/axios_http/index'
import axios from 'axios';

const state = {
  albumOfTheWeek: [],
  albums: []
}

interface InterfaceState {
  albumOfTheWeek: any;
  albums: any;
}

const mutations = {
    setWeekAlbum(state: InterfaceState, payload: any) {
      state.albumOfTheWeek = payload
    },
    setAlbums (state: InterfaceState, payload: any) {
      state.albums = payload
    }
}

const getters = {
  getWeekAlbum(state: InterfaceState) {
    return state.albumOfTheWeek
  },
  getAlbums(state: InterfaceState) {
    return state.albums
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
    fetchArtistAlbums ({commit}: {commit: any}, payload: any) {
      return new Promise ((resolve, reject) => {
        axios.get(base+'artists/albums/?client_id='+clientId+'&format=jsonpretty&id='+payload).then((response: any) => {
          resolve(response.data.results)
          commit('setAlbums', response.data.results)
        }).catch((error: any) => {
          reject(error)
        })
      })
    }
}

const albumModule = {
  namespaced:true,
  state,
  mutations,
  getters,
  actions
}

export default albumModule;
