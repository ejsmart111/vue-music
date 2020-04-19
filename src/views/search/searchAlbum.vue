<template>
    <div><br>
        <div class="tops">
            <div class="card top-tracks" v-for="(album, index) in albums" :key="index+'s'">
                <router-link :to="'/album/'+album.id"><div class="tracks" :style="{ 'background-image': 'url(' + album.image + ')' }">
                </div>
                <div class="options">
                    <p style="flex:2 2 0" class="title">{{album.artist_name}}- <b>{{album.name}}</b></p>
                </div></router-link>
            </div>
        </div>
        <p class="title" v-if="albums.length <= 0">No Albums match your query</p>
        <button @click="$emit('clickLink')" style="" v-if="more" class="btn-norm">More</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component
export default class AlbumsSearch extends Vue {
    @Prop()
    albums !: any
    @Prop({default: false})
    more !: any
}
</script>

<style lang=scss scoped>
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