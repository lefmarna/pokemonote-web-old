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
import { defineComponent, reactive, ref, watch } from "@vue/composition-api";
import CalcStatsTemplate from "@/components/templates/CalcStatsTemplate.vue";
import axios from "axios";
import router from "@/router";
import { Nature, PokemonData, Stat } from "@/types/index";
import { natureData, pokemonData } from "@/utils/store";

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
    const currentPokemon = ref<PokemonData>({
      no: 567,
      name: "アーケオス",
      form: "",
      ranks: [],
      evolutions: [],
      types: ["いわ", "ひこう"],
      abilities: ["よわき"],
      hiddenAbilities: [],
      stats: {
        hp: 75,
        attack: 140,
        defence: 65,
        spAttack: 112,
        spDefence: 65,
        speed: 110,
      },
    });

    const currentNature = ref<Nature>({
      name: "がんばりや",
      stats: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
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
              (pokemon: PokemonData) => pokemon.name == data.name
            );
            currentNature.value = natureData.value.find(
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
