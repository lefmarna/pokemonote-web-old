<template>
  <v-btn color="error" elevation="2" @click="unsubscribe">退会</v-btn>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";
import axios from "axios";
import router from "@/router";
import store from "@/store";

export default defineComponent({
  setup() {
    const authUserName = computed(() => {
      return store.getters.authUser.username;
    });

    const unsubscribe = () => {
      axios.delete(`/users/${authUserName.value}`).then(() => {
        // Vuexから認証情報を削除する
        store.commit("updateAuthUser", {
          username: "",
          nickname: "",
        });
        // ログインページにリダイレクトする
        router.replace("/login");
      });
    };

    return {
      authUserName,
      unsubscribe,
    };
  },
});
</script>
