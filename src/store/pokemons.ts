/* eslint-disable */
import axios from "axios";

const state = {
  // サーバーから取得する
  pokemonData: [],
  natureData: [],
  speedItems: [],
  speedAbilities: [],
  popularityRanking: [],
  // 初期値を用意しておく
  currentPokemon: {
    no: 645,
    name: "ランドロス(霊獣)",
    form: "れいじゅうフォルム",
    ranks: [],
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
  // 各種ステータス
  stats: [
    {
      en: "hp",
      ja: "ＨＰ",
      abbreviation: "H",
      individualValue: 31,
      effortValue: null,
    },
    {
      en: "attack",
      ja: "こうげき",
      abbreviation: "A",
      individualValue: 31,
      effortValue: null,
    },
    {
      en: "defence",
      ja: "ぼうぎょ",
      abbreviation: "B",
      individualValue: 31,
      effortValue: null,
    },
    {
      en: "spAttack",
      ja: "とくこう",
      abbreviation: "C",
      individualValue: 31,
      effortValue: null,
    },
    {
      en: "spDefence",
      ja: "とくぼう",
      abbreviation: "D",
      individualValue: 31,
      effortValue: null,
    },
    {
      en: "speed",
      ja: "すばやさ",
      abbreviation: "S",
      individualValue: 31,
      effortValue: null,
    },
  ],
};

const getters = {
  pokemonData: (state) => state.pokemonData,
  natureData: (state) => state.natureData,
  speedItems: (state) => state.speedItems,
  speedAbilities: (state) => state.speedAbilities,
  popularityRanking: (state) => state.popularityRanking,
  currentPokemon: (state) => state.currentPokemon,
  currentNature: (state) => state.currentNature,
  lv: (state) => state.lv,
  stats: (state) => state.stats,
};

const mutations = {
  updatePokemonData(state, value) {
    state.pokemonData = value;
  },
  updateNatureData(state, value) {
    state.natureData = value;
  },
  updateSpeedItems(state, value) {
    state.speedItems = value;
  },
  updateSpeedAbilities(state, value) {
    state.speedAbilities = value;
  },
  updatePopularityRanking(state, value) {
    state.popularityRanking = value;
  },
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

const actions = {
  getData({ commit }) {
    axios
      .get("/data")
      .then((response) => {
        const data = response.data;
        commit("updatePokemonData", data.pokemonData);
        commit("updateNatureData", data.natureData);
        commit("updateSpeedItems", data.speedItems);
        commit("updateSpeedAbilities", data.speedAbilities);
        commit("updatePopularityRanking", data.popularityRanking);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
