<template>
<!-- eslint-disable no-trailing-spaces -->
  <div class="container-fluid home-pokedex">
      <div class="row">
          <div class="col-md-12">
              <CardPokemon :cardPokemon="pokemons"/>
          </div>
      </div>
      <div class="row d-md-none d-block">
          <div class="col-md-12 col-5 offset-4">
              <div>
                  <button class="btn-renew-pokedex-icon">
                      <i class="material-icons">autorenew</i>
                  </button>
                  <button class="btn-renew-pokedex-txt">More</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */

import CardPokemon from "@/components/shared/CardPokemon.vue";

export default {
  watch: {
  },
  computed: {
    pokemons() {
		let reorderedPokemons = this.$store.state.pokemons.listPokemons;
        reorderedPokemons = reorderedPokemons.sort((a,b) => {
            return a?.id - b?.id;
        });
        return reorderedPokemons;
    }
  },
  methods: {
    getPokemons(pagination) {
          const store = this.$store;
          this.$http((pagination ? pagination : '/pokemon/?&offset=0&limit=50')).then(res => {              
              for (var i = 0, len = res.data.results.length; i < len; i++) {
                let dt = {
                    pokemon: res.data.results[i],
                    store, 
                    next: res.data.next,
                    previous: res.data.previous,
                    count: res.data.count
                } ;
                store.commit('getDetailsPokemon', dt);         
              };
        });
    },
    scroll() {          
    const _store = this.$store;
    const _this = this;
    window.onscroll = function(ev) {
        
        let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        let max = document.documentElement.scrollHeight;
        const uA = navigator.userAgent;
        if (_store.state.pokemons.listPokemons.length > 0 && (pos == max) && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(uA))) {
            _this.getPokemons(_store.state.pokemons.next);
        }
    };
    }
  },
  mounted(){
    const _store = this.$store;
    const _this = this;
    if(_store.state.pokemons.listPokemons.length == 0){
        _this.getPokemons();         
    }
    window.addEventListener('scroll', _this.scroll);
  },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll)
    },
  name: 'Home',
  components: {
      CardPokemon
  }
};
</script>

<style lang="scss" scoped>

/* eslint-disable no-trailing-spaces  */
@import '@/assets/sass/base/functions';

.btn-renew-pokedex{
    &-icon{
        margin-bottom: 10px;
        box-shadow: none!important;
        outline: none;
    }
    &-txt{
        margin-left: -20px;
        position: static;
        width: 6em;
        padding: 2px 0;
        outline: none;
        margin-bottom: 10px;
    }
}
</style>
