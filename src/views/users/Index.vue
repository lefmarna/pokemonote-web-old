<template>
  <v-card>
    <v-card-title>
      ユーザー一覧
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="users" :search="search">
      <!-- v-slotを使うことで、nicknameにリンクを設定する -->
      <template v-slot:[`item.nickname`]="{ item }">
        <router-link :to="`/users/${item.username}`">
          {{ item.nickname }}
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
    users: [],
    pokemons: [],
    search: "",
    headers: [
      { text: "ID", sortable: false, value: "id" },
      { text: "ユーザー名", sortable: false, value: "username" },
      { text: "表示名", sortable: false, value: "nickname" },
    ],
  }),
  created() {
    axios
      .get("/users")
      .then((response) => {
        this.users = response.data.users;
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
</script>
