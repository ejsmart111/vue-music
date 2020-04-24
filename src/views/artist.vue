<template>
    <div>
        <pre v-if="error" style="color: var(--text-dark)">{{error}}</pre>
        <loader v-if="loader"/>
        <div v-if="!loader && !error" class="begin">
            <div class="child one" :style="{ 'background-image': 'url(' + artistInfo.image + ')'}">
                <div style="height: 100%"></div>
            </div>
            <div class="child two">
                <p class="title">{{artistInfo.name}}</p>
                <p class="artist"><span style="color: var(--main)">Website</span> : <a style="color: var(--text-dark)" target="blank" :href="artistInfo.website">{{artistInfo.website}}</a></p>
                <p class="artist"><span style="color: var(--main)">Join Date</span> : {{artistInfo.joindate}}</p><br>
            </div>
        </div><br><br><br>

        <div class="tab" v-if="!loader">
            <div @click="view = 'tracks'" :class="{ 'active' : view == 'tracks'}" class="tab-item">
                <p>Tracks</p>
            </div>
            <div @click="view = 'albums'" :class="{ 'active' : view == 'albums'}" class="tab-item">
                <p>Albums</p>
            </div>
        </div>
        <br>
        
        <div class="second" v-if="view === 'tracks'">
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
                          <p>Album</p>
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
                  <tr :class="{ 'playing' :current && current.id == track.id}" v-for="(track, index) in songs" :key="index">
                      <td class="priority-1"><p>{{index+1}}</p></td>
                      <td class="priority-2"><p>{{track.name.length>20?(track.name).substring(0,20)+'...':track.name}}</p></td>
                      <td class="priority-3">
                        <font-awesome-icon class="play" @click="playSong(track, tracks.tracks)" size="2x" icon="play-circle" style="cursor:pointer;color:var(--main);font-size:20px;margin-bottom:10px"/>
                        <!-- <font-awesome-icon v-if="current.id !== track.id"  v-else class="play" @click="audio.pause()" size="2x" icon="pause-circle" style="cursor:pointer;color:var(--main);font-size:20px;"/> -->
                      </td>
                      <td class="priority-4"><router-link style="color:var(--text-dark)" :to="'/album/'+track.album_id"><p>{{track.album_name.length>20?(track.album_name).substring(0,20)+'...':track.album_name}}</p></router-link></td>
                      <td class="priority-5"><p>{{convertTime(track.duration)}}</p></td>
                      <td class="priority-6"><a :href="track.audiodownload"><button style="margin-bottom:20px" class="btn-norm"><font-awesome-icon class="download" icon="download"/> Download</button></a></td>
                  </tr>
              </tbody>
          </table>
        <br><br><br><br>
      </div>
      <div v-if="view === 'albums'" class="third">
          <div class="card" v-for="(album, index) in albums[0].albums" :key="index">
              <router-link :to="'/album/'+album.id"><div class="image" :style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.349), rgba(0, 0, 0, 0.349)),url(' + album.image + ')' }">
                  <font-awesome-icon @click="playAlbum(album.id)" class="play" size="2x" icon="play-circle" style="color: var(--main);margin-top:150px; margin-left:10px;"/>
              </div></router-link><br>
                <router-link :to="'/album/'+album.id" style="flex:2 2 0;" class="name"><b>{{album.name}} ({{album.releasedate.substring(0,4)}})</b></router-link>
          </div>          
      </div>
      <p class="artist" v-if="!tracks.tracks && !loader" style="color var(--text-light);text-align:center;font-size:18px;font-weight:bolder">Sorry no Info</p>
      <!-- <pre>{{tracks}}</pre> -->
    <br><br><br><br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Artist extends Vue {
    loader = true
    view = 'tracks'
    error = null

    get artistInfo () {
        return this.$store.getters['artistModule/getArtistInfo'][0]
    }

    get tracks () {
        return this.$store.getters['trackModule/getTracks'][0]? this.$store.getters['trackModule/getTracks'][0]: []
    }
    get albums () {
        return this.$store.getters['albumModule/getAlbums']?this.$store.getters['albumModule/getAlbums']:[]     
    }
    get songs () {
        return this.tracks.tracks?this.tracks.tracks:[]
    }

    get audio () {
        return this.$store.getters['getAudio']
    }

    get current () {
        return this.$store.getters['getCurrent']
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
        this.$store.dispatch('artistModule/fetchArtistInfo', this.$route.params.id).then((response: any) => {
            this.loader = false
        }).catch((error: any) => {
            this.loader = false
            this.error = error
        })
        this.$store.dispatch('trackModule/fetchArtistTracks', this.$route.params.id).then((response: any) => {
            if (response.length > 0) {
                response[0].tracks.map((track: any) => {
                    track['artist_name'] = response[0].name
                })
            }
        })
        this.$store.dispatch('albumModule/fetchArtistAlbums', this.$route.params.id)
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
            &:hover {
                background-color: var(--table-hover);
                .play {
                    display: block;
                }
            }
            .play {
                display: none;
            }
        }
    }

    .playing {
        background-color: var(--table-hover);
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