import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import axios from "axios";
import pokemons from "./pokemons";
import data from "./data";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notice: false,
    // ログイン認証に必要なパラメータ
    authUser: {
      username: "",
      nickname: "",
    },
  },
  getters: {
    notice: (state) => state.notice,
    authUser: (state) => state.authUser,
    isLogin: (state) =>
      Boolean(state.authUser.username && state.authUser.nickname),
  },
  mutations: {
    updateNotice(state, notice) {
      state.notice = notice;
    },
    updateAuthUser(state, authUser) {
      state.authUser = authUser;
    },
  },
  actions: {
    async logout({ commit }) {
      await axios.post("/logout").catch((error) => {
        if (error.response.status !== 401) return;
        console.log(error);
      });
      // Vuexから認証情報を削除する
      commit("updateAuthUser", {
        username: "",
        nickname: "",
      });
      // ログインページにリダイレクトする
      router.replace("/login");
    },
  },
  modules: {
    pokemons,
    data,
  },
});
