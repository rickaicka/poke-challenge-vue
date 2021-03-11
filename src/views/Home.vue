<template>
<!-- eslint-disable no-trailing-spaces -->
  <div class="container-fluid home-pokedex">
      <div class="row">
          <div class="col-md-12">
              <ul class="pokedex-list ml-0 mr-0 pl-2 pr-0">
                <li class="pokedex-list__item mb-4" v-for="pok in pokemons.results" :key="pok.id">
                    <md-card class="pokedex-list__item__card-pokemon mr-2 px-0 pb-3 pt-2">
                        <div class="pokedex-list__item__card-pokemon__header px-3">
                            <h3>{{pok.name}}</h3>
                            <TypePokemon v-for="type in pok.types" :key="type.type.name" :typePokemon="type.type.name" />
                        </div>
                        <div class="pokedex-list__item__card-pokemon__image">
                            <md-card-media>
                                <img v-bind:src="pok.sprite">
                            </md-card-media>
                        </div>
                        <md-card-content class="pokedex-list__item__card-pokemon__content">
                            <p class="text-center">
                                <span>#</span>  {{pok.id | numeral('000')}}
                            </p>
                        </md-card-content>
                        <div class="pokedex-list__item__card-pokemon__details">
                            <md-button class="md-fab md-mini md-plain">
                                <md-icon>loupe</md-icon>
                            </md-button>
                          </div>
                    </md-card> 
                </li>
                <!-- <li class="pokedex-list__item mb-4">
                    <md-card class="pokedex-list__item__card-pokemon mr-2 px-0 pb-3 pt-2">
                        <div class="pokedex-list__item__card-pokemon__header px-3">
                            <h3>Teste</h3>
                            <TypePokemon />
                        </div>
                        <div class="pokedex-list__item__card-pokemon__image">
                            <md-card-media>
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png">
                            </md-card-media>
                        </div>
                        <md-card-content class="pokedex-list__item__card-pokemon__content">
                            <p class="text-center">
                                <span>#</span> 123
                            </p>
                        </md-card-content>
                        <div class="pokedex-list__item__card-pokemon__details">
                            <md-button class="md-fab md-mini md-plain">
                                <md-icon>loupe</md-icon>
                            </md-button>
                          </div>
                    </md-card> 
                </li>
                <li class="pokedex-list__item mb-4">
                    <md-card class="pokedex-list__item__card-pokemon mr-2 px-0 pb-3 pt-2">
                        <div class="pokedex-list__item__card-pokemon__header px-3">
                            <h3>Teste</h3>
                            <TypePokemon />
                        </div>
                        <div class="pokedex-list__item__card-pokemon__image">
                            <md-card-media>
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png">
                            </md-card-media>
                        </div>
                        <md-card-content class="pokedex-list__item__card-pokemon__content">
                            <p class="text-center">
                                <span>#</span> 123
                            </p>
                        </md-card-content>
                        <div class="pokedex-list__item__card-pokemon__details">
                            <md-button class="md-fab md-mini md-plain">
                                <md-icon>loupe</md-icon>
                            </md-button>
                          </div>
                    </md-card> 
                </li>
                <li class="pokedex-list__item mb-4">
                    <md-card class="pokedex-list__item__card-pokemon mr-2 px-0 pb-3 pt-2">
                        <div class="pokedex-list__item__card-pokemon__header px-3">
                            <h3>Teste</h3>
                            <TypePokemon />
                        </div>
                        <div class="pokedex-list__item__card-pokemon__image">
                            <md-card-media>
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png">
                            </md-card-media>
                        </div>
                        <md-card-content class="pokedex-list__item__card-pokemon__content">
                            <p class="text-center">
                                <span>#</span> 123
                            </p>
                        </md-card-content>
                        <div class="pokedex-list__item__card-pokemon__details">
                            <md-button class="md-fab md-mini md-plain">
                                <md-icon>loupe</md-icon>
                            </md-button>
                          </div>
                    </md-card> 
                </li>
                <li class="pokedex-list__item mb-4">
                    <md-card class="pokedex-list__item__card-pokemon mr-2 px-0 pb-3 pt-2">
                        <div class="pokedex-list__item__card-pokemon__header px-3">
                            <h3>Teste</h3>
                            <TypePokemon />
                        </div>
                        <div class="pokedex-list__item__card-pokemon__image">
                            <md-card-media>
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png">
                            </md-card-media>
                        </div>
                        <md-card-content class="pokedex-list__item__card-pokemon__content">
                            <p class="text-center">
                                <span>#</span> 123
                            </p>
                        </md-card-content>
                        <div class="pokedex-list__item__card-pokemon__details">
                            <md-button class="md-fab md-mini md-plain">
                                <md-icon>loupe</md-icon>
                            </md-button>
                          </div>
                    </md-card> 
                </li> -->
            </ul>

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

import TypePokemon from "@/components/shared/TypePokemon.vue"

export default {
  data () {
    return {
        pokemons: []
    }
  },
  methods: {
      getPokemons(){
          this.$http('/pokemon/?&offset=0&limit=50').then(res => {
              res.data.results.forEach(element => {
                  this.$http('/pokemon/' + element.name).then(e =>{
                      element.sprite = this.filterSprites(e.data.sprites)
                      element.id = e.data.id;
                      element.types = e.data.types;
                  })
              });
              this.pokemons = res.data;
          })
      },
      filterSprites(sprites){
        let filteredSprite = '';
        Object.keys(sprites).forEach(function(k){
            if(k == 'front_default'){
                filteredSprite = sprites[k];
            }
        });
        return filteredSprite;
      }
  },
  beforeMount() {
    this.getPokemons();  
  },
  name: 'Home',
  components: {
      TypePokemon
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

.pokedex-list{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    max-width: 100%;
    &__item, &__next-page{
        width: 17vw;
        @media screen and (max-width: $mobile) {
            width: 44vw;
        }
        &__card-pokemon{
            transition: transform 0.3s;
            cursor: pointer;
            outline: unset;
            &:hover{
                transform: translateY(1.3%);
            }
            &__header{
                & h3{
                    @include textStyle(20px, $second-gray, 500, capitalize);
                    margin: 0;
                }
            }
            &__image{
                width: 100%;
                text-align: center;
                & img{
                    width: calc(50% + 32px);
                    margin: unset;
                }
            }
            &__content{
                p{
                    @include textStyle(14px, $second-gray, 400, capitalize);
                    margin-bottom:0;
                    & span{
                        @include textStyle(10px, $second-gray, 400, capitalize);
                    }
                }
            }
            &__details{
                display: flex;
                flex-flow: row;
                justify-content: center;
                align-items: center;
                & .mat-mini-fab{
                    line-height: unset;
                    width: 30px;
                    height: 30px;
                    outline: unset;
                    & .material-icons {
                        font-size: 20px;
                        margin-top: -13px;
                    }
                }
            }
        }
    }
}

</style>
