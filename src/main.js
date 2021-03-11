/* eslint-disable */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Header from './components/layout/Header.vue';
import TypePokemonn from './components/shared/TypePokemon.vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
 
Vue.use(vueNumeralFilterInstaller, { locale: 'pt-br' });

Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  router,
  store,
  Header,
  TypePokemonn,
  VueMaterial,
  render: (h) => h(App),
}).$mount('#app');
