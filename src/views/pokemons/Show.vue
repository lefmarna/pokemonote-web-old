<template>
  <v-container class="pokemon" v-if="pokemon">
    ポケモンの詳細ページは、現在コンテンツの表示を調整中です。
    <v-row>No. {{ pokemonDetails.no }}</v-row>
    <v-row>{{ pokemonDetails.name }}</v-row>
    <v-row>
      <ul v-for="(types, index) in pokemonDetails.types" :key="index">
        <li>{{ types }}</li>
      </ul>
    </v-row>
    <v-row>
      <ul v-for="(abilities, index) in pokemonDetails.abilities" :key="index">
        <li>{{ abilities }}</li>
      </ul>
    </v-row>
    <v-row> {{ pokemonDetails.hiddenAbilities }}</v-row>
    <v-row
      >{{ pokemonDetails.stats.hp }}-{{ pokemonDetails.stats.attack }}-{{
        pokemonDetails.stats.defence
      }}-{{ pokemonDetails.stats.spAttack }}-{{
        pokemonDetails.stats.spDefence
      }}-{{ pokemonDetails.stats.speed }}</v-row
    >

    <!-- {{ pokemonDetails.types[0] }} -->
    {{ pokemonDetails }}
    <!-- <p>表示名：{{ pokemon.user.nickname }}</p> -->
    <!-- マイページのときは、編集・削除ボタンを表示する -->
    <v-row v-if="pokemon.user.username == userName">
      <v-col align="center">
        <v-btn color="accent" @click="editItem(pokemon)">編集</v-btn>
      </v-col>
      <v-col align="center">
        <v-btn color="error" @click="deleteItem(pokemon.id)">削除</v-btn>
      </v-col>
    </v-row>
    <!-- マイページでないときは、ユーザー名にリンクを設定する -->
    <div v-else>
      投稿者：<router-link :to="`/users/${pokemon.user.username}`">
        {{ pokemon.user.nickname }}
      </router-link>
    </div>
  </v-container>
  <div v-else>ポケモン情報を読み込んでいます...</div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import router from "@/router";
import { Pokemon } from "@/types/pokemon";

export interface DataType {
  pokemon: any;
}

export default Vue.extend({
  data: (): DataType => ({
    pokemon: "",
  }),
  computed: {
    // ポケモンの詳細情報をVuexから取得する
    pokemonDetails() {
      const pokemonData: Pokemon[] = this.$store.getters.pokemonData;
      return pokemonData.find((pokemon) => pokemon.name == this.pokemon.name);
    },
    userName() {
      return this.$store.getters.userName;
    },
  },
  props: { id: Number },
  // コンポーネントの更新ではライフサイクルの初期化を行わないため、createdではなくwatchで監視している
  watch: {
    id: {
      // immediate: true とすることで、初期描画時にもwatchが発火するようになる
      immediate: true,
      handler() {
        axios
          .get(`/pokemons/${this.id}`)
          .then((response) => {
            this.pokemon = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  },
  methods: {
    editItem(item: any): void {
      if (item.user.username == this.userName) {
        router.push(`/pokemons/${item.id}/edit`);
      } else {
        router.push("/");
      }
    },
    deleteItem(id: number): void {
      axios
        .delete(`/pokemons/${id}`)
        .then(() => {
          router.push(`/users/${this.userName}`);
        })
        .catch(() => {
          router.push("/");
        });
    },
  },
});
</script>
