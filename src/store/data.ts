/* eslint-disable */
import axios from "axios";

const state = {
  // サーバーから取得する
  pokemonData: [],
  natureData: [],
  speedItems: [],
  speedAbilities: [],
  popularityRanking: [],
  gifts: [],
};

const getters = {
  pokemonData: (state) => state.pokemonData,
  natureData: (state) => state.natureData,
  speedItems: (state) => state.speedItems,
  speedAbilities: (state) => state.speedAbilities,
  popularityRanking: (state) => state.popularityRanking,
  gifts: (state) => state.gifts,
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
  updateGifts(state, gifts) {
    state.gifts = gifts;
  },
};

export default {
  state,
  getters,
  mutations,
};
