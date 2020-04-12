<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/calc-stats">ステータス計算機</router-link>
    </div>
    <router-view class="mt-3 mb-5" />
    <app-footer></app-footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";

export default {
  head: {
    meta() {
      return [
        { property: "og:site_name", content: "ポケモニット アプリ" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@lefmarna" },
        { name: "format-detection", content: "telephone=no" }
      ];
    }
  },
  components: {
    "app-footer": Footer
  }
};
</script>

<style lang="scss">
body {
  font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI",
    "Helvetica Neue", HelveticaNeue, "游ゴシック体", YuGothic,
    "游ゴシック Medium", "Yu Gothic Medium", "游ゴシック", "Yu Gothic", Verdana,
    "メイリオ", Meiryo, sans-serif;
}

b,
strong,
.bold {
  font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI semibold",
    "Helvetica Neue", HelveticaNeue, "游ゴシック体", YuGothic, "游ゴシック",
    "Yu Gothic", "Segoe UI", Verdana, "メイリオ", Meiryo, sans-serif;
}

/* IEだけに適応 */
_:lang(x)::-ms-backdrop,
.selector {
  font-family: "Segoe UI", "メイリオ", Meiryo, sans-serif;
}

#nav {
  padding: 30px;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  background-color: #1e73be;

  a {
    font-weight: bold;
    display: inline-block;
    font-weight: 700;
    transition: 0.15s;
    color: rgba(255, 255, 255, 0.5);
    margin-right: 1em;
    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    &.router-link-exact-active {
      color: rgba(255, 255, 255, 0.9);
    }
  }
}
</style>
