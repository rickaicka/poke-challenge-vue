<template>
    <span class="type-pk" v-bind:class="typePokemon">{{typePokemon}}</span>
</template>

<script>
export default {
  data() {
    return {
      typePokemon: 'normal',
    };
  },
  name: 'TypePokemon',
};
</script>

<style lang="scss" scoped>
/* eslint-disable no-trailing-spaces  */
/* eslint-disable */
@import '@/assets/sass/base/functions';

.type-pk{
    display: inline-block;
    padding: 0.6em 0.8em 0.4em;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin-right: 8px;
    @include textStyle(10px, $white, 500, uppercase);
    @media screen and (max-width: $mobile) {
        padding: 0.6em 0.8em;
        font-size: 0.58rem;
    }
}

</style>
