<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/calc-stats">ステータス計算機</router-link>
    </div>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";

export default {
  components: {
    "app-footer": Footer
  }
};
</script>

<style lang="scss">
#nav {
  padding: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
