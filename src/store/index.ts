import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import axios from "axios";
import pokemons from "./pokemons";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // ログイン認証に必要なパラメータ
    userId: null,
    accessToken: null,
    client: null,
    uid: null,
  },
  getters: {
    userId: (state) => state.userId,
    accessToken: (state) => state.accessToken,
    client: (state) => state.client,
    uid: (state) => state.uid,
  },
  mutations: {
    updateUserId(state, userId) {
      state.userId = userId;
    },
    updateAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    updateClient(state, client) {
      state.client = client;
    },
    updateUid(state, uid) {
      state.uid = uid;
    },
  },
  actions: {
    autoLogin({ getters, commit, dispatch }) {
      // ログインしていない場合は処理を行わない
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;
      // ログインからの日数を計算する
      const now = new Date();
      const expiryTimeMs = Number(localStorage.getItem("expiryTimeMs"));
      // ログインから2週間経っている場合、ログイン情報を削除する
      if (now.getTime() >= expiryTimeMs) {
        localStorage.removeItem("userId");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("client");
        localStorage.removeItem("uid");
        localStorage.removeItem("expiryTimeMs");
      } else {
        // 滞在中に有効期限のタイミングを迎えたケースを想定して、setTimeoutでログアウトの時間を設定している
        const expiresInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch("logout");
        }, expiresInMs);
        // ログインから2週間経っていない場合、ログイン情報をVuexに保存する
        commit("updateUserId", localStorage.getItem("userId"));
        commit("updateAccessToken", accessToken);
        commit("updateClient", localStorage.getItem("client"));
        commit("updateUid", localStorage.getItem("uid"));
        // ログインできた場合は、認証情報も送信するようにする
        axios.defaults.headers.common = {
          ["access-token"]: getters.accessToken,
          ["uid"]: getters.uid,
          ["client"]: getters.client,
        };
      }
    },
    logout({ commit }) {
      // Vuexから認証情報を削除する
      commit("updateUserId", null);
      commit("updateAccessToken", null);
      commit("updateClient", null);
      commit("updateUid", null);
      // ローカルストレージから認証情報を削除する
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("client");
      localStorage.removeItem("uid");
      localStorage.removeItem("expiryTimeMs");
      // ログインページにリダイレクトする
      router.replace("/login");
    },
    setAuthData({ commit }, authData) {
      // トークンの有効期限(2週間)の間、保存する
      const now = new Date();
      const expiryTimeMs: number = now.getTime() + 1209600000;
      localStorage.setItem("expiryTimeMs", String(expiryTimeMs)); // String型でないとローカルストレージに保存できない
      // Vuexに認証情報を保存する
      commit("updateUserId", authData.userId);
      commit("updateAccessToken", authData.accessToken);
      commit("updateClient", authData.client);
      commit("updateUid", authData.uid);
      // axiosでの通信において必要な認証情報を送信するようにする
      axios.defaults.headers.common = {
        ["access-token"]: authData.accessToken,
        ["uid"]: authData.uid,
        ["client"]: authData.client,
      };
      // ローカルストレージに認証情報を保存する（次回以降の自動ログインに使用する）
      localStorage.setItem("userId", authData.userId);
      localStorage.setItem("accessToken", authData.accessToken);
      localStorage.setItem("client", authData.client);
      localStorage.setItem("uid", authData.uid);
    },
    getData({ commit }) {
      axios
        .get("/data")
        .then((response) => {
          const data = response.data;
          commit("updatePokemonData", data.pokemonData);
          commit("updateNatureData", data.natureData);
          commit(
            "updateSpeedItems",
            data.speed_items.map((items: any) => items.attributes)
          );
          commit(
            "updateSpeedAbilities",
            data.speed_abilities.map((abilities: any) => abilities.attributes)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {
    pokemons,
  },
});
