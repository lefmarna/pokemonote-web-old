<template>
  <div>
    <LoginAlert alertTitle="計算結果の保存" />
    <CalcStats
      title="ステータス計算機"
      buttonText="投稿する"
      :currentPokemon.sync="currentPokemon"
      :currentNature.sync="currentNature"
      :lv.sync="lv"
      :stats.sync="stats"
      @submit="postPokemon"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LoginAlert from "@/components/molecules/LoginAlert.vue";
import CalcStats from "@/components/templates/CalcStats.vue";
import pokemonParams from "@/mixins/pokemonParams";
import axios from "axios";
import router from "@/router";

export default Vue.extend({
  components: {
    LoginAlert,
    CalcStats,
  },
  mixins: [pokemonParams],
  methods: {
    postPokemon(params): void {
      axios
        .post("/pokemons", params)
        .then((response) => {
          router.push(`/pokemons/${response.data.data.id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
