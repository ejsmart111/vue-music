<template>
  <div class="body">
      <img width="100" class="image-fluid" src="../assets/logo.png">

      <div class="navigations">
          <ul class="nav-list">
            <li @click="setNav" class="nav-links">
                <router-link to='/'><font-awesome-icon class="icons" icon="home"/> <span :class="{ 'active' : $route.path == '/'}" class="link">Home</span></router-link>
            </li>
            <li @click="setNav" class="nav-links">
                <router-link to='/artists'><font-awesome-icon class="icons" icon="user"/> <span :class="{ 'active' : $route.path == '/artists'}" style="margin-left: 19px" class="link">Artists</span></router-link>
            </li>
            <li @click="setNav" class="nav-links">
                <router-link to='/albums'><font-awesome-icon class="icons" icon="compact-disc"/> <span :class="{ 'active' : $route.path == '/albums'}" style="margin-left: 16px" class="link">Albums</span></router-link>
            </li>
            <li @click="setNav" class="nav-links">
                <router-link to='/tracks'><font-awesome-icon class="icons" icon="microphone-alt"/> <span :class="{ 'active' : $route.path == '/tracks'}" style="margin-left: 22px" class="link">Tracks</span></router-link>
            </li>
            <!-- <li @click="setNav" class="nav-links">
                <router-link to='/'><font-awesome-icon class="icons" icon="broadcast-tower"/> <span style="margin-left: 12px" class="link">Radio Channels</span></router-link>
            </li> -->
            <li @click="setNav" class="nav-links">
                <router-link to='/genres'><font-awesome-icon class="icons" icon="music"/> <span :class="{ 'active' : $route.path == '/genres'}" style="margin-left: 18px" class="link">Genres</span></router-link>
            </li>
            <li @click="setNav" class="nav-links">
                <router-link to='/playlists'><font-awesome-icon class="icons" icon="headphones-alt"/> <span :class="{ 'active' : $route.path == '/playlists'}" style="margin-left: 20px" class="link">Playlist</span></router-link>
            </li>
          </ul>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Sidebar extends Vue {
    setNav () {
        this.$store.commit('setSideNavFalse')
    }
}
</script>

<style scoped lang="scss">
    .body {
        padding: 1px;
        display: block;
    }
    .image-fluid {
        margin-left: 30px;
        margin-top: 0px;
    }
    .nav-list {
        list-style-type: none;
        margin-top: 60px;
        a {
            text-decoration: none;
            font-family: nunito;
            font-size: 16px;
            font-weight: bold;
        }
        .link {
            color: var(--text-dark);
            margin-left: 15px;
        }
    }
    .active {
        color: var(--main) !important
    }
    .nav-links {
        margin-top: 30px;
    }

    @media (max-height: 612px) {
        .navigations {
            margin-top: -30px;
            .nav-links {
                margin-top: 20px;
                a {
                    font-size: 12px !important;
                }
            }
        }
    }
</style>