<template>
    <div class="back" :style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.649), rgba(0, 0, 0, 0.90)),url(' + current.image + ')' }">
        <div class="image">
            <img class="image-fluid" :src='current.image'/>
        </div>
        <div style="width:300px;margin: 0 auto; margin-top:20px;text-align:center">
            <div>
                <div v-if="current" class="row">
                    <p style="cursor:pointer" @click="clickTo"><span class="title">{{current.name.length > 25?(current.name).substring(0,25)+'...': current.name}}</span><br><br><span class="artist">{{current.artist_name.length > 25?(current.artist_name).substring(0,25)+'...': current.artist_name}}</span></p>
                </div>
            </div>
            <div class="song-controllers" style="margin: 0 auto;margin-top: 14px">
                <font-awesome-icon @click="repeat" :style="isRepeat?{color: 'var(--main)'}: {color: 'var(--icons)'}" class="icons other controllers" icon="redo"/>           
                <font-awesome-icon @click="shuffle" :style="isShuffle?{color: 'var(--main)'}: {color: 'var(--icons)'}" class="icons other controllers" icon="random"/>
                <font-awesome-icon v-if="mutes" @click="mute" style="color: var(--main)" class="icons other controllers" icon="volume-mute"/>
                <font-awesome-icon v-else @click="mute" style="color: var(--icons)" class="icons other controllers" icon="volume-up"/>
            </div>
            <div class="song-slider">
                <p style="color: var(--icons);font-family:nunito;margin-top:28px;">{{times}}</p>
                <input class="range" style="margin-top:10px; margin-right:20px;width: 400px;" ref="time" type="range" min="0" step="0.1" :max="audio.duration" v-model="audio.currentTime" />
                <p style="color: var(--icons);font-family:nunito;margin-top:28px;">{{convertTime(current.duration)}}</p>
            </div>
            <div class="controls" style="text-align: center">
                <font-awesome-icon @click="playPrevious" style="margin-right: 10px;" class="icons other" icon="backward"/>
                <font-awesome-icon @click="play" v-show="playing" class="icons play" icon="play-circle"/>
                <font-awesome-icon @click="pause" v-show="!playing" class="icons play" icon="pause-circle"/>
                <font-awesome-icon @click="playNext" style="margin-left: 10px" class="icons other" icon="forward"/>
            </div>
        </div>
        <button class="buuu" @click="$store.commit('showFullFalse')">Close Full View <font-awesome-icon style="margin-left:10px" icon="chevron-down"/></button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component 
export default class ViewPlayer extends Vue {
    playing = false
    mutes = false
    clickTo() {
        this.$store.commit('showFullFalse'); 
        this.$router.push('/album/'+this.current.album_id)
    }
    get current (){
        return this.$store.getters['getCurrent']
    }
    get audio () {
        return this.$store.getters['getAudio']
    }
    get isShuffle () {
        return this.$store.getters['getShuffle']
    }
    get isRepeat () {
        return this.$store.getters['getRepeat']
    }
    mute () {
        this.audio.muted = !this.audio.muted
        this.mutes = !this.mutes
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
    convertTime (secs: any) {
        const min = Math.floor(secs / 60);
        const sec = secs % 60;
        const minute = (min < 10) ? "0" + min : min;
        const seconds = (sec < 10) ? "0" + sec : sec;
        return (minute + ':' + seconds);
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
            const c = this.$refs.time as any
            const d = this.$refs['mobile-time'] as any
            c.value = Math.round(this.audio.currentTime)
            d.value = Math.round(this.audio.currentTime)
            this.times = this.convertTime(Math.round(this.audio.currentTime))
        }, 1000)
    }

    mounted () {
        this.slider()
    }
}
</script>

<style lang="scss" scoped>
    .back {
        backdrop-filter: blur(100%);
        background-position: center;
        position: absolute;
        background-size: cover;
        width: 100vw;
        height: 100vh
    }

    .buuu {
        font-family: nunito;
        color: white;
        background-color: rgba(0, 0, 0, 0.801);
        height: 40px;
        width: 100%;
        bottom: 0;
        position: fixed;
        box-shadow: 0;
        border: 0;
        cursor: pointer;
    }

    .image-fluid {
        width: 300px;
        height: 300px;
        border-radius: 20px;
    }
    .icons {
        cursor: pointer;
    }
    .controls {
        flex: 1 1 0px;
        display: flex;
        padding-left: 10px;
        padding-right: 10px;
        justify-content: center;
        margin-top: 10px;
        >.other {
            margin-top: 15px;
        }
    }
    .play {
        color: var(--main);
        font-size: 50px;
        margin-top: 0px;
    }

    .image {
        margin: 0 auto;
        margin-top: 20px;
        width: 300px;
        height: 300px;
        border: 1px solid var(--main);
        border-radius: 20px;
        
    }

    a {
        text-decoration: none;
    }

    .title {
        color: var(--main);
        font-family: nunito;
        font-size: 20px;
        font-weight: bolder;
    }
    .artist {
        color: white;
        font-family: nunito;
        font-size: 16px;
    }
    .song-slider {
        flex: 1 1 450px;
        display: flex;
        // margin-top: 4px;
    }
    .controllers {
        flex: 0 0 30%
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

    .song-controllers {
        display: flex;
        margin-top: 14px;
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
</style>