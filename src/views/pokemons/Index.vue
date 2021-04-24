<template>
  <PokemonTable title="ポケモン一覧" :pokemons="pokemons" />
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import PokemonTable from "@/components/PokemonTable.vue";

export default Vue.extend({
  data: () => ({
    pokemons: [],
  }),
  components: {
    PokemonTable,
  },
  created() {
    axios
      .get("/pokemons")
      .then((response) => {
        // 努力値と実数値は1行にまとめる
        this.pokemons = response.data.map((pokemon: any) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
</script>
