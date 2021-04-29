<template>
  <v-container class="pokemon" v-if="pokemon">
    <v-row>No. {{ pokemonDetails.no }}</v-row>
    <v-row>{{ pokemonDetails.name }}</v-row>
    <v-row>
      <ul v-for="(types, index) in pokemonDetails.types" :key="index">
        <li>{{ types }}</li>
      </ul>
    </v-row>
    <v-row>
      <ul v-for="(abilities, index) in pokemonDetails.abilities" :key="index">
        <li>{{ abilities }}</li>
      </ul>
    </v-row>
    <v-row> {{ pokemonDetails.hiddenAbilities }}</v-row>
    <v-row
      >{{ pokemonDetails.stats.hp }}-{{ pokemonDetails.stats.attack }}-{{
        pokemonDetails.stats.defence
      }}-{{ pokemonDetails.stats.spAttack }}-{{
        pokemonDetails.stats.spDefence
      }}-{{ pokemonDetails.stats.speed }}</v-row
    >
    <v-row>{{ pokemonDetails.stats.attack }}</v-row>

    <!-- {{ pokemonDetails.types[0] }} -->
    {{ pokemonDetails }}
    <!-- <p>表示名：{{ pokemon.user.nickname }}</p> -->
  </v-container>
  <div v-else>ポケモン情報を読み込んでいます...</div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export type DataType = {
  pokemon: any;
};

export default Vue.extend({
  data: (): DataType => ({
    pokemon: "",
  }),
  computed: {
    // ポケモンの詳細情報をVuexから取得する
    pokemonDetails() {
      const pokemonData = this.$store.getters.pokemonData;
      return pokemonData.find((pokemon) => pokemon.name == this.pokemon.name);
    },
  },
  props: { id: Number },
  // コンポーネントの更新ではライフサイクルの初期化を行わないため、createdではなくwatchで監視している
  watch: {
    id: {
      // immediate: true とすることで、初期描画時にもwatchが発火するようになる
      immediate: true,
      handler() {
        axios
          .get(`/pokemons/${this.id}`)
          .then((response) => {
            this.pokemon = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  },
});
</script>
