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

export default Vue.extend({
  mixins: [filterForSearch],
  props: {
    currentPokemon: {
      type: Object,
    },
  },
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
    updateCurrentPokemon($event: {
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
    }) {
      // 全消し(clearable)を利用する場合、ポケモンの情報がなくなってしまうと不具合が発生するため、入力情報がない場合は更新させないようにした
      if ($event) {
        this.$emit("update", $event);
        (document.activeElement as HTMLElement).blur(); // ポケモンを更新後、フォーカスを外す
      }
    },
  },
});
</script>
