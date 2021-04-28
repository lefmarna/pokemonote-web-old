<template>
  <div class="user" v-if="user">
    <!-- <v-avatar v-if="user.image" size="36px">
      <img alt="アイコン" :src="user.image" />
    </v-avatar> -->
    <PokemonTable :title="title" :pokemons="pokemons" />
  </div>
  <div v-else>ユーザー情報を読み込んでいます...</div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import PokemonTable from "@/components/PokemonTable.vue";

export type DataType = {
  user: any;
  pokemons: [];
};

export default Vue.extend({
  data: (): DataType => ({
    user: "",
    pokemons: [],
  }),
  props: { id: String },
  components: {
    PokemonTable,
  },
  computed: {
    title(): string {
      if (this.$store.getters.userName == this.user.username) {
        return "マイページ";
      } else {
        return `${this.user.nickname}さんの投稿`;
      }
    },
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
            this.user = response.data.user;
            this.user.image = response.data.image;
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
