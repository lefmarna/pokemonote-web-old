<template>
  <v-container>
    <v-alert v-if="!isLogin" outlined type="warning" border="left">
      {{ alertTitle }}には、<router-link
        class="text-decoration-none login-alert"
        :to="`/login?redirect=${$route.fullPath}`"
        >ログイン</router-link
      >が必要です。
    </v-alert>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    alertTitle: {
      type: String,
    },
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
