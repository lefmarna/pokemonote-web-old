<template>
  <div class="pokemon" v-if="pokemon">
    <p>ID：{{ id }}</p>
    <p>ポケモン名：{{ pokemon.name }}</p>
    <p>表示名：{{ pokemon.user.nickname }}</p>
  </div>
  <div v-else>ポケモン情報を読み込んでいます...</div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  data: () => ({
    pokemon: [],
  }),
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
