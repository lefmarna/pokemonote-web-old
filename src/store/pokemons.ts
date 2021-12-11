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
    stats: {
      hp: 75,
      attack: 140,
      defence: 65,
      spAttack: 112,
      spDefence: 65,
      speed: 110,
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
  // 各種ステータス
  stats: [
    {
      en: "hp",
      ja: "ＨＰ",
      abbreviation: "H",
      individualValue: 31,
      effortValue: null,
      realNumber: 150,
    },
    {
      en: "attack",
      ja: "こうげき",
      abbreviation: "A",
      individualValue: 31,
      effortValue: null,
      realNumber: 160,
    },
    {
      en: "defence",
      ja: "ぼうぎょ",
      abbreviation: "B",
      individualValue: 31,
      effortValue: null,
      realNumber: 85,
    },
    {
      en: "spAttack",
      ja: "とくこう",
      abbreviation: "C",
      individualValue: 31,
      effortValue: null,
      realNumber: 132,
    },
    {
      en: "spDefence",
      ja: "とくぼう",
      abbreviation: "D",
      individualValue: 31,
      effortValue: null,
      realNumber: 85,
    },
    {
      en: "speed",
      ja: "すばやさ",
      abbreviation: "S",
      individualValue: 31,
      effortValue: null,
      realNumber: 130,
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
