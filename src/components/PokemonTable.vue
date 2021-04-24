<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="pokemonTable" :search="search">
      <!-- v-slotを使うことで、ポケモン名にリンクを設定する -->
      <template v-slot:[`item.name`]="{ item }">
        <router-link :to="`/pokemons/${item.id}`">
          {{ item.name }}
        </router-link>
      </template>
      <!-- v-slotを使うことで、ユーザー名にリンクを設定する -->
      <template v-slot:[`item.user.nickname`]="{ item }">
        <router-link :to="`/users/${item.user.username}`">
          {{ item.user.nickname }}
        </router-link>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    search: "",
    headers: [
      { text: "ポケモン名", sortable: false, value: "name" },
      { text: "レベル", sortable: false, value: "lv" },
      { text: "性格", sortable: false, value: "nature" },
      { text: "ステータス", sortable: false, value: "stats" },
      { text: "投稿者", sortable: false, value: "user.nickname" },
    ],
  }),
  props: {
    title: String,
    pokemons: Array,
  },
  computed: {
    pokemonTable(): any {
      // 努力値と実数値は1行にまとめる
      return this.pokemons.map((pokemon: any) => {
        let result = "";

        // 努力値
        const effortValues = [
          pokemon.hp_ev,
          pokemon.attack_ev,
          pokemon.defence_ev,
          pokemon.sp_attack_ev,
          pokemon.sp_defence_ev,
          pokemon.speed_ev,
        ];

        // 実数値
        const realNumbers = [
          pokemon.hp,
          pokemon.attack,
          pokemon.defence,
          pokemon.sp_attack,
          pokemon.sp_defence,
          pokemon.speed,
        ];

        for (let i = 0, len = effortValues.length; i < len; i++) {
          // HPの前にはハイフンをつけない
          if (i > 0) {
            result += "-";
          }
          // 実数値を代入
          result += String(realNumbers[i]);
          // 努力値が振られていれば()で囲んで代入
          if (effortValues[i] > 0 && realNumbers[i] != "*") {
            result += `(${effortValues[i]})`;
          }
        }
        // statsというキーを作り、結果を代入
        pokemon.stats = result;
        return pokemon;
      });
    },
  },
});
</script>
