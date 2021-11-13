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
      />
    </v-card-title>
    <!-- key属性を付与することで、状態が変わったときにレンダリングを可能にする -->
    <v-data-table
      class="pokemon-table"
      :headers="headers"
      :items="pokemonTable"
      :search="search"
      :key="tableKey"
      :loading="!pokemons.length"
      loading-text="Now Loading..."
    >
      <!-- ステータスにコピペボタンを追加する -->
      <template v-slot:[`item.stats`]="{ item }">
        {{ item.stats }}
        <v-icon small @click="writeToClipboard(item.stats)"
          >mdi-content-copy</v-icon
        >
      </template>
      <!-- ポケモン名にリンクを設定する -->
      <template v-slot:[`item.name`]="{ item }">
        <router-link :to="`/pokemons/${item.id}`">
          {{ item.name }}
        </router-link>
      </template>
      <template v-slot:[`item.user.nickname`]="{ item }">
        <!-- マイページのときは、編集・削除ボタンを表示する -->
        <div v-if="item.user.username == authUserName">
          <v-icon @click="editItem(item)"> mdi-pencil </v-icon>
          <v-icon @click="deleteItem(item.id)" class="ml-3">
            mdi-delete
          </v-icon>
        </div>
        <!-- マイページでないときは、ユーザー名にリンクを設定する -->
        <div v-else>
          <router-link :to="`/users/${item.user.username}`">
            {{ item.user.nickname }}
          </router-link>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import router from "@/router";
import axios from "axios";

export default Vue.extend({
  data: () => ({
    search: "",
    tableKey: 0,
  }),
  props: {
    title: String,
    pokemons: Array,
  },
  computed: {
    authUserName(): string {
      return this.$store.getters.authUser.username;
    },
    headers() {
      let tableHeader = [
        { text: "ポケモン名", sortable: false, value: "name" },
        { text: "レベル", sortable: false, value: "lv" },
        { text: "性格", sortable: false, value: "nature" },
        { text: "ステータス", sortable: false, value: "stats" },
        { text: "投稿者", sortable: false, value: "user.nickname" },
      ];
      if (this.title == "マイページ") {
        tableHeader[4].text = "編集・削除";
      }
      return tableHeader;
    },
    pokemonTable(): any {
      return this.pokemons;
    },
  },
  methods: {
    writeToClipboard(clipText: string): void {
      navigator.clipboard.writeText(clipText).catch((e) => {
        console.error(e);
      });
    },
    editItem(item: any): void {
      if (item.user.username == this.authUserName) {
        router.push(`/pokemons/${item.id}/edit`);
      } else {
        router.push("/");
      }
    },
    deleteItem(id: number): void {
      axios
        .delete(`/pokemons/${id}`)
        .then(() => {
          // 削除するポケモンのデータを探す
          const deletePokemon = this.pokemonTable.findIndex(
            (pokemon: any) => pokemon.id == id
          );
          // 配列から要素を削除
          this.pokemonTable.splice(deletePokemon, 1);
          // keyの値を変更することで、再レンダリングさせる
          this.tableKey++;
        })
        .catch(() => {
          router.push("/");
        });
    },
  },
});
</script>

<style lang="scss">
.pokemon-table .v-data-table__mobile-table-row {
  line-height: 2em;
}

.pokemon-table .v-data-table__mobile-row {
  flex-direction: column;
  align-items: flex-start;
}
</style>
