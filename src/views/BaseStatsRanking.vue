<template>
  <v-container>
    <Title text="種族値ランキング（ポケモン剣盾）" />
    <v-row>
      <v-col cols="12" md="6">
        <p>【特別なポケモンを表示する】</p>
        <div class="d-flex">
          <v-checkbox
            v-for="rank in ranksCheckboxes"
            :key="rank.value"
            :input-value="isShowRanks[rank.value]"
            @change="rankChange(rank.value)"
            :label="rank.text"
            class="pr-2 mt-0"
            dense
          ></v-checkbox>
        </div>
        <v-divider v-if="$vuetify.breakpoint.xs" />
      </v-col>
      <v-col cols="12" md="6">
        <p>【除外するステータス】</p>
        <div class="d-flex">
          <v-checkbox
            v-for="stats in statsCheckboxes"
            :key="stats.value"
            :input-value="isNotShowStats[stats.value]"
            @change="statsChange(stats.value)"
            :label="stats.text"
            class="pr-2 mt-0"
            dense
          ></v-checkbox>
        </div>
        <v-divider v-if="$vuetify.breakpoint.xs" />
      </v-col>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="pokemonListInTotal"
          :items-per-page="20"
          :footer-props="{ itemsPerPageOptions: [20, 50, 100, -1] }"
          class="elevation-1"
          sort-by="total"
          sort-desc
          must-sort
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "@vue/composition-api";
import store from "@/store";
import { PokemonData } from "@/types/index";

export default defineComponent({
  setup() {
    // 【特別なポケモンを表示する】
    const isShowRanks = reactive({
      legendary: false,
      mythical: false,
      mega: false,
      NotInPokedex: false,
    });
    const ranksCheckboxes = computed(() => {
      return [
        { text: "伝説", value: "legendary" },
        { text: "幻", value: "mythical" },
        { text: "メガシンカ", value: "mega" },
        { text: "剣盾に登場しないポケモン", value: "NotInPokedex" },
      ];
    });

    // 【除外するステータス】
    const isNotShowStats = reactive({
      attack: false,
      spAttack: false,
      speed: false,
    });
    const statsCheckboxes = computed(() => {
      return [
        { text: "攻撃", value: "attack" },
        { text: "特攻", value: "spAttack" },
        { text: "素早さ", value: "speed" },
      ];
    });

    const pokemonList = computed((): PokemonData[] => {
      return store.getters.pokemonData;
    });

    // v-data-tableに表示させる内容とオプションの設定
    const headers = computed(() => {
      const dataTableList = [
        { text: "ポケモン名", value: "name", align: "start", width: "30%" },
        { text: "ＨＰ", value: "stats.hp", align: "end", width: "10%" },
        { text: "攻撃", value: "stats.attack", align: "end", width: "10%" },
        { text: "防御", value: "stats.defence", align: "end", width: "10%" },
        { text: "特攻", value: "stats.spAttack", align: "end", width: "10%" },
        { text: "特防", value: "stats.spDefence", align: "end", width: "10%" },
        { text: "素早", value: "stats.speed", align: "end", width: "10%" },
        { text: "合計", value: "total", align: "end", width: "10%" },
      ];
      if (isNotShowStats.attack) dataTableList[2].value = "";
      if (isNotShowStats.spAttack) dataTableList[4].value = "";
      if (isNotShowStats.speed) dataTableList[6].value = "";
      return dataTableList;
    });

    const filterPokemonListByRank = (
      pokemonData: PokemonData[],
      excludeRank: string
    ) => {
      return pokemonData.filter(
        (pokemon) => !pokemon.ranks.some((rank: string) => rank === excludeRank)
      );
    };

    const pokemonListInTotal = computed(() => {
      // 直接データを書き換えるわけにはいかないので、フィルター用の変数に格納しておく
      let result = pokemonList.value;

      // 『メガシンカ』にチェックがついていないときは表示させない
      if (!isShowRanks.mega) result = filterPokemonListByRank(result, "mega");
      // 『伝説』にチェックがついていないときは表示させない
      if (!isShowRanks.legendary)
        result = filterPokemonListByRank(result, "legendary");
      // 『幻』にチェックがついていないときは表示させない
      if (!isShowRanks.mythical)
        result = filterPokemonListByRank(result, "mythical");
      // 『剣盾に登場しないポケモン』にチェックがついていないときは表示させない
      if (!isShowRanks.NotInPokedex)
        result = filterPokemonListByRank(result, "NotInPokedex");

      // 全てのオブジェクトで合計(total)を計算する
      result.forEach((array) => {
        const stats = Object.values(array.stats);
        array.total = stats.reduce((sum, value, index) => {
          if (isNotShowStats.attack && index === 1) return sum;
          if (isNotShowStats.spAttack && index === 3) return sum;
          if (isNotShowStats.speed && index === 5) return sum;
          sum += value;
          return sum;
        }, 0);
        return array;
      });
      return result;
    });

    // 【特別なポケモンを表示する】のオンオフを切り替える
    const rankChange = (value: string): void => {
      isShowRanks[value] = !isShowRanks[value];
    };

    // 【除外するステータス】のオンオフを切り替える
    const statsChange = (value: string): void => {
      isNotShowStats[value] = !isNotShowStats[value];
    };

    return {
      isShowRanks,
      headers,
      pokemonListInTotal,
      ranksCheckboxes,
      isNotShowStats,
      statsCheckboxes,
      rankChange,
      statsChange,
    };
  },
});
</script>
