import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2';

/* eslint-disable */
Vue.use({
  install(Vue) {
    Vue.prototype.$http = axios;
  },
});
