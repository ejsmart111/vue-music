import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faBackward, faForward, faPlayCircle, faRedo, faRandom, faVolumeMute, faInfoCircle, faHome, faUser, faCompactDisc, faMicrophoneAlt, faBroadcastTower, faMusic, faHeadphonesAlt, faBars, faPauseCircle, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './style.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

library.add(faUserSecret, faBackward, faForward, faPlayCircle, faRedo, faRandom, faVolumeMute, faInfoCircle, faHome, faUser, faCompactDisc, faMicrophoneAlt, faBroadcastTower, faMusic, faHeadphonesAlt, faBars, faPauseCircle, faVolumeUp)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
