<template>
  <div class="user" v-if="user">
    <p>ID：{{ id }}</p>
    <p>ユーザー名：{{ user.username }}</p>
    <p>表示名：{{ user.nickname }}</p>
    <v-avatar v-if="user.image" size="36px">
      <img alt="アイコン" :src="user.image" />
    </v-avatar>
    <v-data-table :headers="headers" :items="pokemons" :search="search">
      <!-- v-slotを使うことで、nicknameにリンクを設定する -->
      <!-- <template v-slot:[`item.lv`]="{ item }">
        <router-link :to="`/pokemons/${item.id}`">
          {{ item.lv }}
        </router-link>
      </template> -->
    </v-data-table>
  </div>
  <div v-else>ユーザー情報を読み込んでいます...</div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  data: () => ({
    user: [],
    pokemons: [],
    search: "",
    headers: [
      { text: "ポケモン名", sortable: false, value: "id" },
      { text: "性格", sortable: false, value: "hp_iv" },
      { text: "ステータス", sortable: false, value: "hp_ev" },
      { text: "投稿者", sortable: false, value: "speed_iv" },
    ],
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
            this.pokemons = response.data.pokemons;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  },
});
</script>
