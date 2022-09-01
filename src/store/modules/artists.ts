import {base, clientId} from '@/axios_http/index'
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ArtistModel } from '@/models';
import { Commit } from 'vuex';

const state: InterfaceState = {
  artistOfTheWeek: [],
  artistInfo: [],
  artistsTotal: [],
  artistsMonth: []
}

interface InterfaceState {
  artistOfTheWeek: ArtistModel[];
  artistInfo: ArtistModel[];
  artistsTotal: ArtistModel[];
  artistsMonth: ArtistModel[];
}

const mutations = {
    setWeekArtist(state: InterfaceState, payload: ArtistModel[]): void {
      state.artistOfTheWeek = payload
    },
    setArtistInfo(state: InterfaceState, payload: ArtistModel[]): void {
      state.artistInfo = payload
    },
    setArtistsTotal(state: InterfaceState, payload: ArtistModel[]): void {
      state.artistsTotal = payload
    },
    setArtistsMonth(state: InterfaceState, payload: ArtistModel[]): void {
      state.artistsMonth = payload
    }
}

const getters = {
  getWeekArtist(state: InterfaceState): ArtistModel[] {
    return state.artistOfTheWeek
  },
  getArtistInfo(state: InterfaceState): ArtistModel[] {
    return state.artistInfo
  },
  getArtistsTotal(state: InterfaceState): ArtistModel[] {
    return state.artistsTotal
  },
  getArtistsMonth(state: InterfaceState): ArtistModel[] {
    return state.artistsMonth
  }
}

const actions = {
     fetchArtistOfTheWeek({commit}: {commit: Commit}, payload: number) {
        commit('setWeekArtist', [])
       return new Promise ((resolve, reject) => {
         axios.get(base+'artists/?client_id='+clientId+'&limit='+payload+'&format=jsonpretty&imagesize=600&order=popularity_month').then((response: AxiosResponse) => {
          resolve(response.data.results)
          commit('setWeekArtist', response.data.results)
         }).catch((error: AxiosError) => {
           reject(error)
         })
       })
     },
     fetchArtistInfo({commit}: {commit: Commit}, payload: string) {
      commit ('setArtistInfo', [])
       return new Promise ((resolve, reject) => {
         axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&imagesize=600&id='+payload).then((response: AxiosResponse) => {
           resolve (response.data.results)
           commit ('setArtistInfo', response.data.results)
         }).catch((error) => {
           resolve(error)
         })
       })
     },
     fetchTopArtists({commit}: {commit: Commit}) {
        commit('setArtistsTotal', [])
       return new Promise ((resolve, reject) => {
         axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&imagesize=600&order=popularity_total&limit=16').then((response: AxiosResponse) => {
           resolve(response.data.results)
           commit('setArtistsTotal', response.data.results)
         }).catch((error: AxiosError) => {
           reject(error)
         })
       })
     },
     fetchPagesForTopArtists({commit}: {commit: Commit}, payload: number) {
      commit('setArtistsTotal', [])
       return new Promise ((resolve, reject) => {
         axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&imagesize=600&order=popularity_total&limit=16&offset='+payload).then((response: AxiosResponse) => {
           resolve(response.data.results)
           commit('setArtistsTotal', response.data.results)
         }).catch((error: AxiosError) => {
           reject(error)
         })
       })
     },
     fetchTopArtistsMonth({commit}: {commit: Commit}) {
      commit('setArtistsMonth', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&imagesize=600&order=popularity_month&limit=16').then((response: AxiosResponse) => {
         resolve(response.data.results)
         commit('setArtistsMonth', response.data.results)
       }).catch((error: AxiosError) => {
         reject(error)
       })
     })
   },
   fetchPagesForTopArtistsMonth({commit}: {commit: Commit}, payload: number) {
    commit('setArtistsMonth', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&imagesize=600&order=popularity_month&limit=16&offset='+payload).then((response: AxiosResponse) => {
         resolve(response.data.results)
         commit('setArtistsMonth', response.data.results)
       }).catch((error: AxiosError) => {
         reject(error)
       })
     })
   },
   fetchSearchedArtists({commit}: {commit: Commit}, payload: string) {
    commit('setArtistsTotal', [])
     return new Promise ((resolve, reject) => {
       axios.get(base+'artists/?client_id='+clientId+'&format=jsonpretty&imagesize=600&limit=50&namesearch='+payload).then((response: AxiosResponse) => {
         resolve(response.data.results)
         commit('setArtistsTotal', response.data.results)
       }).catch((error: AxiosError) => {
         reject(error)
       })
     })
   },
}

const artistModule = {
  namespaced:true,
  state,
  mutations,
  getters,
  actions
}

export default artistModule;
