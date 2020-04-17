<template>
    <div>
        <pre v-if="error" style="color: var(--text-dark)">{{error}}</pre>
        <loader v-if="loader"/>
        <div v-if="!loader && !error">
            <br><br><br>
            <div class="tops">
                <div class="card top-tracks" v-for="(album, index) in playlist" :key="index+'s'">
                    <router-link :to="'/playlist/tracks/'+album.id"><div class="tracks" :style="{ 'background-image': 'url(' + backgroundImage() + ')' }">
                    </div></router-link>
                    <div style="display:flex">
                        <p style="flex:2 2 0" class="title"><b>{{album.name}}</b></p>
                        <a :href="album.zip" class="title" style="flex: 0 1 100px;margin-top:13px; color: var(--main); text-align: right" >&darr; Download</a>
                    </div>
                </div>
            </div>
            <div v-if="!loader" class="buttons">
                <button class="butt prev" v-if="pageOffsetAlt != 0" @click="pageBack">Previous</button>
                <p style="color: var(--text-dark)">Page {{clicks}}</p>
                <button class="butt next" @click="pageNext">Next</button>
            </div>
        </div>
        <br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Playlist extends Vue {
    loader = true
    pageOffset = 0
    pageOffsetAlt = 0
    clicks = 1
    view = 'total'
    error = null
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

    get playlist () {
        return this.$store.getters['playlistModule/getTopPlaylists']
    }

    backgroundImage() {
        return this.pictures[Math.floor(Math.random()*this.pictures.length)]
    }

    pageNext () {
        this.pageOffset += 16
        this.loader = true
        this.$store.dispatch('playlistModule/fetchTopPlaylistsPaged', this.pageOffset).then(()=> {
            this.loader = false
            window.scrollTo(0,0);
            this.clicks ++;
            this.pageOffsetAlt += 16
        })
    }
    pageBack () {
        this.loader = true
        this.pageOffset -= 16
        this.$store.dispatch('playlistModule/fetchTopPlaylistsPaged', this.pageOffset).then(() => {
            this.loader = false
            window.scrollTo(0,0);
            this.clicks --;
            this.pageOffsetAlt -= 16
        })
    }

    mounted() {
        window.scrollTo(0,0);
        this.$store.dispatch('playlistModule/fetchTopPlaylists').then((response: any) => {
            this.loader = false
        }).catch((error: any) => {
            this.loader = false
            this.error = error
        })
    }
}
</script>

<style lang="scss" scoped>
    .tops {
        display: flex;
        flex-wrap: wrap;
        max-width: 100%;
        .card {
            flex: 2 0 21%;
            margin: 10px;
            margin-top: 0;
            height: 300px;
            margin-bottom: 30px;
        }
    }

    @media (max-width: 576px) {
        .tops {
            flex-direction: column;
        }
    }
    @media (max-width: 900px) {
        .card {
            min-width: 290px
        }
    }

    .tracks {
        width: 100%;
        height: 200px;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
        border: 1px solid var(--search-border);
    }

    .title {
        color: var(--name-title);
        font-size: 14px;
        font-family: nunito;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }
</style>