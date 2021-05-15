import Vue from "vue";
import { Pokemon } from "@/types/pokemon";
import { Nature } from "@/types/nature";
import { Stat } from "@/types/stat";

export default Vue.extend({
  computed: {
    currentPokemon: {
      get(): Pokemon {
        return this.$store.getters.currentPokemon;
      },
      set(value): void {
        this.$store.commit("updateCurrentPokemon", value);
      },
    },
    currentNature: {
      get(): Nature {
        return this.$store.getters.currentNature;
      },
      set(value): void {
        this.$store.commit("updateCurrentNature", value);
      },
    },
    lv: {
      get(): number {
        return this.$store.getters.lv;
      },
      set(value: number | null) {
        this.$store.commit("updateLv", value);
      },
    },
    stats(): Stat[] {
      return this.$store.getters.stats;
    },
  },
});
