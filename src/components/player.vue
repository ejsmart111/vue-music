<template>
  <div>
      <div class="large">
        <div class="song">
            <div v-if="current" class="album-art" style="width:70px; height: 70px" :style="{ 'background-image': 'url(' + current.image + ')' }"></div>
            <div v-else class="album-art" style="width:70px; height: 70px;"></div>
            <div style="margin-left: 20px; margin-top:0px">
                <div v-if="current" class="row">
                    <p><span class="title">{{current.name}}</span><br><span class="artist">{{current.artist_name}}</span></p>
                </div>
                <div v-else class="row">
                    <p><span class="title">Song of the Year 2020</span><br><span class="artist">Artist Kawhi</span></p>
                </div>
            </div>
        </div>
        <div class="controls">
            <font-awesome-icon @click="playPrevious" style="margin-right: 10px" class="icons other" icon="backward"/>
            <font-awesome-icon @click="play" v-show="playing" class="icons play" icon="play-circle"/>
            <font-awesome-icon @click="pause" v-show="!playing" class="icons play" icon="pause-circle"/>
            <font-awesome-icon @click="playNext" style="margin-left: 10px" class="icons other" icon="forward"/>
        </div>

        <div class="song-slider">
            <input class="range" ref="time" type="range" min="0" step="1" :max="audio.duration" v-model="audio.currentTime" />
        </div>
        <div class="song-controllers" style="margin-top: 14px">
            <font-awesome-icon @click="repeat" :style="isRepeat?{color: 'var(--main)'}: {color: 'var(--icons)'}" class="icons other controllers" icon="redo"/>           
            <font-awesome-icon @click="shuffle" :style="isShuffle?{color: 'var(--main)'}: {color: 'var(--icons)'}" class="icons other controllers" icon="random"/>
            <font-awesome-icon v-if="mutes" @click="mute" style="color: var(--main)" class="icons other controllers" icon="volume-mute"/>
            <font-awesome-icon v-else @click="mute" style="color: var(--icons)" class="icons other controllers" icon="volume-up"/>
            <input class="range volume" style="margin-top: -12px" type="range" min="0" step="0.01" max="1" @change="audio.muted = false"  v-model="audio.volume" />
            <!-- <font-awesome-icon class="icons other controllers" style="font-size: 20px" icon="info-circle"/> -->
        </div>
      </div>    
      <div class="all">
        <div class="mobile">
            <div class="cont">
                <font-awesome-icon style="margin-right: 10px" class="icons other" icon="backward"/>
                <font-awesome-icon class="icons play" icon="play-circle"/>
                <font-awesome-icon style="margin-left: 10px" class="icons other" icon="forward"/>
            </div>
            <div class="song-slider" style="margin: 10px auto">
                <input class="range" style="margin-top:10px" type="range" min="1" step="0" value="0" />                
            </div>
            <div class="song-controllers">
                <font-awesome-icon class="icons other controllers" icon="redo"/>           
                <font-awesome-icon class="icons other controllers" icon="random"/>
                <font-awesome-icon class="icons other controllers" icon="volume-mute"/>
            </div>
            <div class="row" style="margin: 0 auto">
                <p><span class="title">Die Young</span><br><span class="artist">Roddy Ricch</span></p>
            </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Player extends Vue {
    playing = false
    mutes = false

    get audio () {
        return this.$store.getters['getAudio']
    }
    get current () {
        return this.$store.getters['getCurrent']
    }
    get isShuffle () {
        return this.$store.getters['getShuffle']
    }
    get isRepeat () {
        return this.$store.getters['getRepeat']
    }

    shuffle() {
        this.$store.commit('setShuffle')
    }
    repeat() {
        this.$store.commit('setRepeat')
    }
    play () {
        this.audio.play()
        this.playing = !this.playing
    }
    pause () {
        this.audio.pause()
        this.playing = !this.playing
    }
    playNext () {
        this.$store.commit('playNextSong')
        this.audio.play()
    }
    playPrevious () {
        this.$store.commit('playPreviousSong')
        this.audio.play()
    }
    slider () {
        setInterval(() => {
            if(this.audio.ended) {
                this.playNext()
            }
            const c = this.$refs.time as any
            c.value = Math.round(this.audio.currentTime)
        }, 1000)
    }
    mute () {
        this.audio.muted = !this.audio.muted
        this.mutes = !this.mutes
    }

    mounted() {
        this.slider()
    }

}
</script>

