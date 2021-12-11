<template>
  <CalcStatsTemplate
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
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
} from "@vue/composition-api";
import CalcStatsTemplate from "@/components/templates/CalcStatsTemplate.vue";
import axios from "axios";
import router from "@/router";
import { Pokemon } from "@/types/pokemon";
import { Nature } from "@/types/nature";
import { Stat } from "@/types/stat";
import store from "@/store";

export default defineComponent({
  components: {
    CalcStatsTemplate,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const currentPokemon = ref<Pokemon>({
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
    });

    const currentNature = ref<Nature>({
      name: "がんばりや",
      stats: {
        hp: 1.0,
        attack: 1.0,
        defence: 1.0,
        spAttack: 1.0,
        spDefence: 1.0,
        speed: 1.0,
      },
    });

    const lv = ref(50);

    const stats = reactive<Stat[]>([
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
    ]);

    const pokemonData = computed((): Pokemon[] => {
      return store.getters.pokemonData;
    });

    const natureDate = computed((): Nature[] => {
      return store.getters.natureData;
    });

    const updatePokemon = (params): void => {
      axios
        .patch(`/pokemons/${props.id}`, params)
        .then(() => {
          router.push(`/pokemons/${props.id}`);
        })
        .catch(() => {
          router.push("/");
        });
    };

    watch(
      () => props.id,
      (id) => {
        axios
          .get(`/pokemons/${id}/edit`)
          .then((response) => {
            const data = response.data.data;
            currentPokemon.value = pokemonData.value.find(
              (pokemon: Pokemon) => pokemon.name == data.name
            );
            currentNature.value = natureDate.value.find(
              (nature: Nature) => nature.name == data.nature
            );
            lv.value = data.lv;
            stats.forEach((stat: Stat, index: number) => {
              stat.individualValue = data.individualValues[index];
              stat.effortValue = data.effortValues[index];
            });
          })
          .catch(() => {
            router.push("/");
          });
      },
      { immediate: true }
    );
    return {
      currentPokemon,
      currentNature,
      lv,
      stats,
      updatePokemon,
    };
  },
});
</script>
