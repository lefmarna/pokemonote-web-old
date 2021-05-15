<template>
  <v-autocomplete
    :items="natureData"
    item-text="name"
    label="性格"
    :filter="filterForSearch"
    no-data-text="性格が見つかりません。"
    auto-select-first
    return-object
    :value="currentNature"
    @input="updateCurrentNature"
  ></v-autocomplete>
</template>

<script lang="ts">
import Vue from "vue";
import filterForSearch from "@/mixins/filterForSearch";
import { Nature } from "@/types/nature";

export default Vue.extend({
  mixins: [filterForSearch],
  props: {
    currentNature: {
      type: Object as Vue.PropType<Nature>,
    },
  },
  computed: {
    natureData(): Nature[] {
      return this.$store.getters.natureData;
    },
  },
  methods: {
    updateCurrentNature($event: Nature): void {
      if ($event) {
        this.$emit("update", $event);
        (document.activeElement as HTMLElement).blur(); // 性格を更新後、フォーカスを外す
      }
    },
  },
});
</script>
