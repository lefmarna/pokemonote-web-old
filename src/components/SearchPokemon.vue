<template>
  <v-autocomplete
    :items="pokemonData"
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

export default Vue.extend({
  mixins: [filterForSearch],
  computed: {
    pokemonData(): {
      no: number;
      name: string;
      form: string;
      ranks: string[];
      evolutions: number[];
      types: string[];
      abilities: string[];
      hiddenAbilities: string[];
      stats: {
        [key: string]: number;
      };
    } {
      return this.$store.getters.pokemonData;
    },
    currentPokemon: {
      get() {
        return this.$store.getters.currentPokemon;
      },
      set(selectedPokemon): void {
        // 全消し(clearable)を利用する場合、ポケモンの情報がなくなってしまうと不具合が発生するため、入力情報がない場合は更新させないようにした
        if (selectedPokemon) {
          this.$store.commit("updateCurrentPokemon", selectedPokemon);
        }
        (document.activeElement as HTMLElement).blur(); // ポケモンを更新後、フォーカスを外す
      },
    },
  },
});
</script>
