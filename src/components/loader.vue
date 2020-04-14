<template>
  <div>
  <!-- <div style="height: 100vh"> -->
    <div class="loader">Loading...</div>
    <!-- <div class="top">
      <div class="in shine one"></div>
      <div class="in shine two"></div>
    </div>
    <br><br><br><br>
    <div class="top">
      <div class="in shine quads"></div>
      <div class="in shine quads"></div>
      <div class="in shine quads"></div>
      <div class="in shine quads"></div>
    </div>
    <br><br><br><br>
    <div class="top">
      <div class="in shine one"></div>
      <div class="in shine two"></div>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Loader extends Vue {

}
</script>

<style lang="scss" scoped>
  .top {
    display: flex;
    max-width: 96%;
    .in {
      height: 300px;
      width: 100%;
      border-radius: 10px;
      border: 1px solid var(--search-border);
      margin: 10px;
    }
    .one {
      flex: 2 2 0;
    }
    .two {
      flex: 1 1 0;
    }
    .quads {
      flex: 1 1 0;
    }
    .shine {
      background: var(--white-body);
      background-image: var(--shine);
      background-repeat: no-repeat;
      background-size: cover;
      display: inline-block;
      position: relative;
      -webkit-animation-duration: 1s;
      -webkit-animation-fill-mode: forwards; 
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-name: placeholderShimmer;
      -webkit-animation-timing-function: linear;
    }
  }

  @media (max-width: 785px) {
    .top {
      flex-direction: column
    }
  }

  @-webkit-keyframes placeholderShimmer {
    0% {
      background-position: -468px 0;
    }
    
    100% {
      background-position: 468px 0; 
    }
  }

  .loader {
    font-size: 5px;
    margin: 100px auto;
    text-indent: -9999em;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    background: var(--main);
    background: -moz-linear-gradient(left, var(--main) 10%, rgba(255, 255, 255, 0) 42%);
    background: -webkit-linear-gradient(left, var(--main) 10%, rgba(255, 255, 255, 0) 42%);
    background: -o-linear-gradient(left, var(--main) 10%, rgba(255, 255, 255, 0) 42%);
    background: -ms-linear-gradient(left, var(--main) 10%, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, var(--main) 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: var(--main);
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  .loader:after {
    background: var(--white-body);
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

</style>