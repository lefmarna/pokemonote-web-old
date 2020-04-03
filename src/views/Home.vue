<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="ようこそ！ポケモニットのアプリ集へ！" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  text-align: center;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
};
</script>
