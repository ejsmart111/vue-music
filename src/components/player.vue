<template>
  <div>
      <div class="large">
        <div class="imager">
            <div v-if="current" class="album-art" style="width:50px; height: 50px" :style="{ 'background-image': 'url(' + current.image + ')' }"></div>
            <div v-else class="album-art" style="width:70px; height: 70px;"></div>
        </div>
        <div class="song">
            <div @click="$store.commit('showFullTrue')" style="margin-left: 20px; margin-top:0px; cursor:pointer">
                <div v-if="current" class="row">
                    <p><span class="title">{{current.name.length > 18?(current.name).substring(0,18)+'...': current.name}}</span><br><span class="artist">{{current.artist_name.length > 25?(current.artist_name).substring(0,25)+'...': current.artist_name}}</span></p>
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
            <p style="color: var(--icons);font-family:nunito;margin-top:28px;">{{times}}</p>
            <input class="range" style="margin-top:10px; margin-right:20px;width: 400px;" ref="time" type="range" min="0" step="0.1" :max="audio.duration" v-model="audio.currentTime" />
            <p style="color: var(--icons);font-family:nunito;margin-top:28px;">{{convertTime(current.duration)}}</p>
        </div>
        <div class="song-controllers" style="margin-top: 14px">
            <font-awesome-icon @click="repeat" :style="isRepeat?{color: 'var(--main)'}: {color: 'var(--icons)'}" class="icons other controllers" icon="redo"/>           
            <font-awesome-icon @click="shuffle" :style="isShuffle?{color: 'var(--main)'}: {color: 'var(--icons)'}" class="icons other controllers" icon="random"/>
            <font-awesome-icon v-if="mutes" @click="mute" style="color: var(--main)" class="icons other controllers" icon="volume-mute"/>
            <font-awesome-icon v-else @click="mute" style="color: var(--icons)" class="icons other controllers" icon="volume-up"/>
            <input class="range volume" style="margin-top: -10px" type="range" min="0" step="0.01" max="1" @change="audio.muted = false"  v-model="audio.volume" />
            <!-- <font-awesome-icon class="icons other controllers" style="font-size: 20px" icon="info-circle"/> -->
        </div>
      </div>    
      <div class="all">
        <div class="mobile">
            <div class="cont">
                <font-awesome-icon @click="playPrevious" style="margin-right: 10px" class="icons other" icon="backward"/>
                <font-awesome-icon @click="play" v-show="playing" class="icons play" icon="play-circle"/>
                <font-awesome-icon @click="pause" v-show="!playing" class="icons play" icon="pause-circle"/>
                <font-awesome-icon @click="playNext" style="margin-left: 10px" class="icons other" icon="forward"/>
            </div>
            <!-- <div class="song-slider" style="margin: -10px auto">
                <p style="color:var(--icons);font-family:nunito;margin-top:26px;">{{times}}</p>
                <input class="range" ref="mobile-time" style="margin-top:10px;margin-left:8px;max-width:200px" type="range" min="0" step="0.1" :max="audio.duration" v-model="audio.currentTime"/>                
                <p style="color: var(--icons);font-family:nunito;margin-top:26px;margin-left:8px">{{convertTime(current.duration)}}</p>
            </div> -->
            <!-- <div style="margin-top: -10px" class="song-controllers">
                <font-awesome-icon @click="repeat" :style="isRepeat?{color: 'var(--main)'}: {color: 'var(--icons)'}" class="icons other controllers" icon="redo"/>           
                <font-awesome-icon @click="shuffle" :style="isShuffle?{color: 'var(--main)'}: {color: 'var(--icons)'}" class="icons other controllers" icon="random"/>
                <font-awesome-icon v-if="mutes" @click="mute" style="color: var(--main)" class="icons other controllers" icon="volume-mute"/>
                <font-awesome-icon v-else @click="mute" style="color: var(--icons)" class="icons other controllers" icon="volume-up"/>
            </div> -->
            <div @click="$store.commit('showFullTrue')" v-if="current" class="row" style="margin: 0 auto;text-align: center">
                <p><span class="title">{{current.name.length > 25?(current.name).substring(0,25)+'...': current.name}}</span><br><span class="artist">{{current.artist_name.length > 25?(current.artist_name).substring(0,25)+'...': current.artist_name}}</span></p>
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
    get convertDurationToMinutes() {
        return (Math.round(this.audio.duration)/60).toFixed(2)
    }
    get convertCurrentTimeToMinutes() {
        return (Math.round(this.audio.currentTime)/60).toFixed(2)
    }

    convertTime (secs: any) {
        const min = Math.floor(secs / 60);
        const sec = secs % 60;
        const minute = (min < 10) ? "0" + min : min;
        const seconds = (sec < 10) ? "0" + sec : sec;
        return (minute + ':' + seconds);
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
    times = '00:00'
    slider () {
        setInterval(() => {
            if(this.audio.ended) {
                this.playNext()
            }
            const c = this.$refs.time as any
            const d = this.$refs['mobile-time'] as any
            c.value = Math.round(this.audio.currentTime)
            d.value = Math.round(this.audio.currentTime)
            this.times = this.convertTime(Math.round(this.audio.currentTime))
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
        width: 100%;
    }

    .icons {
        cursor: pointer;
    }

    .all {
        display: none;
        flex-direction: row;
        padding: 0px 30px 0 10px;
        margin: 0 auto;
        padding-top: 15px;
        padding-bottom: 15px;
        justify-content: center;
    }

    .mobile {
        display: flex;
        flex-direction: column;
        flex: 1 0 400px;
        justify-items: center;
        max-height: 170px;
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

    @media (max-width: 1190px) {
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

    .song-controllers {
        flex: 1 1 450px;
        display: flex;
        margin-top: 4px;
    }
    .song-slider {
        flex: 1 1 450px;
        display: flex;
        // margin-top: 4px;
    }

    .controls {
        flex: 1 1 0px;
        display: flex;
        margin-top: 14px;
        padding-left: 10px;
        padding-right: 10px;
        >.other {
            margin-top: 15px;
        }
    }
    .imager {
        flex: 2 2 50px;
        padding-top: 10px;
    }
    .song {
        flex: 2 2 200px;
        display: flex;
        max-height: 100%;
    }

    .play {
        color: var(--main);
        font-size: 50px;
    }

    span.title {
        color: var(--text-dark);
        font-family: 'Nunito';
        font-weight: bold;
        font-size: 14px;
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
        cursor: pointer;
    }

    .range.volume {
        width: 150px;
    }

    .range::-webkit-slider-runnable-track {
        background-color: var(--main);
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
        background-color: var(--main);
        border-radius: 3px;
    }

    .range::-ms-fill-upper { 
        background-color: var(--main);
        border-radius: 3px;
    }

    .timer {
        color: var(--icons);
        font-size: 14px;
        font-family: nunito;
        margin-top: 24px;
        margin-left: 10px;
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
    a {
        text-decoration: none;
    }
</style>