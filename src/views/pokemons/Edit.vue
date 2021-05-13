<template>
  <v-container>
    <CalcStats
      title="ポケモン編集"
      :currentPokemon.sync="currentPokemon"
      :currentNature.sync="currentNature"
      :lv.sync="lv"
      :stats.sync="stats"
      @submit="updatePokemon"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CalcStats from "@/components/templates/CalcStats.vue";
import axios from "axios";
import router from "@/router";

export type DataType = {
  response: any;
  currentPokemon: {
    no: number;
    name: string;
    form: string;
    ranks: string[];
    evolutions: number[];
    types: string[];
    abilities: string[];
    hiddenAbilities: string[];
    stats: {
      [key: string]: number;
    };
  };
  currentNature: {
    name: string;
    stats: {
      [key: string]: number;
    };
  };
  lv: number;
  stats: {
    en: string;
    ja: string;
    abbreviation: string;
    individualValue: number | null;
    effortValue: number | null;
  }[];
};

export default Vue.extend({
  components: {
    CalcStats,
  },
  data: (): DataType => ({
    response: "",
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
    isLogin(): boolean {
      return Boolean(this.$store.getters.accessToken);
    },
    pokemonData(): {
      no: number;
      name: string;
      form: string;
      ranks: string[];
      evolutions: number[];
      types: string[];
      abilities: string[];
      hiddenAbilities: string[];
      stats: {
        [key: string]: number;
      };
    } {
      return this.$store.getters.pokemonData;
    },
    natureData(): {
      name: string;
      stats: {
        [key: string]: number;
      };
    }[] {
      return this.$store.getters.natureData;
    },
  },
  methods: {
    // ポケモンのデータを投稿する
    updatePokemon(params): void {
      axios
        .patch(`/pokemons/${this.id}`, params)
        .then((response) => {
          router.push(`/pokemons/${response.data.id}`);
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
            const data = response.data;
            this.response = data;
            this.currentPokemon = this.pokemonData.find(
              (pokemon) => pokemon.name == data.name
            );
            this.currentNature = this.$store.getters.natureData.find(
              (nature) => nature.name == data.nature
            );
            this.lv = data.lv;
            const individualValues: number[] = [
              data.hp_iv,
              data.attack_iv,
              data.defence_iv,
              data.sp_attack_iv,
              data.sp_defence_iv,
              data.speed_iv,
            ];
            const effortValues: number[] = [
              data.hp_ev,
              data.attack_ev,
              data.defence_ev,
              data.sp_attack_ev,
              data.sp_defence_ev,
              data.speed_ev,
            ];
            this.stats.map((stat: any, index: number) => {
              stat.individualValue = individualValues[index];
              stat.effortValue = effortValues[index];
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
