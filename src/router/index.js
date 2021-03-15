import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import '../core/axios';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pokemon/:name',
    name: 'Pokemon',
    props: true,
    component: () => import(/* webpackChunkName: "pokemons" */ '../views/Pokemon.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
