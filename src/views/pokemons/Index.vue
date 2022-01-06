<template>
  <PokemonTable title="ポケモン一覧" :pokemons="filteredPokemons" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";
import axios from "axios";
import { PokemonTable } from "@/components/templates";
import store from "@/store";
import { Pokemon } from "@/types";

export default defineComponent({
  components: {
    PokemonTable,
  },
  setup() {
    const pokemons = ref<[]>([]);

    /**
     * 自分の投稿したポケモンは表示させない
     */
    const filteredPokemons = computed(() => {
      const authUserName: string = store.getters.authUser.username;
      if (!authUserName) return pokemons.value;
      return pokemons.value.filter(
        (pokemon: Pokemon) => pokemon.user.username !== authUserName
      );
    });

    axios
      .get("/pokemons")
      .then((response) => {
        pokemons.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return {
      filteredPokemons,
    };
  },
});
</script>
