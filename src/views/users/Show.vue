<template>
  <div class="user" v-if="user">
    <p>ID：{{ id }}</p>
    <p>ユーザー名：{{ user.username }}</p>
    <p>表示名：{{ user.nickname }}</p>
    <v-avatar v-if="user.image" size="36px">
      <img alt="アイコン" :src="user.image" />
    </v-avatar>
    <PokemonTable :title="`${user.nickname}さんの投稿`" :pokemons="pokemons" />
  </div>
  <div v-else>ユーザー情報を読み込んでいます...</div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import PokemonTable from "@/components/PokemonTable.vue";

export default Vue.extend({
  data: () => ({
    user: [],
    pokemons: [],
  }),
  props: { id: Number },
  components: {
    PokemonTable,
  },
  // コンポーネントの更新ではライフサイクルの初期化を行わないため、createdではなくwatchで監視している
  watch: {
    id: {
      // immediate: true とすることで、初期描画時にもwatchが発火するようになる
      immediate: true,
      handler() {
        axios
          .get(`/users/${this.id}`)
          .then((response) => {
            this.user = JSON.parse(response.data.user);
            this.user.image = response.data.image;
            this.pokemons = JSON.parse(response.data.pokemons);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  },
});
</script>
