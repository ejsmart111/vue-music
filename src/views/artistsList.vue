<template>
    <div>
        <div class="tab">
            <div :class="{ 'active' : view == 'total'}" @click="view = 'total'" class="tab-item">
                <p>Top Artists</p>
            </div>
            <div :class="{ 'active' : view == 'month'}" @click="view = 'month'" class="tab-item">
                <p>This Month's Top</p>
            </div>
        </div>
        <br>
        <pre v-if="error" style="color: var(--text-dark)">{{error}}</pre>
        <loader v-if="loader"/>
        <div v-if="!loader && !error">
            <div v-if="view === 'total'">
                <div class="tops">
                    <div class="card top-tracks" v-for="(artist, index) in artistTotal" :key="index+'s'">
                        <router-link :to="'/artist/'+artist.id"><div class="tracks" :style="{ 'background-image': 'url(' + artist.image + ')' }">
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
            </div>
            <div v-if="view === 'month'">
                <div class="tops">
                    <div class="card top-tracks" v-for="(artist, index) in artistMonth" :key="index+'s'">
                        <router-link :to="'/artist/'+artist.id"><div class="tracks" :style="{ 'background-image': 'url(' + artist.image + ')' }">
                        </div>
                        <div class="options">
                            <p style="flex:2 2 0" class="title"><b>{{artist.name}}</b></p>
                        </div></router-link>
                    </div>
                </div>
                <div v-if="!loader" class="buttons">
                    <button class="butt prev" v-if="pageOffsetAltMonth != 0" @click="pageBackMonth">Previous</button>
                    <p style="color: var(--text-dark)">Page {{clicksMonth}}</p>
                    <button class="butt next" @click="pageNextMonth">Next</button>
                </div>
            </div>
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
    pageOffsetMonth = 0
    pageOffsetAltMonth = 0
    clicksMonth = 1
    view = 'total'
    error = null

    get artistTotal () {
        return this.$store.getters['artistModule/getArtistsTotal']
    }

    get artistMonth () {
        return this.$store.getters['artistModule/getArtistsMonth']
    }

    pageNext () {
        this.pageOffset += 16
        this.loader = true
        this.$store.dispatch('artistModule/fetchPagesForTopArtists', this.pageOffset).then(()=> {
            this.loader = false
            window.scrollTo(0,0);
            this.clicks ++;
            this.pageOffsetAlt += 16
        })
    }
    pageBack () {
        this.loader = true
        this.pageOffset -= 16
        this.$store.dispatch('artistModule/fetchPagesForTopArtists', this.pageOffset).then(() => {
            this.loader = false
            window.scrollTo(0,0);
            this.clicks --;
            this.pageOffsetAlt -= 16
        })
    }

    pageNextMonth () {
        this.loader = true
        this.pageOffsetMonth += 16
        this.$store.dispatch('artistModule/fetchPagesForTopArtistsMonth', this.pageOffsetMonth).then(()=> {
            this.loader = false
            window.scrollTo(0,0);
            this.clicksMonth ++;
            this.pageOffsetAltMonth += 16
        })
    }
    pageBackMonth () {
        this.loader = true
        this.pageOffsetMonth -= 16
        this.$store.dispatch('artistModule/fetchPagesForTopArtistsMonth', this.pageOffsetMonth).then(() => {
            this.loader = false
            window.scrollTo(0,0);
            this.clicksMonth --;
            this.pageOffsetAltMonth -= 16
        })
    }

    mounted() {
        window.scrollTo(0,0);
        this.$store.dispatch('artistModule/fetchTopArtists').then(() => {
            this.loader = false
        }).catch((error: any) => {
            this.loader = false
            this.error = error
        })
        this.$store.dispatch('artistModule/fetchTopArtistsMonth')
    }
}
</script>

<style lang="scss" scoped>
    .tops {
        display: flex;
        flex-wrap: wrap;
        max-width: 100%;
        .card {
            flex: 0 0 21%;
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