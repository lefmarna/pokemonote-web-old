<template>
  <v-container>
    <v-alert v-if="!isLogin" outlined type="warning" border="left">
      計算結果の保存には、<router-link
        class="text-decoration-none login-alert"
        to="/login?redirect=/pokemons/new"
        >ログイン</router-link
      >が必要です。
    </v-alert>
    <CalcStats />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CalcStats from "@/components/templates/CalcStats.vue";

export default Vue.extend({
  components: {
    CalcStats,
  },
  computed: {
    isLogin(): boolean {
      return Boolean(this.$store.getters.accessToken);
    },
  },
});
</script>

<style lang="scss" scoped>
.login-alert {
  color: #fb8c00;
}
</style>
