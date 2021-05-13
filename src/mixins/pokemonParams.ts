import Vue from "vue";

export default Vue.extend({
  computed: {
    currentPokemon: {
      get(): {
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
        return this.$store.getters.currentPokemon;
      },
      set(value): void {
        this.$store.commit("updateCurrentPokemon", value);
      },
    },
    currentNature: {
      get(): {
        name: string;
        stats: {
          [key: string]: number;
        };
      } {
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
    stats(): {
      en: string;
      ja: string;
      abbreviation: string;
      individualValue: number | null;
      effortValue: number | null;
    }[] {
      return this.$store.getters.stats;
    },
  },
});
