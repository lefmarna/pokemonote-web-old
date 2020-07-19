import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

// Google AdSense ディスプレイ広告のみ利用する設定
import Adsense from "vue-google-adsense/dist/Adsense.min.js";
Vue.use(require("vue-script2"));
Vue.use(Adsense);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
