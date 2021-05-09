<template>
  <v-autocomplete
    :items="pokemonData"
    item-text="name"
    label="ポケモン名"
    :filter="filterForSearch"
    no-data-text="ポケモンが見つかりません。"
    class="mt-3"
    clearable
    auto-select-first
    return-object
    :value="currentPokemon"
    @input="updateCurrentPokemon"
  ></v-autocomplete>
</template>

<script lang="ts">
import Vue from "vue";
import filterForSearch from "@/mixins/filterForSearch";

export type DataType = {
  currentPokemon: {
    no?: number;
    name?: string;
    form?: string;
    ranks?: string[];
    evolutions?: number[];
    types?: string[];
    abilities?: string[];
    hiddenAbilities?: string[];
    stats?: {
      [key: string]: number;
    };
  };
};

export default Vue.extend({
  mixins: [filterForSearch],
  data: (): DataType => ({
    currentPokemon: {},
  }),
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
    }[] {
      return this.$store.getters.pokemonData;
    },
  },
  methods: {
    updateCurrentPokemon($event) {
      if ($event) {
        this.$emit("update:currentPokemon", $event);
      }
      (document.activeElement as HTMLElement).blur(); // ポケモンを更新後、フォーカスを外す
    },
  },
});
</script>
