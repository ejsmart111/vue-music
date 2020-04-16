// https://api.jamendo.com/v3.0/radios?client_id=aec319ae&format=jsonpretty&offset=10

import {base, clientId} from '@/axios_http/index'
import axios from 'axios';

const state = {
  radios: []
}

interface InterfaceState {
  radios: any;
}

const mutations = {
    setRadios(state: InterfaceState, payload: any) {
      state.radios = payload
    },
}

const getters = {
  getRadios(state: InterfaceState) {
    return state.radios
  },
}

const actions = {
     fetchRadios({commit}: {commit: any}) {
        commit('setRadios', [])
       return new Promise ((resolve, reject) => {
         axios.get(base+'radios/?client_id='+clientId+'&limit=16&format=jsonpretty').then((response: any) => {
          resolve(response.data.results)
          commit('setRadios', response.data.results)
         }).catch((error: any) => {
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
