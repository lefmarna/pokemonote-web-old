<template>
  <v-autocomplete
    :items="pokemonList"
    item-text="name"
    label="ポケモン名"
    :filter="filterForSearch"
    v-model="currentPokemon"
    no-data-text="ポケモンが見つかりません。"
    class="mt-3"
    clearable
    auto-select-first
    return-object
  ></v-autocomplete>
</template>

<script lang="ts">
import Vue from "vue";
import filterForSearch from "@/mixins/filterForSearch";
import PokemonData from "@/components/pokemon_data.json";

export default Vue.extend({
  mixins: [filterForSearch],
  computed: {
    pokemonList() {
      return PokemonData; // ポケモンのデータはjsonファイルにまとめてあるため、そちらから取得する
    },
    currentPokemon: {
      get() {
        return this.$store.getters.currentPokemon;
      },
      set(selectedPokemon): void {
        this.$store.commit("updateCurrentPokemon", selectedPokemon);
        (document.activeElement as HTMLElement).blur(); // ポケモンを更新後、フォーカスを外す
      },
    },
  },
});
</script>
