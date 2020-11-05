import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Google AdSense ディスプレイ広告のみ利用する設定
import Adsense from "vue-google-adsense/dist/Adsense.min.js";
Vue.use(require("vue-script2"));
Vue.use(Adsense);
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
