import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPokemon: {
      no: 645,
      name: "ランドロス(霊獣)",
      form: "れいじゅうフォルム",
      evolutions: [],
      types: ["じめん", "ひこう"],
      abilities: ["いかく"],
      hiddenAbilities: [],
      stats: {
        hp: 89,
        attack: 145,
        defence: 90,
        spAttack: 105,
        spDefence: 80,
        speed: 91,
      },
    },
  },
  getters: {
    currentPokemon: (state) => state.currentPokemon,
  },
  mutations: {
    updateCurrentPokemon(state, selectedPokemon) {
      state.currentPokemon = selectedPokemon;
    },
  },
});
