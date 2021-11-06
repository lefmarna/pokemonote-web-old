<template>
  <CalcStats
    title="ポケモン編集"
    buttonText="更新する"
    :currentPokemon.sync="currentPokemon"
    :currentNature.sync="currentNature"
    :lv.sync="lv"
    :stats.sync="stats"
    @submit="updatePokemon"
  />
</template>

<script lang="ts">
import Vue from "vue";
import CalcStats from "@/components/templates/CalcStats.vue";
import axios from "axios";
import router from "@/router";
import { Pokemon } from "@/types/pokemon";
import { Nature } from "@/types/nature";
import { Stat } from "@/types/stat";

export interface DataType {
  currentPokemon: Pokemon;
  currentNature: Nature;
  lv: number;
  stats: Stat[];
}

export default Vue.extend({
  components: {
    CalcStats,
  },
  data: (): DataType => ({
    currentPokemon: {
      no: 645,
      name: "ランドロス(霊獣)",
      form: "れいじゅうフォルム",
      ranks: [],
      evolutions: [],
      types: ["じめん", "ひこう"],
      abilities: ["いかく"],
      hiddenAbilities: [],
      stats: {
        hp: 89,
        attack: 145,
        defence: 90,
        spAttack: 105,
        spDefence: 80,
        speed: 91,
      },
    },
    currentNature: {
      name: "がんばりや",
      stats: {
        hp: 1.0,
        attack: 1.0,
        defence: 1.0,
        spAttack: 1.0,
        spDefence: 1.0,
        speed: 1.0,
      },
    },
    lv: 50,
    stats: [
      {
        en: "hp",
        ja: "ＨＰ",
        abbreviation: "H",
        individualValue: 31,
        effortValue: null,
      },
      {
        en: "attack",
        ja: "こうげき",
        abbreviation: "A",
        individualValue: 31,
        effortValue: null,
      },
      {
        en: "defence",
        ja: "ぼうぎょ",
        abbreviation: "B",
        individualValue: 31,
        effortValue: null,
      },
      {
        en: "spAttack",
        ja: "とくこう",
        abbreviation: "C",
        individualValue: 31,
        effortValue: null,
      },
      {
        en: "spDefence",
        ja: "とくぼう",
        abbreviation: "D",
        individualValue: 31,
        effortValue: null,
      },
      {
        en: "speed",
        ja: "すばやさ",
        abbreviation: "S",
        individualValue: 31,
        effortValue: null,
      },
    ],
  }),
  computed: {
    pokemonData(): Pokemon[] {
      return this.$store.getters.pokemonData;
    },
    natureData(): Nature[] {
      return this.$store.getters.natureData;
    },
  },
  methods: {
    // ポケモンのデータを投稿する
    updatePokemon(params): void {
      axios
        .patch(`/pokemons/${this.id}`, params)
        .then(() => {
          router.push(`/pokemons/${this.id}`);
        })
        .catch(() => {
          router.push("/");
        });
    },
  },
  props: { id: Number },
  watch: {
    id: {
      // immediate: true とすることで、初期描画時にもwatchが発火するようになる
      immediate: true,
      handler() {
        axios
          .get(`/pokemons/${this.id}/edit`)
          .then((response) => {
            const data = response.data.data;
            this.currentPokemon = this.pokemonData.find(
              (pokemon: Pokemon) => pokemon.name == data.name
            );
            this.currentNature = this.$store.getters.natureData.find(
              (nature: Nature) => nature.name == data.nature
            );
            this.lv = data.lv;
            this.stats.map((stat: Stat, index: number) => {
              stat.individualValue = data.individualValues[index];
              stat.effortValue = data.effortValues[index];
            });
          })
          .catch(() => {
            router.push("/");
          });
      },
    },
  },
});
</script>
