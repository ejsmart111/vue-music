<template>
    <div><br>
        <div class="tops">
            <div class="card top-tracks" v-for="(artist, index) in artists" :key="index+'s'">
                <router-link :to="'/artist/'+artist.id"><div class="tracks" :style="{ 'background-image': 'url(' + artist.image + ')' }">
                </div>
                <div class="options">
                    <p style="flex:2 2 0" class="title"><b>{{artist.name}}</b></p>
                </div></router-link>
            </div>
        </div>
        <p class="title" v-if="artists.length <= 0">No Artists match your query</p>
        <button @click="$emit('clickLink')" style="" v-if="more" class="btn-norm">More</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Provide} from 'vue-property-decorator'

@Component
export default class ArtistSearch extends Vue {
    @Prop()
    artists !: any
    @Prop({default: false})
    more !: boolean

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