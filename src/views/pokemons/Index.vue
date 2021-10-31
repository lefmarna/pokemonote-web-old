<template>
  <PokemonTable title="ポケモン一覧" :pokemons="pokemons" />
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import PokemonTable from "@/components/templates/PokemonTable.vue";

export interface DataType {
  pokemons: [];
}

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
        let pokemons = response.data.data;
        const authUserId = this.$store.getters.authUser.id;
        // 自分の投稿は表示させない
        if (authUserId) {
          pokemons = pokemons.filter(
            (pokemon: any) => pokemon.user.id != authUserId
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
