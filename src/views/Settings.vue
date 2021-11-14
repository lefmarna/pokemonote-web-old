<template>
  <v-btn color="error" elevation="2" @click="unsubscribe">退会</v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import router from "@/router";
import axios from "axios";

export default Vue.extend({
  computed: {
    authUserName() {
      return this.$store.getters.authUser.username;
    },
  },
  methods: {
    unsubscribe() {
      axios.delete(`/users/${this.authUserName}`).then(() => {
        // Vuexから認証情報を削除する
        this.$store.commit("updateAuthUser", {
          username: "",
          nickname: "",
        });
        // ログインページにリダイレクトする
        router.replace("/login");
      });
    },
  },
});
</script>
