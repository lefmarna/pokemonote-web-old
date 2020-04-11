<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="ポケモニット アプリ" />
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
  head: {
    meta() {
      return [
        { name: "description", content: this.description },
        { property: "og:title", content: "ポケモニット アプリ" },
        { property: "og:description", content: this.description }
      ];
    }
  },
  data() {
    return {
      description:
        "ポケモンの攻略ブログ『ポケモニット』の管理人である『レフマーナ』の自作アプリ集です。"
    };
  },
  components: {
    HelloWorld
  }
};
</script>
