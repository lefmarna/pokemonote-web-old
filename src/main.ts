import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

// CompositionAPIの導入
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

// axiosのデフォルトURLを指定すると、他の箇所で省略して書くことができる
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;
axios.defaults.withCredentials = true;

// SPAでもGoogleアナリティクスを使うための設定
import VueAnalytics from "vue-analytics";
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_ANALYTICS,
  router,
});

// プロダクションのヒントを表示しない
Vue.config.productionTip = false;

// グローバルコンポーネントの登録
import Title from "@/components/molecules/Title.vue";
Vue.component("Title", Title);

(async () => {
  // ログイン状態の確認、及び、各種データをサーバーから取得する
  await axios
    .get("/init")
    .then((response) => {
      const data = response.data.data;
      store.commit("updateAuthUser", data.auth_user);
      store.commit("updatePokemonData", data.pokemon_data);
      store.commit("updateNatureData", data.nature_data);
      store.commit("updateSpeedItems", data.speed_items);
      store.commit("updateSpeedAbilities", data.speed_abilities);
      store.commit("updateGifts", data.gifts);
    })
    .catch((error) => {
      console.log(error);
    });

  // データを取得してからVueを読み込む
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
})();
