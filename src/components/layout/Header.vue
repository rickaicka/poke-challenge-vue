<template>
    <nav class=" header-pokedex navbar fixed-top">
        <div class="container-fluid">
            <router-link :to="'/'">
                <div class="row">
                    <div class="col-sm-6 col-md-3 pt-0 pb-2 pl-1 header-pokedex__logo">
                        <img src="@/assets/img/colored-pokeball.png" alt="Pokedex Challenge" class="float-left pt-1">
                        <h2 class="text-left float-left ml-2 pt-2 pb-sm-0 mb-sm-0">Pokedex Challenge</h2>
                    </div>
                </div>
            </router-link>
        </div>
    </nav>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Header'
};
</script>

<style lang="scss" scoped>
/* eslint-disable */
@import '@/assets/sass/base/functions';

.header-pokedex{
    background-color: $primary-red;
    height: 60px;
    position: fixed;
    &__logo{
        cursor: pointer;
        & img{
            width: 12%;
        }
        & h2{
            @include textStyle(18px, $white, 500, unset);
        }
    }
}
</style>