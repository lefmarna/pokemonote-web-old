<template>
  <div class="user" v-if="user">
    <!-- <v-avatar v-if="user.icon" size="36px">
      <img alt="アイコン" :src="user.icon" />
    </v-avatar> -->
    <PokemonTable :title="title" :pokemons="pokemons" />
  </div>
  <div v-else>ユーザー情報を読み込んでいます...</div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import PokemonTable from "@/components/templates/PokemonTable.vue";

export interface DataType {
  user: any;
  pokemons: [];
}

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
      if (this.$store.getters.authUser.id == this.user.id) {
        return "マイページ";
      } else {
        return `${this.user.name}さんの投稿`;
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
            const data = response.data.data;
            this.user = data.user;
            // this.user.icon = response.data.icon;
            this.pokemons = data.pokemons;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  },
});
</script>
