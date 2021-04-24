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
    <v-data-table :headers="headers" :items="pokemons" :search="search">
      <!-- v-slotを使うことで、ポケモン名にリンクを設定する -->
      <template v-slot:[`item.name`]="{ item }">
        <router-link :to="`/pokemons/${item.id}`">
          {{ item.name }}
        </router-link>
      </template>
      <!-- v-slotを使うことで、ユーザー名にリンクを設定する -->
      <template v-slot:[`item.user.nickname`]="{ item }">
        <router-link :to="`/users/${item.user_id}`">
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
});
</script>
