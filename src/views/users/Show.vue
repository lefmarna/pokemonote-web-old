<template>
  <div>
    <p>ID：{{ id }}</p>
    <p>ユーザー名：{{ user.username }}</p>
    <p>表示名：{{ user.nickname }}</p>
    <v-avatar v-if="user.image" size="36px">
      <img alt="アイコン" :src="user.image" />
    </v-avatar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  data: () => ({
    user: {},
  }),
  props: { id: Number },
  // コンポーネントの更新ではライフサイクルの初期化を行わないため、createdではなくwatchで監視している
  watch: {
    id: {
      // immediate: true とすることで、初期描画時にもwatchが発火するようになる
      immediate: true,
      handler() {
        axios
          .get(`/users/${this.id}`)
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  },
});
</script>
