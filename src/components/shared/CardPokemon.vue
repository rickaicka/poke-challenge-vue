<template>
    <ul class="pokedex-list ml-0 mr-0 pl-2 pr-0">
        <li class="pokedex-list__item mb-4" v-for="pok in cardPokemon" :key="(pok.id + pok.order)">
            <router-link :to="'/pokemon/' + pok.name">
                <md-card class="pokedex-list__item__card-pokemon mr-2 px-0 pb-3 pt-2">
                    <div class="pokedex-list__item__card-pokemon__header px-3">
                        <h3>{{pok.name}}</h3>
                        <TypePokemon v-for="type in pok.types" :key="type.type.name" :typePokemon="type.type.name" />
                    </div>
                    <div class="pokedex-list__item__card-pokemon__image">
                        <md-card-media>
                            <img :src="pok.sprite">
                        </md-card-media>
                    </div>
                    <md-card-content class="pokedex-list__item__card-pokemon__content">
                        <p class="text-center">
                            <span>#</span> {{pok.id | numeral('000')}}
                        </p>
                    </md-card-content>
                    <div class="pokedex-list__item__card-pokemon__details">
                        <md-button class="md-fab md-mini md-plain">
                            <md-icon>loupe</md-icon>
                        </md-button>
                    </div>
                </md-card>
            </router-link>
        </li>
    </ul>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import TypePokemon from "@/components/shared/TypePokemon.vue";

export default {
  props: {
    cardPokemon: {
      type: Array,
    },
  },
  name: 'CardPokemon',
  components: {
      TypePokemon,
  }
};

</script>

<style lang="scss" scoped>

/* eslint-disable no-trailing-spaces  */
@import '@/assets/sass/base/functions';

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
