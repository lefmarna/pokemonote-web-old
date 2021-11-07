/* eslint-disable */
import axios from "axios";

const state = {
  // サーバーから取得する
  pokemonData: [],
  natureData: [],
  speedItems: [],
  speedAbilities: [],
  ranking: [],
  gifts: [],
};

const getters = {
  pokemonData: (state) => state.pokemonData,
  natureData: (state) => state.natureData,
  speedItems: (state) => state.speedItems,
  speedAbilities: (state) => state.speedAbilities,
  ranking: (state) => state.ranking,
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
  updateRanking(state, value) {
    state.ranking = value;
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
