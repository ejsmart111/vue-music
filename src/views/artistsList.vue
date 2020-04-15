<template>
    <div>
        <div class="tab">
            <div class="tab-item active">
                <p>Top Artists</p>
            </div>
            <div class="tab-item">
                <p>Top Artists for the Month</p>
            </div>
        </div>
        <br>
        <loader v-if="loader"/>
        <div v-else class="tops">
            <div class="card top-tracks" v-for="(artist, index) in artistTotal" :key="index+'s'">
                <router-link :to="'/artist/'+artist.id"><div class="tracks" :style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.349), rgba(0, 0, 0, 0.349)),url(' + artist.image + ')' }">
                </div>
                <div class="options">
                    <p style="flex:2 2 0" class="title"><b>{{artist.name}}</b></p>
                </div></router-link>
            </div>
        </div>
        <div v-if="!loader" class="buttons">
            <button class="butt prev" v-if="pageOffsetAlt != 0" @click="pageBack">Previous</button>
            <p style="color: var(--text-dark)">Page {{clicks}}</p>
            <button class="butt next" @click="pageNext">Next</button>
        </div>
        <br><br><br><br><br><br><br>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class ArtistsList extends Vue {
    loader = true
    pageOffset = 0
    pageOffsetAlt = 0
    clicks = 1

    get artistTotal () {
        return this.$store.getters['artistModule/getArtistsTotal']
    }

    pageNext () {
        this.pageOffset += 16
        this.$store.dispatch('artistModule/fetchPagesForTopArtists', this.pageOffset).then(()=> {
            window.scrollTo(0,0);
            this.clicks ++;
            this.pageOffsetAlt += 16
        })
    }
    pageBack () {
        this.pageOffset -= 16
        this.$store.dispatch('artistModule/fetchPagesForTopArtists', this.pageOffset).then(() => {
            window.scrollTo(0,0);
            this.clicks --;
            this.pageOffsetAlt -= 16
        })
    }

    mounted() {
        this.$store.dispatch('artistModule/fetchTopArtists').then((response: any) => {
            this.loader = false
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

    .tracks {
        width: 100%;
        height: 200px;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
        border: 1px solid var(--search-border);
    }

    .buttons {
        display: flex;
        font-family: nunito;
        .butt {
            background-color: var(--main);
            border: 0px;
            color: white;min-width: 80px;
            padding: 0px;
            margin: 10px;
            cursor: pointer;
        }
        .next {
            border-radius: 0 5px 5px 0;
        }
        .prev {
            border-radius: 5px 0 0 5px;
        }
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