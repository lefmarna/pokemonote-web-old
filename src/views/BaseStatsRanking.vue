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
            :input-value="displayRankPokemons[rank.value]"
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
            :input-value="removeStats[stats.value]"
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

export default defineComponent({
  setup() {
    // 【特別なポケモンを表示する】
    const displayRankPokemons = reactive({
      legendary: false,
      mythical: false,
      mega: false,
      NotInPokedex: false,
    });

    // 【除外するステータス】
    const removeStats = reactive({
      attack: false,
      spAttack: false,
      speed: false,
    });

    const pokemonList = computed(
      (): {
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
        total?: number;
      }[] => {
        return store.getters.pokemonData;
      }
    );

    /* ループによる処理を可能にするために、チェックボックスとテキストを対応づけている */
    // 【特別なポケモンを表示する】
    const ranksCheckboxes = computed(() => {
      return [
        { text: "伝説", value: "legendary" },
        { text: "幻", value: "mythical" },
        { text: "メガシンカ", value: "mega" },
        { text: "剣盾に登場しないポケモン", value: "NotInPokedex" },
      ];
    });

    // 【除外するステータス】
    const statsCheckboxes = computed(() => {
      return [
        { text: "攻撃", value: "attack" },
        { text: "特攻", value: "spAttack" },
        { text: "素早さ", value: "speed" },
      ];
    });
    /* ここまで */

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
      if (removeStats.attack) {
        delete dataTableList[2].value;
      }
      if (removeStats.spAttack) {
        delete dataTableList[4].value;
      }
      if (removeStats.speed) {
        delete dataTableList[6].value;
      }
      return dataTableList;
    });

    const pokemonListInTotal = computed(() => {
      // 直接データを書き換えるわけにはいかないので、フィルター用の変数に格納しておく
      let result = Array.from(pokemonList.value);

      // 『メガシンカ』にチェックがついていないときは表示させない
      if (!displayRankPokemons.mega) {
        result = result.filter(
          (pokemonData: any) =>
            !pokemonData.ranks.some((rank: string) => rank == "mega")
        );
      }
      // 『伝説』にチェックがついていないときは表示させない
      if (!displayRankPokemons.legendary) {
        result = result.filter(
          (pokemonData: any) =>
            !pokemonData.ranks.some((rank: string) => rank == "legendary")
        );
      }
      // 『幻』にチェックがついていないときは表示させない
      if (!displayRankPokemons.mythical) {
        result = result.filter(
          (pokemonData: any) =>
            !pokemonData.ranks.some((rank: string) => rank == "mythical")
        );
      }
      // 『剣盾に登場しないポケモン』にチェックがついていないときは表示させない
      if (!displayRankPokemons.NotInPokedex) {
        result = result.filter(
          (pokemonData: any) =>
            !pokemonData.ranks.some((rank: string) => rank == "NotInPokedex")
        );
      }
      // 全てのオブジェクトで合計(total)を計算する
      result = result.map((array: any) => {
        // statsの各数値のみを抽出し、配列に格納する
        const stats = Object.values(array.stats);
        // 配列の要素数が変わってしまうため、後ろから順に削除していく必要がある
        if (removeStats.speed) {
          stats.splice(5, 1);
        }
        if (removeStats.spAttack) {
          stats.splice(3, 1);
        }
        if (removeStats.attack) {
          stats.splice(1, 1);
        }
        // 配列の中の整数を全て合計して返す
        array.total = stats.reduce((sum: number, value) => {
          sum += Number(value);
          return sum;
        }, 0);
        return array;
      });
      return result;
    });

    // 【特別なポケモンを表示する】のオンオフを切り替える
    const rankChange = (value: string): void => {
      displayRankPokemons[value] = !displayRankPokemons[value];
    };

    // 【除外するステータス】のオンオフを切り替える
    const statsChange = (value: string): void => {
      removeStats[value] = !removeStats[value];
    };

    return {
      displayRankPokemons,
      headers,
      pokemonListInTotal,
      ranksCheckboxes,
      removeStats,
      statsCheckboxes,
      rankChange,
      statsChange,
    };
  },
});
</script>
