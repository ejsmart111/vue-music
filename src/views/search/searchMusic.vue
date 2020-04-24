<template>
    <div>
        <div class="second">
          <table v-if="songs.length > 0">
              <thead>
                  <tr>
                      <th class="priority-1">
                          <p>#</p>
                      </th>
                      <th class="priority-2" style="width: 45%">
                          <p>Tracks</p>
                      </th>
                      <th class="priority-3">
                          <font-awesome-icon class="play" size="2x" icon="play-circle" style="cursor:pointer;color:var(--text-light);font-size:20px;margin-bottom:0px"/>
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
                  <tr :class="{ 'playing' :current && current.id == track.id}"  v-for="(track, index) in songs" :key="index">
                      <td class="priority-1"><p>{{index+1}}</p></td>
                      <td class="priority-2"><p>{{track.name.length > 20? (track.name).substring(0,20)+'...': track.name }}</p></td>
                      <td class="priority-3">
                        <font-awesome-icon class="play" @click="playSong(track, songs)" size="2x" icon="play-circle" style="cursor:pointer;color:var(--main);font-size:20px;margin-bottom:0px"/>
                        <!-- <font-awesome-icon v-if="current.id !== track.id"  v-else class="play" @click="audio.pause()" size="2x" icon="pause-circle" style="cursor:pointer;color:var(--main);font-size:20px;"/> -->
                      </td>
                      <td class="priority-4"><router-link style="color:var(--text-dark)" :to="'/artist/'+track.artist_id"><p>{{track.artist_name.length > 20 ? (track.artist_name).substring(0,20)+'...': track.artist_name }}</p></router-link></td>
                      <td class="priority-5"><p>{{convertTime(track.duration)}}</p></td>
                      <td class="priority-6"><a :href="track.audiodownload"><button style="margin-bottom:20px" class="btn-norm"><font-awesome-icon class="download" icon="download"/> Download</button></a></td>
                  </tr>
              </tbody>
          </table>
            <p class="title" v-if="songs.length <= 0">No Tracks match your query</p><br><br>
          <button @click="$emit('clickLink')" style="margin-bottom:20px" v-if="more" class="btn-norm">More</button>
        <br><br><br><br>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class MusicSearch extends Vue {
    @Prop()
    songs !: any
    @Prop({default: false})
    more !: boolean

    get audio() {
        return this.$store.getters['getAudio']
    }

    get current() {
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
        this.audio.src = track.audio
        this.$store.commit('setTracksQueue', queue)
        this.$store.commit('playTrack', track)
        this.audio.play();
    }
}
</script>

<style lang="scss" scoped>
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

    @media (max-width: 600px) {
        .priority-4, .priority-5 {
            display: none;
        }
    }

    .title {
        color: var(--name-title);
        font-size: 14px;
        font-family: nunito;
    }

    a {
        text-decoration: none;
    }
</style>