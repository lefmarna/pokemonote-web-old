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
        commit("updateGifts", data.gifts);
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
