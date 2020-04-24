<template>
    <div>
        <loader v-if="loader"/>
        <div v-else class="begin">
            <div class="child one" :style="{ 'background-image': 'url(https://static.radio.net/images/broadcasts/ea/8f/1380/2/c175.png)'}">
                <div style="height: 100%"></div>
            </div>
            <div class="child two">
                <p class="title">Top Songs for the Month</p>
            </div>
        </div><br><br><br>
        
        <div class="second">
          <table v-if="!loader">
              <thead>
                  <tr>
                      <th class="priority-1">
                          <p>#</p>
                      </th>
                      <th class="priority-2" style="width: 45%">
                          <p>Tracks</p>
                      </th>
                      <th style="width: 40px" class="priority-3">
                          <font-awesome-icon class="play" size="2x" icon="play-circle" style="display:none;cursor:pointer;color:var(--text-light);font-size:20px;margin-bottom:15px"/>
                      </th>
                      <th class="priority-4" style="width: 25%">
                          <p>Artist</p>
                      </th>
                      <th class="priority-5">
                          <p>Duration</p>
                      </th>
                      <th class="priority-6">
                          <p>Download</p>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr :class="{ 'playing' : current && current.id == track.id}"  v-for="(track, index) in tracks" :key="index">
                      <td class="priority-1"><p>{{index+1}}</p></td>
                      <td class="priority-2"><p>{{track.name.length>20?(track.name).substring(0,20)+'...':track.name}}</p></td>
                      <td class="priority-3">
                        <font-awesome-icon class="play" @click="playSong(track, tracks)" size="2x" icon="play-circle" style="cursor:pointer;color:var(--main);font-size:20px;margin-bottom:10px"/>
                        <!-- <font-awesome-icon v-if="current.id !== track.id"  v-else class="play" @click="audio.pause()" size="2x" icon="pause-circle" style="cursor:pointer;color:var(--main);font-size:20px;"/> -->
                      </td>
                      <td class="priority-4"><router-link style="color:var(--text-dark)" :to="/artist/+track.artist_id"><p>{{track.artist_name>20?(track.artist_name).substring(0,20)+'...':track.artist_name}}</p></router-link></td>
                      <td class="priority-5"><p>{{convertTime(track.duration)}}</p></td>
                      <td class="priority-6"><a :href="track.audiodownload"><button style="margin-bottom:20px" class="btn-norm"><font-awesome-icon class="download" icon="download"/> Download</button></a></td>
                  </tr>
              </tbody>
          </table>
        <br><br><br><br>
        </div>
      <p class="artist" v-if="!tracks && !loader" style="color var(--text-light);text-align:center;font-size:18px;font-weight:bolder">Sorry no Info</p>
      <!-- <pre>{{tracks}}</pre> -->
    <br><br><br><br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class GenreTracks extends Vue {
    loader = true

    get tracks () {
        return this.$store.getters['trackModule/getTopTracks']? this.$store.getters['trackModule/getTopTracks']: []
    }

    get audio () {
        return this.$store.getters['getAudio']
    }

    get current () {
        return this.$store.getters['getCurrent']
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
        window.scrollTo(0,0);
        this.$store.dispatch('trackModule/fetchTopTracks', 40).then((response: any) => {
           this.loader = false
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
            height: 300px;
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

    .buttons {
        display: flex;
        font-family: nunito;
        .butt {
            background-color: var(--main);
            border: 0px;
            color: white;min-width: 80px;
            padding: 10px;
            margin: 10px;
            cursor: pointer;
        }
        p {
            margin-top: 15px;
        }
        .next {
            border-radius: 0 5px 5px 0;
        }
        .prev {
            border-radius: 5px 0 0 5px;
        }
    }

    .third {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        .card {
            margin: 10px;
            margin-bottom: 30px;
            flex: 0 0 23%;
            .image {
                // width: 300px;
                height: 200px;
                border-radius: 10px !important;
                border-radius: 1px solid var(--search-border);
                background-size: cover;
                background-position: center;
            }
        }
    }

    p.heads {
        color: var(--text-dark);
        font-size: 18px;
        font-weight: bold;
        font-family: nunito;
    }

    .name {
        color: var(--name-title);
        font-size: 14px;
        font-family: nunito;
        margin-top: 14px
    }

    .options {
        display: flex
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
        width: 100%;
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
        cursor: pointer;
    }

    p {
        margin-top: 0;
    }

    @media (max-width: 600px) {
        .priority-4, .priority-5 {
            display: none
        }
    }

    @media (max-width: 576px) {
        .begin {
            flex-flow: column;
            .one {
                display: block;
                width: 300px;
                height: 300px;
            }
        }
        .third {
            flex-flow: column;
        }
    }
</style>