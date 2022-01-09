/* eslint-disable */
const state = {
  // 初期値を用意しておく
  currentPokemon: {
    no: 567,
    name: "アーケオス",
    form: "",
    ranks: [],
    evolutions: [],
    types: ["いわ", "ひこう"],
    abilities: ["よわき"],
    hiddenAbilities: [],
    stats: [75, 140, 65, 112, 65, 110],
  },
  lv: 50,
  currentNature: {
    name: "がんばりや",
    stats: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  },
  // 各種ステータス
  stats: [
    {
      name: "ＨＰ",
      initial: "H",
      individualValue: 31,
      effortValue: null,
    },
    {
      name: "こうげき",
      initial: "A",
      individualValue: 31,
      effortValue: null,
    },
    {
      name: "ぼうぎょ",
      initial: "B",
      individualValue: 31,
      effortValue: null,
    },
    {
      name: "とくこう",
      initial: "C",
      individualValue: 31,
      effortValue: null,
    },
    {
      name: "とくぼう",
      initial: "D",
      individualValue: 31,
      effortValue: null,
    },
    {
      name: "すばやさ",
      initial: "S",
      individualValue: 31,
      effortValue: null,
    },
  ],
};

const getters = {
  currentPokemon: (state) => state.currentPokemon,
  currentNature: (state) => state.currentNature,
  lv: (state) => state.lv,
  stats: (state) => state.stats,
};

const mutations = {
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
};

export default {
  state,
  getters,
  mutations,
};
