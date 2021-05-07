<template>
  <PokemonTable title="ポケモン一覧" :pokemons="pokemons" />
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import PokemonTable from "@/components/templates/PokemonTable.vue";

export type DataType = {
  pokemons: [];
};

export default Vue.extend({
  data: (): DataType => ({
    pokemons: [],
  }),
  components: {
    PokemonTable,
  },
  created() {
    axios
      .get("/pokemons")
      .then((response) => {
        let pokemons = response.data.pokemons;
        const userName = this.$store.getters.userName;
        // 自分の投稿は表示させない
        if (userName) {
          pokemons = pokemons.filter(
            (pokemon: any) => pokemon.user.username != userName
          );
        }
        this.pokemons = pokemons;
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
</script>
