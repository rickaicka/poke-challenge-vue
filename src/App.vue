<template>
  <div id="app">
    <Header/>
    <main class="router-main">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import '@/assets/sass/base/functions';
.router-main{
    margin-top: 6vw;
    @media screen and (min-width: 1441px) {
        margin-top: 4vw;
    }
    @media screen and (max-width: $mobile) {
        margin-top: 23vw;
    }
}
.mat-card-header-text {
    margin: 0!important;
}
html{
  background-color: white !important;
}

</style>

<script>
// @ is an alias to /src
/* eslint-disable */
import Header from '@/components/layout/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  },
};
</script>