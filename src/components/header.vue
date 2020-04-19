<template>
    <div class="container">
        <font-awesome-icon @click="toggleNav" icon="bars" class="bar"/>
        <div class="no"></div>
        <div class="search">
            <input @keyup="searchAction" v-model="search" class="form-input" placeholder="Search"/>
        </div>
        <div class="image" style="display:flex">
            <img width="30" height="30" src="https://i2.sndcdn.com/avatars-kbAlPaWkY2jCGJdC-uR5g2g-t500x500.jpg" class="image-fluid profile-pic image-round"/>
            <label class="switch">
                <input style="cursor:pointer" @change="changeTheme" v-model="theme" type="checkbox" />    
                <div></div>
            </label>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Header extends Vue {
    private theme = false
    search = ''

    toggleNav(){
        this.$store.commit('setSideNav')
    }
    changeTheme() {
        if (this.theme === false) {
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
        }
        window.localStorage.setItem('theme', this.theme?'true':'false')
    }

    searchAction () {
        const path = '/search/'+this.search
        if (this.$route.path !== path) {
            this.$router.push(path)
        }
    }

    mounted() {
        if (window.localStorage.getItem('theme') === 'false') {
            document.documentElement.setAttribute('data-theme', 'dark')
            this.theme = false
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
            this.theme = true
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        padding: 0 20px;
        // width: 80%;
        margin: 0 auto;
        justify-content: center;
    }
    .bar {
        margin-top: 10px;
        margin-right: 10px;
        font-size: 20px;
        color: var(--main);
        display: none;
    }
    .search {
        flex: 1 1 0px;
    }
    .no {
        width: 270px;
    }

    .form-input {
        margin-top: 3px;
        width: 300px;
        border: 0px;
        &:focus {
            outline: none;
        }
    }

    .profile-pic {
        margin-top: 5px;
        border: 1px solid rgb(167, 167, 167);
    }

    @media (max-width: 600px) {
        .form-input {
            max-width: 220px
        }
    }

    @media (max-width: 800px) {
        .profile-pic {
            display:none
        }
        .search {
            width: 200px;
        }
        .no {
            display: none;
        }
        .bar {
            display: block;
        }
    }

    .switch input {
        position: absolute;
        opacity: 0;
    }

    .switch {
        display: inline-block;
        font-size: 15px; 
        height: 1em;
        width: 2em;
        background: var(--theme-switch);
        border-radius: 1em;
        margin-left: 20px;
        margin-top: 14px;
        margin-right: 30px;
    }

    .switch div {
        height: 1em;
        width: 1em;
        border-radius: 1em;
        background: #FFF;
        box-shadow: 0 0.1em 0.3em rgba(0,0,0,0.3);
        -webkit-transition: all 300ms;
        -moz-transition: all 300ms;
        transition: all 300ms;
    }

    .switch input:checked + div {
    -webkit-transform: translate3d(100%, 0, 0);
        -moz-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
    }
</style>