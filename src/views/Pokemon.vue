<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="container-fluid">
    <div class="row mb-3">
        <div class="col-md-12 container-pokemon-detail__back">
            <a class=" float-left">
                <router-link :to="'/'">
                    <md-icon class="float-left ml-2" :class="pokemonDetail.typeClass">home</md-icon >
                    <small :class="pokemonDetail.typeClass">Pokedex</small>
                </router-link>
                <i class="float-left ml-2" :class="pokemonDetail.typeClass"> - </i>
                <p class="float-left ml-2" :class="pokemonDetail.typeClass">{{pokemonDetail.name}}</p>
            </a>
        </div>
    </div>
    <div class="container-pokemon-detail">
        <div class="row">
            <div class="col-md-2 container-pokemon-detail__img">
                <img :src="pokemonDetail.sprite" class="img-fluid img-thumbnail" :alt="pokemonDetail.name">
            </div>
            <div class="mt-3 mt-md-0 col-md-2 container-pokemon-detail__name-type">
                <h2 class="container-pokemon-detail__name-type__name m-0" :class="pokemonDetail.typeClass">{{pokemonDetail.name}}</h2>
                <div class="container-pokemon-detail__name-type__type">
                    <TypePokemon v-for="type in pokemonDetail.types" :key="type.type.name" :typePokemon="type.type.name" />
                </div>
                <div class="container-pokemon-detail__name-type__infos mt-2">
                    <span class="container-pokemon-detail__name-type__infos__number"> <i>#</i> {{pokemonDetail.id | numeral('000')}}</span>
                    <!-- <span class="container-pokemon-detail__name-type__infos__weight-height" *ngIf="pokemon?.weight >= 100">{{pokemon?.weight | number:'3.2-2'}} kg, {{pokemon?.height}} cm</span>
                    <span class="container-pokemon-detail__name-type__infos__weight-height" *ngIf="pokemon?.weight < 100">{{pokemon?.weight | number:'2.2-2'}} kg, {{pokemon?.height}} cm</span> -->
                </div>  
            </div>
            <div class="mt-3 mt-md-0 col-md-5 offset-md-1 container-pokemon-detail__flavor-text">
                <h2>Description: </h2>
                <p>{{pokemonDetail.flavor_text}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-10 container-pokemon-detail__tabs mt-3">
                <md-tabs md-alignment="left" md-swipeable>
                    <md-tab id="tab-stats" class="pl-0" md-label="Stats"> 
                        <div class="container-pokemon-detail__tabs__stats pt-2">
                            <ul class="container-pokemon-detail__tabs__stats__list list-group">
                                <li v-for="(stat, index) in pokemonDetail.stats" :key="index" class="container-pokemon-detail__tabs__stats__list__item list-group-item">
                                    <p class="float-left">
                                        {{stat.stat.name}}: <span>{{stat.base_stat}}</span>
                                    </p>
                                    <md-progress-bar md-mode="determinate" :class="'md-determinate-type-stats-' + stat.stat.name" :md-value="stat.base_stat"></md-progress-bar>
                                </li>
                            </ul>
                        </div>
                    </md-tab>
                </md-tabs>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import TypePokemon from "@/components/shared/TypePokemon.vue";
import axios from 'axios';
import storeBase from '@/store/index.js';

export default {
  computed: {
    pokemonDetail() {
        return this.$store.state.pokemonDetail;
    },
    tabsDetail() {
        return storeBase.state.tabsDetails;
    }
  },
  methods: {
        getPokemonsByName(){
            const _this = this;
            const store = this.$store;
            store.state.pokemons.listPokemons.filter((pok) => {
                if(pok.name === _this.name && pok.id !== store.state.pokemonDetail.id) {
                    store.commit('pokemonDetail', {pok, store});
                }
            });
        },
        getMoveDetails: (move) => {
            const store = storeBase;
            axios(move.move.url).then(mv => {
                store.state.tabsDetails = mv.data;
                store.state.tabsDetails.moveDetail = mv.data.flavor_text_entries.filter(txt => {
                if(txt.language.name === 'en'){
                    return txt.flavor_text;
                } 
                })[0];
                
                store.state.tabsDetails.effectDetail = mv.data.effect_entries.filter(txt => {
                if(txt.language.name === 'en'){
                    return txt.effect;
                } 
                })[0];
            })
            .finally(() => {                
                store.commit('updateTabsDetail', store.state.tabsDetails);
            });
        },
  },
  mounted() {
      if(!this.$store.state.pokemonDetail.name) {
        this.getPokemonsByName();
      }
  },
  props: {
      name: '',
  },
  name: 'Pokemon',
  components: {
      TypePokemon
  }
};

</script>

<style lang="scss" scoped>

/* eslint-disable no-trailing-spaces  */
@import '@/assets/sass/base/functions';

.mat-tab-label-content{
    @include textStyle(20px!important, $second-gray!important, 400!important, capitalize!important);
}
.simplebar-wrapper{
    height: 60vh!important;
    @media screen and (min-width: $mqDesk) {
        height: 16vw!important;
    }
}
.simplebar-scrollbar:before{
    background: unset!important;
}
.scrollbar-pokedex{    
    border-radius: 7px;
    width: 50%;
    margin: 0 auto;
    opacity: .7;
}
.md-progress-bar{
    overflow: unset!important;
    margin-top: 24px;
}
.md-tabs {
    & .md-tabs-navigation {
        & .md-button{
        max-width: unset!important;;  
        }
    }
}
.container-pokemon-detail{
    width: 100%;
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    display: block;
    position: relative;
    border-radius: 4px;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    min-height: 95vh;
    padding: 16px;
    &__back{
        & a{
            @include textStyle(16px, $primary-gray, 500, capitalize, true);
            display: flex;
            flex-flow: row;
            justify-content: center;
            align-items: center;
            &:hover{
                @include textStyle(16px, $primary-gray, 500, capitalize, true);
                text-decoration: underline;
            }
            & i{
                font-size: 22px;
                &.md-icon{
                    line-height: unset;
                }
            }
            & small{                
                @include textStyle(16px, $primary-gray, 500, capitalize, true);
                &:hover{                    
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }
        & p{
            @include textStyle(16px, $primary-gray, 500, capitalize, true);
            margin-bottom: 0;
        }
    }
    &__img{
        & img{
            width: 100%;
        }
    }
    &__name-type{
        & h2{
            @include textStyle(24px, $second-gray, 500, capitalize);
        }
        &__type{
            width: 100%;
        }
        &__infos{
            display: flex;
            flex-flow: column wrap;
            &__number{
                @include textStyle(14px, $second-gray, 400, capitalize);
                & i{
                    @include textStyle(10px, $second-gray, 400, capitalize);
                    font-style: normal;
                }
            }
            &__weight-height{
                @include textStyle(12px, $second-gray, 400, none);
                @media screen and (max-width: $mobile) {
                    @include textStyle(14px, $second-gray, 400, none); 
                }
            }
        }
    }
    &__tabs{
        &__abilities, &__moves, &__stats{
            & ul{
                display: flex;
                flex-flow: column nowrap;
                & li{
                    width: 100%;
                    transition: all 0.5s ease;
                    cursor: pointer;
                    & p{
                        @include textStyle(16px, $second-gray, 400, capitalize);
                        & span{
                            @include textStyle(16px, $second-gray, 500, capitalize);
                        }
                    }
                    & i{
                        font-size: 18px;
                    }
                    &:hover{
                        background-color: rgba($primary-gray, .6) ;
                    }
                }
            }
        }
        &__stats{
            &__list{
                &__item{
                    border: transparent;
                    & .md-progress-bar-fill{
                        background-color: red;
                    }
                }
            }
        }
    }
    &__infos{
        width: 100%;
        height: 60vh!important;
        @media screen and (min-width: $mqDesk) {
            height: 16vw!important;
        }
        .mat-expansion-panel-header{
            &-title{
                @include textStyle(16px, $second-gray, 500, capitalize);
            }
        }
        .mat-expansion-panel-header-title{
            flex-grow: unset;
            padding-top: 12px;
        }
        .mat-expansion-panel-body{
            & p{
                @include textStyle(14px, $second-gray, 400, none); 
            }
            & .move-ability-name{
                @include textStyle(14px, $second-gray, 500, capitalize);
                margin: 0;
            }
        }

        &__header{
            & h3 {
                @include textStyle(16px, $second-gray, 500, capitalize);
            }
        }
        &__stats{
            &__list{
                &__item{
                    & .title{
                        @include textStyle(16px, $second-gray, 500, capitalize);  
                    }
                    & .content{
                        @include textStyle(14px, $second-gray, 400, none);  
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
    &__flavor-text{
        & h2{
            @include textStyle(22px, $second-gray, 500, capitalize);
            margin: 0;
        }
        & p{
            @include textStyle(16px, $second-gray, 300, none); 
            @media screen and (max-width: $mobile) {
                @include textStyle(14px, $second-gray, 400, none); 
            }
        }
    }
}
</style>
