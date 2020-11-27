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
    lv: 50,
    currentNature: {
      name: "がんばりや",
      stats: {
        hp: 1.0,
        attack: 1.0,
        defence: 1.0,
        spAttack: 1.0,
        spDefence: 1.0,
        speed: 1.0,
      },
    },
    stats: [
      {
        en: "hp",
        ja: "ＨＰ",
        abbreviation: "H",
        individualValue: 31,
        effortValue: "",
      },
      {
        en: "attack",
        ja: "こうげき",
        abbreviation: "A",
        individualValue: 31,
        effortValue: "",
      },
      {
        en: "defence",
        ja: "ぼうぎょ",
        abbreviation: "B",
        individualValue: 31,
        effortValue: "",
      },
      {
        en: "spAttack",
        ja: "とくこう",
        abbreviation: "C",
        individualValue: 31,
        effortValue: "",
      },
      {
        en: "spDefence",
        ja: "とくぼう",
        abbreviation: "D",
        individualValue: 31,
        effortValue: "",
      },
      {
        en: "speed",
        ja: "すばやさ",
        abbreviation: "S",
        individualValue: 31,
        effortValue: "",
      },
    ],
  },
  getters: {
    currentPokemon: (state) => state.currentPokemon,
    currentNature: (state) => state.currentNature,
    lv: (state) => state.lv,
    stats: (state) => state.stats,
  },
  mutations: {
    updateCurrentPokemon(state, selectedPokemon) {
      state.currentPokemon = selectedPokemon;
    },
    updateCurrentNature(state, selectedNature) {
      state.currentNature = selectedNature;
    },
    updateLv(state, value) {
      state.lv = value;
    },
    updateStats(state, value) {
      state.stats = value;
    },
  },
});
