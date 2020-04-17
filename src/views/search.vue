<template>
    <div>
        <loader v-if="loader"/>
        <div v-if="!loader" class="tab">
            <div :class="{ 'active' : tabView == 'all'}" @click="tabView = 'all'" class="tab-item">
                <p>All</p>
            </div>
            <div :class="{ 'active' : tabView == 'tracks'}" @click="tabView = 'tracks'" class="tab-item">
                <p>Tracks</p>
            </div>
            <div :class="{ 'active' : tabView == 'artists'}" @click="tabView = 'artists'" class="tab-item">
                <p>Artists</p>
            </div>
            <div :class="{ 'active' : tabView == 'albums'}" @click="tabView = 'albums'" class="tab-item">
                <p>Albums</p>
            </div>
        </div>

        <div v-if="tabView=='all' && !loader">
            <component @clickLink="tabView = 'tracks'" :songs="slicedStuffs(tracks,5)" :more="tracks.length > 0" :is="'music'"/>
            <p class="heads">Artists</p>
            <component @clickLink="tabView = 'artists'" :artists="slicedStuffs(artists,4)" :more="artists.length > 0" :is="'artists'"/>
            <br><br><br><br><br>
            <p class="heads">Albums</p>
            <component @clickLink="tabView = 'albums'" :albums="slicedStuffs(albums,4)" :more="albums.length > 0" :is="'albums'"/>
            <br><br><br><br><br><br><br>
        </div>
        <div v-if="tabView=='tracks' && !loader">
            <component :songs="tracks" :is="'music'"/>
        </div>
        <div v-if="tabView=='artists' && !loader">
            <component :artists="artists" :is="'artists'"/>
        </div>
        <div v-if="tabView=='albums' && !loader">
            <component :albums="albums" :is="'albums'"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Watch, Provide} from 'vue-property-decorator'
import music from '@/views/search/searchMusic.vue'
import artists from '@/views/search/searchArtist.vue'
import albums from '@/views/search/searchAlbum.vue'

@Component({
    components: {
        music,
        artists,
        albums
    }
})
export default class Search extends Vue {
    @Provide() tabView = 'all'
    @Provide() loader = true

    slicedStuffs (obj: any, num: any) {
        return obj.slice(0,num)
    }

    @Watch('$route.params.query')
    onPropertyChange(newValue: any, oldValue: any) {
        this.$store.dispatch('trackModule/fetchSearchedTracks', newValue)
        this.$store.dispatch('artistModule/fetchSearchedArtists', newValue)
    }


    get tracks () {
        return this.$store.getters['trackModule/getTracks']
    }
    get artists () {
        return this.$store.getters['artistModule/getArtistsTotal']
    }
    get albums () {
        return this.$store.getters['albumModule/getAlbums']
    }

    created () {
        this.$store.dispatch('trackModule/fetchSearchedTracks', this.$route.params.query).then(()=> {
            this.loader = false
        })
        this.$store.dispatch('artistModule/fetchSearchedArtists', this.$route.params.query)
        this.$store.dispatch('albumModule/fetchSearchrdAlbums', this.$route.params.query)
    }
}
</script>

<style lang="scss" scoped>
    .heads {
        color: var(--text-dark);
        font-size: 18px;
        font-weight: bold;
        font-family: nunito;
    }
</style>