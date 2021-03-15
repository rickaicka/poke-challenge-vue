/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemons: {
      listPokemons: [],
      next: '',
      previous: '',
      count: 0
    },
  },
  plugins: [createPersistedState()],
  mutations: {
    getDetailsPokemon: (state, data) => {
      axios('/pokemon/' + data.pokemon.name).then(e =>{
        Object.keys(e.data.sprites).forEach(function(k){
            if(k == 'front_default'){
              data.pokemon.sprite = e.data.sprites[k];
            }
        });
        data.pokemon.id = e.data.id;
        data.pokemon.types = e.data.types;
        data.pokemon.order = e.data.order;
      }).finally(() => {         
        data.store.commit('updateState', data); 
      });          
    },
    updateState:(state, data) => {   
      state.pokemons.listPokemons.push(data.pokemon);
      state.pokemons.next = data.next;
      state.pokemons.previous = data.previous;
      state.pokemons.count = data.count;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {    
    filterSprites: (sprites) =>{
      let filteredSprite = '';
      Object.keys(sprites).forEach(function(k){
          if(k == 'front_default'){
              filteredSprite = sprites[k];
          }
      });
      return filteredSprite;
    }
  }
});
