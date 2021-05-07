import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

// axiosのデフォルトURLを指定すると、他の箇所で省略して書くことができる
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;

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

// 最初の読み込み時に自動でログインする
store.dispatch("autoLogin");

// 各種データをサーバーから取得する
store.dispatch("getData");

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
