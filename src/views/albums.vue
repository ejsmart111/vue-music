<template>
  <div>
      <loader v-if="loader"/>
      <div v-else class="begin">
          <div class="child one" style="display: flex" :style="{ 'background-image': 'url(' + album[0].image + ')'}">
              <font-awesome-icon class="play" @click="playAlbum()" size="2x" icon="play-circle" style="cursor:pointer;color: var(--main);margin-top:250px; margin-left:10px;"/>
              <!-- <font-awesome-icon class="play" @click="shuffleAlbum()" size="2x" icon="random" style="cursor:pointer;color: var(--main);margin-top:253px;font-size:25px;margin-left:10px;"/> -->
          </div>
          <div class="child two">
              <p class="title">{{album[0].name}}</p>
              <p class="artist"><span style="color: var(--main)">Artist</span> : <router-link :to="'/artist/'+album[0].artist_id">{{album[0].artist_name}}</router-link></p>
              <p class="artist"><span style="color: var(--main)">Date</span> : {{album[0].releasedate}}</p><br>
              <a style="padding: 5px 20px 8px 20px" :href="album[0].zip" class="btn-norm"><font-awesome-icon icon="download"/> Download Album</a>
          </div>
      </div><br><br>
      <div class="second">
          <table v-if="!loader">
              <thead>
                  <tr>
                      <th class="priority-1">
                          <p>#</p>
                      </th>
                      <th class="priority-2" style="width: 70%">
                          <p>Tracks</p>
                      </th>
                      <th style="width: 40px" class="priority-3">
                          <font-awesome-icon class="play" size="2x" icon="play-circle" style="display:none;cursor:pointer;color:var(--text-light);font-size:20px;margin-bottom:15px"/>
                      </th>
                      <th class="priority-4">
                          <p>Duration</p>
                      </th>
                      <th class="priority-5">
                          <p>Download</p>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr :class="{ 'playing' : current && current.id == track.id}"  v-for="(track, index) in album[0].tracks" :key="index">
                      <td class="priority-1"><p>{{track.position}}</p></td>
                      <td class="priority-2"><p>{{track.name.length>20?(track.name).substring(0,20)+'...':track.name}}</p></td>
                      <td class="priority-3">
                        <font-awesome-icon class="play" @click="playSong(track, album[0].tracks)" size="2x" icon="play-circle" style="cursor:pointer;color:var(--main);font-size:20px;margin-bottom:10px"/>
                        <!-- <font-awesome-icon v-if="current.id !== track.id"  v-else class="play" @click="audio.pause()" size="2x" icon="pause-circle" style="cursor:pointer;color:var(--main);font-size:20px;"/> -->
                      </td>
                      <td class="priority-4"><p>{{convertTime(track.duration)}}</p></td>
                      <td class="priority-5"><a :href="track.audiodownload"><button style="margin-bottom:20px" class="btn-norm"><font-awesome-icon class="download" icon="download"/> Download</button></a></td>
                  </tr>
              </tbody>
          </table>
          <p class="artist" v-if="!album[0].tracks && !loader" style="color var(--text-light);text-align:center;font-size:18px;font-weight:bolder">Sorry no Info</p>
        <br><br><br><br><br><br><br><br><br><br><br><br>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Album extends Vue {
    loader = true

    get album () {
        return this.$store.getters['trackModule/getTracks'] ? this.$store.getters['trackModule/getTracks']: []
    }

    get audio () {
        return this.$store.getters['getAudio']
    }

    get current() {
        return this.$store.getters['getCurrent']
    }

    playSong (track: any, queue: any) {
        this.audio.playbackRate = 1
        this.audio.src = track.audio
        this.$store.commit('setTracksQueue', queue)
        this.$store.commit('playTrack', track)
        this.audio.play();
    }

    playAlbum() {
        this.$store.commit('setTracksQueue', this.album[0].tracks)
        this.$store.commit('playTrack', this.album[0].tracks[0])
        this.audio.src = this.album[0].tracks[0].audio
        this.audio.play()
    }

    convertTime (secs: any) {
        const min = Math.floor(secs / 60);
        const sec = secs % 60;
        const minute = (min < 10) ? "0" + min : min;
        const seconds = (sec < 10) ? "0" + sec : sec;
        return (minute + ':' + seconds);
    }

    mounted () {
        window.scrollTo(0,0);
        this.$store.dispatch('trackModule/fetchAlbumTracks', this.$route.params.id).then((response: any) => {
            this.loader = false
            response[0].tracks.map((track: any) => {
                track['artist_name'] = response[0].artist_name
                track.image = response[0].image
            })
        })
    }
}
</script>

<style lang="scss" scoped>
    .begin {
        display: flex;
        width: 100%;
        .child {
            height: 300px;
            margin: 10px;
        }
        .one {
            width: 100%;
            border-radius: 5px;
            border: 2px solid var(--text-dark);
            background-size: cover;
            background-position: center;
            flex: 1 1 0;
        }
        .two {
            width: 100%;
            flex: 2 2 0;
        }
    }

    .play-song {
        display: none;
    }

    table {
        width: 100%;
        font-family: nunito;
        border-top: 1px solid var(--table-border);
        th {
            height: 50px;
            color: var(--text-light);
            border-bottom: 1px solid var(--table-border);
            padding: 0px;
            padding-top: 10px;
        }
        td {
            border-bottom: 1px solid var(--table-border);
            padding: 5px;
            padding-top: 15px;
        }
        tr {
            text-align: left;
            padding: 20px;
            color: var(--text-dark);
        }
    }

    .title {
        font-size: 25px;
        color: var(--text-dark);
        font-family: nunito;
        font-weight: bolder;
    }

    @media (max-width: 576px) {
        .begin {
            flex-flow: column;
            .one {
                max-width: 92%;
            }
        }
    }
    @media (max-width: 600px) {
        .priority-4 {
            display: none;
        }
    }
    @media (max-width:800px) {
        .download {
            display: none
        }
    }

    p {
        margin-top: 0;
    }

    .artist {
        color: var(--text-dark);
        font-family: nunito;
        font-size: 16px;
    }


    a{
        text-decoration: none;
        cursor: pointer;
    }
</style>