import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// Google AdSense ディスプレイ広告のみ利用する設定
import Ads from "vue-google-adsense";
Vue.use(require("vue-script2")); // eslint-disable-line
Vue.use(Ads.Adsense);

// プロダクションのヒントを表示しない
Vue.config.productionTip = false;

// グローバルコンポーネントの登録
import Title from "@/components/Title.vue";
Vue.component("Title", Title);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
