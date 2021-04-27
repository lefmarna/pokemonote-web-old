<template>
  <PokemonTable title="ポケモン一覧" :pokemons="pokemons" />
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import PokemonTable from "@/components/PokemonTable.vue";

export default Vue.extend({
  data: () => ({
    pokemons: [],
  }),
  components: {
    PokemonTable,
  },
  created() {
    axios
      .get("/pokemons")
      .then((response) => {
        // 努力値と実数値は1行にまとめる
        this.pokemons = response.data.pokemons;
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
</script>
