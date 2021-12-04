<template>
  <v-container class="pokemon" v-if="pokemon && pokemonDetails">
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
    <!-- <p>表示名：{{ pokemon.user.name }}</p> -->
    <!-- マイページのときは、編集・削除ボタンを表示する -->
    <v-row v-if="pokemon.user.username == authUserName">
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
import { computed, defineComponent, ref, watch } from "@vue/composition-api";
import axios from "axios";
import router from "@/router";
import { Pokemon } from "@/types/pokemon";
import store from "@/store";

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const pokemon = ref();

    // ポケモンの詳細情報をVuexから取得する
    const pokemonDetails = computed(() => {
      const pokemonData: Pokemon[] = store.getters.pokemonData;
      return pokemonData.find((data) => data.name === pokemon.value.name);
    });

    const authUserName = computed(() => {
      return store.getters.authUser.username;
    });

    //  コンポーネントの更新ではライフサイクルの初期化を行わないため、watchで監視する形で実装している
    watch(
      () => props.id,
      (id) => {
        axios
          .get(`/pokemons/${id}`)
          .then((response) => {
            pokemon.value = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      { immediate: true }
    );

    const editItem = (item: any): void => {
      if (item.user.username === authUserName.value) {
        router.push(`/pokemons/${item.id}/edit`);
      } else {
        router.push("/");
      }
    };

    const deleteItem = (id: number): void => {
      axios
        .delete(`/pokemons/${id}`)
        .then(() => {
          router.push(`/users/${authUserName.value}`);
        })
        .catch(() => {
          router.push("/");
        });
    };

    return {
      authUserName,
      pokemon,
      pokemonDetails,
      editItem,
      deleteItem,
    };
  },
});
</script>