<style lang="scss" scoped>
    .large {
        display: flex;
        flex-direction: row;
        padding: 0px 30px 0 30px;
        margin: 0 auto;
        width: 80%;
    }

    .icons {
        cursor: pointer;
    }

    .all {
        display: none;
        flex-direction: row;
        padding: 0px 30px 0 30px;
        margin: 0 auto;
        padding-top: 10px;
        justify-content: center;
    }

    .mobile {
        display: flex;
        flex-direction: column;
        flex: 1 0 400px;
        justify-items: center;
        >.song-controllers {
            margin: 0 auto;
        }
        .controllers {
            margin-top: 10px
        }
    }

    .cont{
        display: flex;
        justify-items: center;
        // margin-top: 4px;
        margin: 0 auto;
        >.other {
            margin-top: 15px;
        }
    }

    @media (max-width: 1300px) and (min-width: 300px) {
        .large {
            display: none;
        }
        .all {
            display: flex;
        }
    }

    @media (max-width: 500px) {
        .range {
            width: 300px !important
        }
    }

    .album-art {
        border: 1px solid rgb(167, 167, 167);
        border-radius: 50%;
        background-size: cover;
        background-position: center;
    }

    .song-controllers, .song-slider {
        flex: 1 1 0px;
        display: flex;
        margin-top: 4px;
    }

    .controls {
        flex: 0 1 0px;
        display: flex;
        margin-top: 14px;
        >.other {
            margin-top: 15px;
        }
    }

    .song {
        flex: 0 1 300px;
        display: flex;
    }

    .play {
        color: var(--main);
        font-size: 50px;
    }

    span.title {
        color: var(--text-dark);
        font-family: 'Nunito';
        font-weight: bold;
        font-size: 16px;
    }

    span.artist {
        color: var(--text-light);
        font-family: 'Nunito';
        font-size: 14px;
    }

    .range {
        -webkit-appearance: none;
        vertical-align: middle;
        outline: none;
        border: none;
        padding: 0;
        background: none;
        margin-top: -7px;
        margin-left: 30px;
        width: 400px;
    }

    .range.volume {
        width: 150px;
    }

    .range::-webkit-slider-runnable-track {
        background-color: #d7dbdd;
        height: 3px;
        border-radius: 3px;
        border: 1px solid transparent;
    }

    .range::-moz-range-track {
        background-color: var(--main);
        height: 3px;
        border-radius: 3px;
        border: none;
    }

    .range::-ms-track {
        color: transparent;
        border: none;
        background: none;
        height: 3px;
    }

    .range::-ms-fill-lower { 
        background-color: #d7dbdd;
        border-radius: 3px;
    }

    .range::-ms-fill-upper { 
        background-color: #d7dbdd;
        border-radius: 3px;
    }

    .range::-ms-tooltip { display: none; /* display and visibility only */ }

    .range::-moz-range-thumb {
        border-radius: 20px;
        margin-top: -5px;
        height: 18px;
        width: 18px;
        border: none;
        background: none;
        background-color: var(--main);
    }

    .range:active::-moz-range-thumb {
        outline: none;
    }

    .range::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        border-radius: 100%;
        background-color: var(--main);
        height: 18px;
        width: 18px;
        margin-top: -8px;
    }

    .range[disabled]::-webkit-slider-thumb {
        background-color: transparent;
        border: 1px solid #d7dbdd;
    }

    .range:active::-webkit-slider-thumb {
        outline: none;
    }

    .range::-ms-thumb { 
        border-radius: 100%;
        background-color: var(--main);
        height: 18px;
        width: 18px; 
        border: none;
    }

    .range:active::-ms-thumb {
        border: none;
    }

    .controllers{
        margin-left: 15px;
        font-size: 16px;
        margin-top: 17px;
    }
</style>