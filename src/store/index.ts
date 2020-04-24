import Vue from 'vue'
import Vuex from 'vuex'
import artistModule from './modules/artists'
import albumModule from './modules/album'
import trackModule from './modules/track'
import playlistModule from './modules/playlist'

Vue.use(Vuex)

interface InterState {
    sideNav: boolean;
    audio: any;
    current: any;
    tracksQueue: any;
    isShuffle: boolean;
    isRepeat: boolean;
    showFull: boolean;
}

const state = {
  sideNav: false,
    audio: new Audio(),
    current: null,
    tracksQueue: [],
    isShuffle: false,
    isRepeat: false,
    showFull: false,
}

const mutations = {
  setSideNav(state: any) {
    state.sideNav = !state.sideNav
  },
  setSideNavFalse(state: any) {
    state.sideNav = false
  },
  setShuffle(state: InterState) {
    state.isShuffle = !state.isShuffle
  },
  setShuffleTrue(state: InterState) {
    state.isShuffle = true
  },
  setRepeat(state: InterState) {
    state.isRepeat = !state.isRepeat
  },
  showFullTrue(state: InterState){
    state.showFull = true
  },
  showFullFalse(state: InterState){
    state.showFull = false
  },
  playTrack(state: InterState, payload: any) {
    let indexToUpdate = -1
    state.tracksQueue.forEach((thisTrack: any, index: any, trackArray: any) => {
        if (payload.id === thisTrack.id) {
            indexToUpdate = index
        }
    })
    state.current = state.tracksQueue[indexToUpdate]
  },
  setTracksQueue(state: InterState, payload: any) {
    state.tracksQueue = payload
  },
  playNextSong(state: InterState) {
    let indexToUpdate = -1
    state.tracksQueue.forEach((thisTrack: any, index: any, trackArray: any) => {
        if (state.current.id === thisTrack.id) {
            indexToUpdate = index
        }
    })
    if (state.isRepeat) {
      state.current = state.tracksQueue[indexToUpdate]
      state.audio.src = state.tracksQueue[indexToUpdate].audio
    } else if (state.isShuffle) {
      const random = Math.floor(Math.random() * Math.floor(state.tracksQueue.length))
      state.current = state.tracksQueue[random]
      state.audio.src = state.tracksQueue[random].audio
    } else{
      if (indexToUpdate+1 <= state.tracksQueue.length - 1) {
        state.current = state.tracksQueue[indexToUpdate+1]
        state.audio.src = state.tracksQueue[indexToUpdate+1].audio
      } else {
        state.current = state.tracksQueue[0]
        state.audio.src = state.tracksQueue[0].audio
      }
    }
  },
  playPreviousSong(state: InterState) {
    let indexToUpdate = -1
    state.tracksQueue.forEach((thisTrack: any, index: any, trackArray: any) => {
        if (state.current.id === thisTrack.id) {
            indexToUpdate = index
        }
    })
    if (state.isRepeat) {
      state.current = state.tracksQueue[indexToUpdate]
      state.audio.src = state.tracksQueue[indexToUpdate].audio
    } else if (state.isShuffle) {
      const random = Math.floor(Math.random() * Math.floor(state.tracksQueue.length))
      state.current = state.tracksQueue[random]
      state.audio.src = state.tracksQueue[random].audio
    } else {
      if (indexToUpdate-1 < 0) {
        state.current = state.tracksQueue[state.tracksQueue.length]
        state.audio.src = state.tracksQueue[state.tracksQueue.length].audio
      } else {
        state.current = state.tracksQueue[indexToUpdate-1]
        state.audio.src = state.tracksQueue[indexToUpdate -1].audio
      }
    }
  }
}

const getters = {
  getSideNav (state: any) {
    return state.sideNav
  },
  getAudio (state: InterState) {
    return state.audio
  },
  getCurrent (state: InterState) {
    return state.current
  },
  getShuffle(state: InterState) {
    return state.isShuffle
  },
  getRepeat (state: InterState) {
    return state.isRepeat
  },
  getShowFull (state: InterState) {
    return state.showFull
  }
}

const actions = {

}
const store =  new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    artistModule,
    albumModule,
    trackModule,
    playlistModule,
  }
})

export default store;
