<template>
    <div>
        <loader v-if="loader"/>
        <div v-else class="begin">
            <div class="child one" :style="{ 'background-image': 'url(' + backgroundImage() + ')'}">
                <div style="height: 100%"></div>
            </div>
            <div class="child two">
                <p class="title">{{($route.params.link).toUpperCase()}}</p>
            </div>
        </div><br><br><br>
        
        <div class="second">
          <table v-if="!loader">
              <thead>
                  <tr>
                      <th>
                          <p>#</p>
                      </th>
                      <th style="width: 45%">
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
                      <th>
                          <p>Download</p>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr :class="{ 'playing' : current && current.id == track.id}"  v-for="(track, index) in tracks" :key="index">
                      <td><p>{{index+1}}</p></td>
                      <td><p>{{track.name.length>20?(track.name).substring(0,20)+'...':track.name}}</p></td>
                      <td>
                        <font-awesome-icon class="play" @click="playSong(track, tracks)" size="2x" icon="play-circle" style="cursor:pointer;color:var(--main);font-size:20px;margin-bottom:10px"/>
                        <!-- <font-awesome-icon v-if="current.id !== track.id"  v-else class="play" @click="audio.pause()" size="2x" icon="pause-circle" style="cursor:pointer;color:var(--main);font-size:20px;"/> -->
                      </td>
                      <td class="priority-4"><router-link style="color:var(--text-dark)" :to="/artist/+track.artist_id"><p>{{track.artist_name.length>20?(track.artist_name).substring(0,20)+'...':track.artist_name}}</p></router-link></td>
                      <td class="priority-5"><p>{{convertTime(track.duration)}}</p></td>
                      <td><a :href="track.audiodownload"><button style="margin-bottom:20px" class="btn-norm"><font-awesome-icon class="download" icon="download"/> Download</button></a></td>
                  </tr>
              </tbody>
          </table>
        <br><br><br><br>
        </div>
        <div v-if="!loader && tracks" class="buttons">
            <button class="butt prev" v-if="pageOffsetAlt != 0" @click="pageBack">Previous</button>
            <p style="color: var(--text-dark)">Page {{clicks}}</p>
            <button class="butt next" @click="pageNext">Next</button>
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
    pictures = [
        'https://i.pinimg.com/564x/54/2c/7f/542c7feaddcbf4abe9a44146303b1cad.jpg',
        'https://i.pinimg.com/564x/8f/7f/53/8f7f5348d3ef93db0186c8f70f313382.jpg',
        'https://i.pinimg.com/564x/02/27/d6/0227d60b428325a9965f992aef89e96e.jpg',
        'https://i.pinimg.com/564x/f6/6e/ef/f66eef74cad510e4a5c3189987d632ac.jpg',
        'https://i.pinimg.com/564x/49/09/bd/4909bd32abbd4a9883102a42ef204bcc.jpg',
        'https://i.pinimg.com/564x/55/e9/4d/55e94d02f739e1cccd3c0e657e6741ea.jpg',
        'https://i.pinimg.com/564x/19/41/d5/1941d5cbcb64e4e8009b323182fccda3.jpg',
        'https://i.pinimg.com/564x/2a/6f/11/2a6f11188cf7c5d508440d62337975cf.jpg',
        'https://i.pinimg.com/564x/8f/77/ee/8f77ee365975dcd81c42686c5cc39d36.jpg',
        'https://i.pinimg.com/564x/f1/ea/52/f1ea5220fce6029be4fbebb8d15e7446.jpg',
        'https://i.pinimg.com/564x/4a/ea/dc/4aeadc839682e100b33dd61daea9daf2.jpg',
        'https://i.pinimg.com/564x/e8/c9/96/e8c996faca963422e844a4b6ff5ef1be.jpg',
        'https://i.pinimg.com/564x/2e/f4/8c/2ef48c968657f859a40f3973da74f071.jpg',
        'https://i.pinimg.com/564x/46/af/7d/46af7db4d3790c51c4d76b270a070406.jpg',
        'https://i.pinimg.com/564x/14/e5/dd/14e5dda26692163dfb47cff4c2f9a8cb.jpg'
    ]
    pageOffset = 0
    pageOffsetAlt = 0
    clicks = 1

    pageNext () {
        this.pageOffset += 16
        this.loader = true
        const obj = {
            genre: this.$route.params.link,
            offset: this.pageOffset
        }
        this.$store.dispatch('trackModule/fetchGenreTracks', obj).then(()=> {
            this.loader = false
            window.scrollTo(0,0);
            this.clicks ++;
            this.pageOffsetAlt += 16
        })
    }
    pageBack () {
        this.loader = true
        this.pageOffset -= 16
        const obj = {
            genre: this.$route.params.link,
            offset: this.pageOffset
        }
        this.$store.dispatch('trackModule/fetchGenreTracks', obj).then(()=> {
            this.loader = false
            window.scrollTo(0,0);
            this.clicks --;
            this.pageOffsetAlt -= 16
        })
    }

    backgroundImage() {
        return this.pictures[Math.floor(Math.random()*this.pictures.length)]
    }

    get tracks () {
        return this.$store.getters['trackModule/getTracks']? this.$store.getters['trackModule/getTracks']: []
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
        const obj = {
            genre: this.$route.params.link,
            offset: 0
        }
        this.$store.dispatch('trackModule/fetchGenreTracks', obj).then((response: any) => {
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

    @media (max-width: 600px) {
        .priority-4, .priority-5 {
            display: none;
        }
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