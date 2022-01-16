<template>
  <div>
    <LoginAlert alertTitle="計算結果の保存" />
    <CalcStatsTemplate
      title="ステータス計算機"
      buttonText="投稿する"
      :currentPokemon.sync="currentPokemon"
      :currentNature.sync="currentNature"
      :lv.sync="lv"
      :stats.sync="stats"
      @submit="postPokemon"
      @updateEffortValue="updateEffortValue"
      @updateIndividualValue="updateIndividualValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { LoginAlert } from "@/components/molecules";
import { CalcStatsTemplate } from "@/components/templates";
import axios from "axios";
import router from "@/router";
import { currentNature, currentPokemon, lv, stats } from "@/utils/store";
import store from "@/store";

export default defineComponent({
  components: {
    LoginAlert,
    CalcStatsTemplate,
  },
  setup() {
    const postPokemon = async (params): Promise<void> => {
      try {
        const response = await axios.post("/pokemons", params);
        router.push(`/pokemons/${response.data.data.id}`);
      } catch (error) {
        console.log(error);
      }
    };

    const updateEffortValue = (value: number, index: number) => {
      store.commit("updateEffortValue", { value, index });
    };

    const updateIndividualValue = (value: number, index: number) => {
      store.commit("updateIndividualValue", { value, index });
    };

    return {
      currentNature,
      currentPokemon,
      lv,
      stats,
      postPokemon,
      updateEffortValue,
      updateIndividualValue,
    };
  },
});
</script>
