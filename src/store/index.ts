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
      id: "",
      name: "",
    },
  },
  getters: {
    notice: (state) => state.notice,
    authUser: (state) => state.authUser,
    isLogin: (state) => Boolean(state.authUser.id && state.authUser.name),
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
    logout({ commit }) {
      axios
        .post("/logout")
        .then(() => {
          // Vuexから認証情報を削除する
          commit("updateAuthUser", {
            id: "",
            name: "",
          });
          // ログインページにリダイレクトする
          router.replace("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    notice({ commit }) {
      commit("updateNotice", true);
      // setTimeoutで3000ms後にshowをfalseにする
      setTimeout(() => {
        commit("updateNotice", false);
      }, 2250);
    },
  },
  modules: {
    pokemons,
    data,
  },
});
