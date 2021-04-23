<template>
  <v-card>
    <v-card-title>
      ポケモン一覧
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
      <!-- v-slotを使うことで、nameにリンクを設定する -->
      <template v-slot:[`item.name`]="{ item }">
        <router-link :to="`/pokemons/${item.id}`">
          {{ item.name }}
        </router-link>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  data: () => ({
    pokemons: [],
    search: "",
    headers: [
      { text: "ポケモン名", sortable: false, value: "id" },
      { text: "性格", sortable: false, value: "username" },
      { text: "ステータス", sortable: false, value: "nickname" },
      { text: "投稿者", sortable: false, value: "nickname" },
    ],
  }),
  created() {
    axios
      .get("/pokemons")
      .then((response) => {
        this.pokemons = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
</script>
