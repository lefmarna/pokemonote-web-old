/* eslint-disable */
const state = {
  // サーバーから取得する
  pokemonData: [],
  natureData: [],
  ranking: [],
};

const getters = {
  pokemonData: (state) => state.pokemonData,
  natureData: (state) => state.natureData,
  ranking: (state) => state.ranking,
};

const mutations = {
  updatePokemonData(state, value) {
    state.pokemonData = value;
  },
  updateNatureData(state, value) {
    state.natureData = value;
  },
  updateRanking(state, value) {
    state.ranking = value;
  },
};

export default {
  state,
  getters,
  mutations,
};
