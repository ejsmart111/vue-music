<template>
    <div>
        <loader v-if="loader"/>
        <div v-else>
            <br><br><br>
            <div class="tops">
                <div class="card top-tracks" v-for="(genre, index) in genres" :key="index+'s'">
                    <router-link :to="'/genres/tracks/'+genre.link+'/?name=/'+genre.name"><div class="tracks" :style="{ 'background-image': 'url(' + genre.image + ')' }">
                    </div></router-link>
                    <div style="display:flex">
                        <p style="flex:2 2 0" class="title"><b>{{genre.name}}</b></p>
                    </div>
                </div>
            </div>
        </div>
        <br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Genre extends Vue {
    loader = true
    pageOffset = 0
    pageOffsetAlt = 0
    clicks = 1
    pageOffsetMonth = 0
    pageOffsetAltMonth = 0
    clicksMonth = 1
    view = 'total'
    genres = [
        {
            name: 'RnB',
            link: 'rnb',
            id: 1,
            image: 'https://i.pinimg.com/564x/54/2c/7f/542c7feaddcbf4abe9a44146303b1cad.jpg'
        },
        {
            name: 'Jazz',
            link: 'jazz',
            id: 2,
            image: 'https://i.pinimg.com/564x/8f/7f/53/8f7f5348d3ef93db0186c8f70f313382.jpg'
        },
        {
            name: 'Rap',
            link: 'rap',
            id: 3,
            image: 'https://i.pinimg.com/564x/d3/90/f6/d390f66e4335898f3b15a9ef24978336.jpg',
        },
        {
            name: 'Hip-Hop',
            link: 'hiphop',
            id: 4,
            image: 'https://i.pinimg.com/564x/c1/5c/30/c15c305c3d2d04256a5d7b27749ed593.jpg',
        },
        {
            name: 'Dark',
            link: 'dark',
            id: 5,
            image: 'https://i.pinimg.com/564x/49/09/bd/4909bd32abbd4a9883102a42ef204bcc.jpg',
        },
        {
            name: 'Classical',
            link: 'classical',
            id: 6,
            image: 'https://i.pinimg.com/564x/96/ee/02/96ee02fbd19e746544f57e6553675983.jpg',
        },
        {
            name: 'Dance',
            link: 'dance',
            id: 7,
            image: 'https://i.pinimg.com/564x/19/41/d5/1941d5cbcb64e4e8009b323182fccda3.jpg',
        },
        {
            name: 'Electronic',
            link: 'electronic',
            id: 8,
            image: 'https://i.pinimg.com/564x/2a/6f/11/2a6f11188cf7c5d508440d62337975cf.jpg',
        },
        {
            name: 'Blues',
            link: 'blues',
            id: 9,
            image: 'https://i.pinimg.com/564x/8f/77/ee/8f77ee365975dcd81c42686c5cc39d36.jpg',
        },
        {
            name: 'Reggae',
            link: 'reggae',
            id: 10,
            image: 'https://i.pinimg.com/564x/f1/ea/52/f1ea5220fce6029be4fbebb8d15e7446.jpg',
        },
        {
            name: 'House',
            link: 'house',
            id: 11,
            image: 'https://i.pinimg.com/564x/2a/71/95/2a7195a92df3b989b1ca9c487805bc51.jpg',
        },
        {
            name: 'Rock',
            link: 'rock',
            id: 12,
            image: 'https://i.pinimg.com/564x/e8/c9/96/e8c996faca963422e844a4b6ff5ef1be.jpg',
        },
        {
            name: 'Emotional',
            link: 'emotional',
            id: 13,
            image: 'https://i.pinimg.com/564x/e8/c9/96/e8c996faca963422e844a4b6ff5ef1be.jpg',
        },
        {
            name: 'Piano',
            link: 'piano',
            id: 14,
            image: 'https://i.pinimg.com/564x/f4/60/0e/f4600ec07f5780b73e8f52869e692e3a.jpg',
        },
        {
            name: 'Guitar',
            link: 'guitar',
            id: 17,
            image: 'https://i.pinimg.com/564x/66/cd/43/66cd43ab54b5fda627a27cccd4734caa.jpg',
        },
        {
            name: 'Alternative',
            link: 'alternative',
            id: 18,
            image: 'https://i.pinimg.com/564x/2e/f4/8c/2ef48c968657f859a40f3973da74f071.jpg',
        },
        {
            name: 'Pop',
            link: 'pop',
            id: 19,
            image: 'https://i.pinimg.com/564x/4a/ea/dc/4aeadc839682e100b33dd61daea9daf2.jpg',
        },
        {
            name: 'Latin',
            link: 'latin',
            id: 19,
            image: 'https://i.pinimg.com/564x/2e/f4/8c/2ef48c968657f859a40f3973da74f071.jpg',
        },
        {
            name: 'Acoustic',
            link: 'acoustic',
            id: 15,
            image: 'https://i.pinimg.com/564x/46/af/7d/46af7db4d3790c51c4d76b270a070406.jpg',
        },
        {
            name: 'Country',
            link: 'country',
            id: 16,
            image: 'https://i.pinimg.com/564x/14/e5/dd/14e5dda26692163dfb47cff4c2f9a8cb.jpg'
        },
    ]
    error = null

    mounted() {
        window.scrollTo(0,0);
        setTimeout(() => {
            this.loader = false
        }, 1500)
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