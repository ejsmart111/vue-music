<template>
  <div>
      <div class="tops">
          <div class="card top-artist">
              <p class="heads">Artist of the Week</p>
              <div class="top-art" :style="{ 'background-image': 'linear-gradient(rgba(146, 59, 149, 0.349), rgba(149, 59, 144, 0.349)),url(' + weekArtist.image + ')' }"></div>
              <p class="title">{{weekArtist.name}}</p>
          </div>
          <div class="card top-album">
              <p class="heads">Album of the Week</p>
              <div class="top-al" :style="{ 'background-image': 'linear-gradient(rgba(59, 65, 149, 0.344), rgba(87, 59, 149, 0.344)), url(' + weekAlbum.image + ')' }"></div>
              <p class="title">{{weekAlbum.artist_name}}- {{weekAlbum.name}}</p>
          </div>
      </div>
      <br><br><br><br>
      <p class="heads">Top Tracks</p>
      <div class="tops">
          <div class="card top-tracks" v-for="(track, index) in sort(topTracks)" :key="index">
              <div class="tracks" :style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.349), rgba(0, 0, 0, 0.349)),url(' + track.image + ')' }">
                  <font-awesome-icon @click="playSong(track, topTracks)" size="2x" icon="play-circle" style="color: var(--main);margin-top:250px; margin-left:10px;"/>
              </div>
              <div class="options">
                <p style="flex:2 2 0" class="title">{{track.artist_name}}- {{track.name}}</p>
                <a :href="track.audiodownload" class="title" style="flex: 0 1 100px;margin-top:13px; color: var(--main); text-align: right" >&darr; Download</a>
              </div>
          </div>
      </div>
      <br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Home extends Vue {
    get weekArtist() {
        return this.$store.getters['artistModule/getWeekArtist'][0]
    }
    get weekAlbum() {
        return this.$store.getters['albumModule/getWeekAlbum'][0]
    }
    get topTracks() {
        return this.$store.getters['trackModule/getTopTracks']
    }
    get audio () {
        return this.$store.getters['getAudio']
    }

    sort(arr: any) {
        return arr.sort((a: any, b: any) => (a.position > b.position) ? 1 : -1)
    }

    playSong (track: any, queue: any) {
        this.audio.playbackRate = 1
        this.audio.src = track.audio
        this.$store.commit('setTracksQueue', queue)
        this.$store.commit('playTrack', track)
        this.audio.play();
    }

    created () {
        this.$store.dispatch('artistModule/fetchArtistOfTheWeek')
        this.$store.dispatch('albumModule/fetchAlbumOfTheWeek')
        this.$store.dispatch('trackModule/fetchTopTracks')
    }
}
</script>

<style lang="scss" scoped>
    .tops {
        display: flex;
        max-width: 96%;
        .top-artist {
            flex: 2 2 0;
        }
        .top-album {
            flex: 1 1 0;
        }
        .card {
            margin: 10px;
            height: 300px;
            margin-bottom: 80px;
        }
        .top-tracks {
            flex: 1 1 0;
        }
    }

    .options {
        display: flex
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
        height: 300px;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
        border: 1px solid var(--search-border);
    }

    .top-art {
        width: 100%;
        height: 300px;
        border-radius: 10px;
        // background: linear-gradient(rgba(146, 59, 149, 0.349), rgba(149, 59, 144, 0.349)), url('https://i.pinimg.com/564x/1e/c0/0b/1ec00ba0b6604c4a80c93ae5f6487c42.jpg');
        background-position: center;
        background-size: cover;
    }
    .top-al {
        width: 100%;
        height: 300px;
        border-radius: 10px;
        // background: linear-gradient(rgba(59, 65, 149, 0.344), rgba(87, 59, 149, 0.344)), url('https://i.pinimg.com/564x/b2/c3/c5/b2c3c50fc67f3907bde21f0904166ff6.jpg');
        background-position: center;
        background-size: cover;
    }

    a{
        text-decoration: none;
    }

    @media (max-width: 576px) {
        .tops {
            flex-flow: column;
        }
    }
    @media (max-width: 800px) and (min-width: 576px) {
        .tops {
            flex-flow: row;
            .card {
                flex: 2 2 0
            }
        }
    }
</style>