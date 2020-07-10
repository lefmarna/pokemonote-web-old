<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/calc-stats">ステータス計算機</router-link>
      <router-link to="/calc-speed">素早さ計算機</router-link>
    </div>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";

export default {
  head: {
    meta() {
      return [{ name: "format-detection", content: "telephone=no" }];
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

#app {
  background-color: #e3f2fd;
  background-image: linear-gradient(135deg, #bbdefb 0.85em, transparent 0),
    linear-gradient(-135deg, #bbdefb 0.85em, transparent 0),
    radial-gradient(circle at 7.4em 7.4em, #bbdefb 0.85em, transparent 0.85em),
    radial-gradient(circle at 0.56em 7.4em, #bbdefb 0.85em, transparent 0.85em),
    linear-gradient(135deg, #90caf9 0.85em, transparent 0),
    linear-gradient(-135deg, #90caf9 0.85em, transparent 0),
    radial-gradient(circle at 7.4em 7.4em, #90caf9 0.85em, transparent 0.85em),
    radial-gradient(circle at 0.56em 7.4em, #90caf9 0.85em, transparent 0.85em);
  background-position: 0 4em, 0 4em, 0 -4em, 0 -4em, 4em 0, 4em 0, 4em 0, 4em 0;
  background-size: 8em 8em;
  background-repeat: repeat;
}

h2 {
  position: relative;
  background: #ffcce5;
  box-shadow: 0px 0px 0px 5px #ffcce5;
  border: dashed 2px white;
  padding: 0.4em 0.5em;
  color: #454545;
}

h2:after {
  position: absolute;
  content: "";
  left: -7px;
  top: -7px;
  border-width: 0 0 15px 15px;
  border-style: solid;
  border-color: #fff #fff #ffb8da;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #fff;
  border-left: solid 1px #ececec;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
  box-shadow: inset 0 0 0 2px #fff;
}
</style>
