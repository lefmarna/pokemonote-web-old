<template>
  <div>
    <v-alert v-if="!isLogin" outlined type="warning" border="left">
      計算結果の保存には、<router-link
        class="text-decoration-none login-alert"
        to="/login?redirect=/pokemons/new"
        >ログイン</router-link
      >が必要です。
    </v-alert>
    <CalcStats
      title="新規ポケモン投稿"
      buttonText="投稿する"
      :currentPokemon.sync="currentPokemon"
      :currentNature.sync="currentNature"
      :lv.sync="lv"
      :stats.sync="stats"
      :isLogin="isLogin"
      @submit="postPokemon"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CalcStats from "@/components/templates/CalcStats.vue";
import pokemonParams from "@/mixins/pokemonParams";
import axios from "axios";
import router from "@/router";

export default Vue.extend({
  components: {
    CalcStats,
  },
  mixins: [pokemonParams],
  computed: {
    isLogin(): boolean {
      return Boolean(this.$store.getters.accessToken);
    },
  },
  methods: {
    postPokemon(params): void {
      axios
        .post("/pokemons", params)
        .then((response) => {
          router.push(`/pokemons/${response.data.id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.login-alert {
  color: #fb8c00;
}
</style>
