<template>
  <div>
      <pre v-if="error" style="color: var(--text-dark)">{{error}}</pre>
      <loader v-if="loader"/>
      <div v-if="!loader && !error">
        <div class="tops">
            <div style="margin-bottom:80px" class="card top-artist">
                <p class="heads">Artist of the Week</p>
                <div class="top-art" :style="{ 'background-image': 'linear-gradient(rgba(146, 59, 149, 0.349), rgba(149, 59, 144, 0.349)),url(' + topArtist.image + ')' }"></div>
                <router-link :to="'/artist/'+topArtist.id"><p style="margin-top: 14px" class="title">{{topArtist.name}}</p></router-link>
            </div>
            <div style="margin-bottom:80px" class="card top-album">
                <p class="heads">Album of the Week</p>
                <div class="top-al" :style="{ 'background-image': 'linear-gradient(rgba(59, 65, 149, 0.344), rgba(87, 59, 149, 0.344)), url(' + topAlbum.image + ')' }"></div>
                <div class="options">
                    <router-link :to="'/album/'+topAlbum.id"><p style="flex:2 2 0" class="title">{{topAlbum.artist_name}}- <b>{{topAlbum.name}}</b></p></router-link>
                    <a :href="topAlbum.zip" class="title" style="flex: 0 1 100px;margin-top:13px; color: var(--main); text-align: right" >&darr; Download</a>
                </div>
            </div>
        </div>
        <br><br><br><br>
        <p class="heads">Top Tracks</p>
        <div class="tops">
            <div class="card top-tracks" v-for="(track, index) in topTracks" :key="index+'l'">
                <div class="tracks" :style="{ 'background-image': 'url(' + track.image + ')' }">
                    <font-awesome-icon class="play" @click="playSong(track, topTracks)" size="2x" icon="play-circle" style="color: var(--main);margin-top:150px; margin-left:10px;"/>
                </div>
                <div class="options">
                    <p style="flex:2 2 0" class="title">{{track.artist_name}}- {{track.name}}</p>
                    <a :href="track.audiodownload" class="title" style="flex: 0 1 100px;margin-top:13px; color: var(--main); text-align: right" >&darr; Download</a>
                </div>
            </div>
        </div>
        <br><br>
        <p class="heads">Top Albums</p>
        <div class="tops">
            <div class="card top-tracks" v-for="(album, index) in weekAlbum" :key="index+'k'">
                <router-link :to="'/album/'+album.id"><div class="tracks" :style="{ 'background-image': 'url(' + album.image + ')' }">
                    <font-awesome-icon class="play" @click="playAlbum(album.id)" size="2x" icon="play-circle" style="color: var(--main);margin-top:150px; margin-left:10px;"/>
                </div></router-link>
                <div class="options">
                    <router-link :to="'/album/'+album.id" style="flex:2 2 0;margin-top:14px" class="title">{{album.artist_name}}- <b>{{album.name}}</b></router-link>
                    <a :href="album.zip" class="title" style="flex: 0 1 100px;margin-top:13px; color: var(--main); text-align: right" >&darr; Download</a>
                </div>
            </div>
        </div>
        <br><br>
        <p class="heads">Top Artists</p>
        <div class="tops">
            <div class="card top-tracks" v-for="(artist, index) in weekArtist" :key="index+'s'">
                <router-link :to="'/artist/'+artist.id"><div class="tracks" :style="{ 'background-image': 'url(' + artist.image + ')' }">
                </div>
                <div class="options">
                    <p style="flex:2 2 0" class="title"><b>{{artist.name}}</b></p>
                </div></router-link>
            </div>
        </div>
        <br><br><br><br><br><br><br><br><br><br><br><br>
      </div> 
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Home extends Vue {
    loader = true
    error = null

    get weekArtist() {
        return this.$store.getters['artistModule/getWeekArtist']?this.$store.getters['artistModule/getWeekArtist']:[]
    }
    get topArtist () {
        return this.weekArtist[0]?this.weekArtist[0]:{}
    }
    get weekAlbum() {
        return this.$store.getters['albumModule/getWeekAlbum']?this.$store.getters['albumModule/getWeekAlbum']:[]
    }
    get topAlbum () {
        return this.weekAlbum[0]?this.weekAlbum[0]:{}
    }
    get topTracks() {
            return this.$store.getters['trackModule/getTopTracks']?this.$store.getters['trackModule/getTopTracks']:[]
    }
    get audio () {
        return this.$store.getters['getAudio']
    }

    playAlbum(id: any) {
        this.$store.dispatch('trackModule/fetchAlbumTracks', id).then((response: any) => {
            response[0].tracks.map((track: any) => {
                track['artist_name'] = response[0].artist_name
                track.image = response[0].image
            })
            this.$store.commit('setTracksQueue', response[0].tracks)
            this.$store.commit('playTrack', response[0].tracks[0])
            this.audio.src = response[0].tracks[0].audio
            this.audio.play()
        })
    }

    playSong (track: any, queue: any) {
        this.audio.playbackRate = 1
        this.audio.src = track.audio
        this.$store.commit('setTracksQueue', queue)
        this.$store.commit('playTrack', track)
        this.audio.play();
    }

    created () {
        window.scrollTo(0,0);
        this.$store.dispatch('artistModule/fetchArtistOfTheWeek', 8).then(() => {
            this.loader = false
        }).catch((error: any) => {
            this.loader = false
            this.error = error
        })
        this.$store.dispatch('albumModule/fetchAlbumOfTheWeek', 8)
        this.$store.dispatch('trackModule/fetchTopTracks', 8)
    }
}
</script>

<style lang="scss" scoped>
    .tops {
        display: flex;
        flex-wrap: wrap;
        max-width: 100%;
        .top-artist {
            flex: 2 2 21%;
        }
        .top-album {
            flex: 1 1 21%;
        }
        .card {
            margin: 10px;
            height: 300px;
            margin-bottom: 30px;
        }
        .top-tracks {
            flex: 1 1 21%;
        }
    }

    .options {
        display: flex
    }

    .play {
        cursor: pointer;
    }

    p.heads {
        color: var(--text-dark);
        font-size: 18px;
        font-weight: bold;
        font-family: nunito;
    }
    .title {
        color: var(--name-title);
        font-size: 14px;
        font-family: nunito;
    }

    .tracks {
        width: 100%;
        height: 200px;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
        border: 1px solid var(--search-border);
    }

    .top-art {
        width: 100%;
        height: 300px;
        border-radius: 10px;
        background-position: center;
        background-size: cover;
    }
    .top-al {
        width: 100%;
        height: 300px;
        border-radius: 10px;
        background-position: center;
        background-size: cover;
    }

    a{
        text-decoration: none;
        cursor: pointer;
    }

    @media (max-width: 900px) {
        .card {
            min-width: 290px
        }
    }
</style>