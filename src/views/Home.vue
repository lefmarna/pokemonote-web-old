<template>
  <div class="bg-white">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
        <Jumbotron msg="ポケモニット アプリ" />
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <router-link to="/privacy-policy">利用規約</router-link>
          <p class="h4">フォローする</p>
          <ul class="list-unstyled">
            <li>
              <a
                href="https://twitter.com/lefmarna"
                target="_blank"
                rel="noopener"
                >Twitter</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  text-align: center;
}
a {
  color: #42b983;
}
.jumbotron {
  background: url(../assets/top.jpg) center no-repeat;
  background-size: cover;
}
</style>

<script>
// @ is an alias to /src
import Jumbotron from "@/components/Jumbotron.vue";

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
    Jumbotron
  }
};
</script>
