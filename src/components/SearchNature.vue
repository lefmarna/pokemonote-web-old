<template>
  <v-autocomplete
    :items="natureData"
    item-text="name"
    label="性格"
    :filter="filterForSearch"
    v-model="currentNature"
    no-data-text="性格が見つかりません。"
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
    natureData(): {
      id: number;
      name: string;
      stats: {
        [key: string]: number;
      };
    }[] {
      return this.$store.getters.natureData;
    },
    currentNature: {
      get(): {
        currentNature: {
          id: number;
          name: string;
          stats: {
            [key: string]: number;
          };
        };
      } {
        return this.$store.getters.currentNature;
      },
      set(selectedNature): void {
        this.$store.commit("updateCurrentNature", selectedNature);
        (document.activeElement as HTMLElement).blur(); // 性格を更新後、フォーカスを外す
      },
    },
  },
});
</script>
