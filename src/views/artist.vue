<template>
    <div>
        <loader v-if="loader"/>
        <div v-else class="begin">
            <div class="child one" style="display: flex" :style="{ 'background-image': 'url(' + artistInfo.image + ')'}">
            </div>
            <div class="child two">
                <p class="title">{{artistInfo.name}}</p>
                <p class="artist"><span style="color: var(--main)">Website</span> : <router-link style="color: var(--text-dark)" :to="artistInfo.website">{{artistInfo.website}}</router-link></p>
                <p class="artist"><span style="color: var(--main)">Join Date</span> : {{artistInfo.joindate}}</p><br>
            </div>
        </div><br>

        <div class="tab">
            <div class="tab-item active">
                <p>Tracks</p>
            </div>
            <div class="tab-item">
                <p>Albums</p>
            </div>
        </div>

        <div class="second">
          <table>
              <thead>
                  <tr>
                      <th>
                          <p>#</p>
                      </th>
                      <th style="width: 70%">
                          <p>Tracks</p>
                      </th>
                      <th>
                          <font-awesome-icon class="play" size="2x" icon="play-circle" style="cursor:pointer;color:var(--text-light);font-size:20px;margin-bottom:15px"/>
                      </th>
                      <th>
                          <p>Duration</p>
                      </th>
                      <th>
                          <p>Download</p>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(track, index) in songs" :key="index">
                      <td><p>{{index+1}}</p></td>
                      <td><p>{{track.name}}</p></td>
                      <td>
                        <font-awesome-icon class="play" @click="playSong(track, tracks.tracks)" size="2x" icon="play-circle" style="cursor:pointer;color:var(--main);font-size:20px;margin-bottom:10px"/>
                        <!-- <font-awesome-icon v-if="current.id !== track.id"  v-else class="play" @click="audio.pause()" size="2x" icon="pause-circle" style="cursor:pointer;color:var(--main);font-size:20px;"/> -->
                      </td>
                      <td><p>{{convertTime(track.duration)}}</p></td>
                      <td><a :href="track.audiodownload"><button style="margin-bottom:20px" class="btn-norm"><font-awesome-icon class="download" icon="download"/> Download</button></a></td>
                  </tr>
              </tbody>
          </table>
        <br><br><br><br><br><br><br><br><br><br><br><br>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Artist extends Vue {
    loader = true

    get artistInfo () {
        return this.$store.getters['artistModule/getArtistInfo'][0]
    }

    get tracks () {
        return this.$store.getters['trackModule/getTracks'][0]? this.$store.getters['trackModule/getTracks'][0]: []
    }
    get songs () {
        return this.tracks.tracks?this.tracks.tracks:[]
    }

    get audio () {
        return this.$store.getters['getAudio']
    }

    convertTime (secs: any) {
        const min = Math.floor(secs / 60);
        const sec = secs % 60;
        const minute = (min < 10) ? "0" + min : min;
        const seconds = (sec < 10) ? "0" + sec : sec;
        return (minute + ':' + seconds);
    }

    playSong (track: any, queue: any) {
        this.audio.playbackRate = 1
        this.audio.src = track.audio
        this.$store.commit('setTracksQueue', queue)
        this.$store.commit('playTrack', track)
        this.audio.play();
    }

    mounted () {
        this.$store.dispatch('artistModule/fetchArtistInfo', this.$route.params.id).then((response: any) => {
            this.loader = false
        })
        this.$store.dispatch('trackModule/fetchArtistTracks', this.$route.params.id).then((response: any) => {
            response[0].tracks.map((track: any) => {
                track['artist_name'] = response[0].name
            })
        })
    }
}
</script>

<style lang="scss" scoped>
    .begin {
        display: flex;
        width: 96%;
        flex-wrap: wrap;
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

    .tab {
        display: flex;
        .tab-item {
            flex: 0 0 0px;
            font-family: nunito;
            color: var(--text-dark);
            margin: 40px;
            margin-left: 0px;
            text-align: center;
            min-width: 200px;
            font-weight: bold;
        }
        .active {
            border-bottom: 2px solid var(--main);
        }
    }

    .title {
        font-size: 25px;
        color: var(--text-dark);
        font-family: nunito;
        font-weight: bolder;
    }

    .artist {
        color: var(--text-dark);
        font-family: nunito;
        font-size: 16px;
    }

    table {
        width: 96%;
        font-family: nunito;
        // border-top: 1px solid var(--table-border);
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
    
    a {
        text-decoration: none;
    }

    p {
        margin-top: 0;
    }

    @media (max-width: 576px) {
        .begin {
            flex-flow: column;
            .one {
                max-width: 92%;
                height: 300px;
            }
        }
    }
</style>