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
    pokemonDetail: {},
    tabsDetails: {
      moveDetail: {},
      effectDetail: {}
    }
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
        data.pokemon.species = e.data.species;
      }).finally(() => {         
        data.store.commit('updateState', data); 
      });          
    },
    updateState:(state, data) => {   
      state.pokemons.listPokemons.push(data.pokemon);
      state.pokemons.next = data.next;
      state.pokemons.previous = data.previous;
      state.pokemons.count = data.count;
    },
    updatePokemonDetail: (state, data) => {
      state.pokemonDetail = data;
    },
    updateTabsDetail: (state, data) => {
      state.tabsDetails = data;
    },
    pokemonDetail: (state,data) => {
      const _store = data.store;
      data.pok.typeClass = 'text-type-' + data.pok.types[0].type.name;
      axios('/pokemon/' + data.pok.species.name).then(e =>{
        data.pok.moves = e.data.moves;
        data.pok.abilities = e.data.abilities;
        data.pok.stats = e.data.stats;
      })
      .finally(()=>{   
        axios(data.pok.species.url).then(res => {
          res.data.flavor_text_entries.filter(txt => {
            if(txt.language.name === 'en'){
              data.pok.flavor_text = txt.flavor_text;
            } 
          })[0];
        })
        .finally(() => {
          _store.commit('updatePokemonDetail', data.pok);   
        });
      });
    },
  },
  actions: {
  },
  modules: {
  }
});
