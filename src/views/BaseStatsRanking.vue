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
import Vue from "vue";

export interface DataType {
  displayRankPokemons: { [key: string]: boolean };
  removeStats: { [key: string]: boolean };
}

export default Vue.extend({
  data: (): DataType => ({
    // 【特別なポケモンを表示する】
    displayRankPokemons: {
      legendary: false,
      mythical: false,
      mega: false,
      NotInPokedex: false,
    },
    // 【除外するステータス】
    removeStats: {
      attack: false,
      spAttack: false,
      speed: false,
    },
  }),
  computed: {
    pokemonList(): {
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
    }[] {
      return this.$store.getters.pokemonData;
    },
    /* ループによる処理を可能にするために、チェックボックスとテキストを対応づけている */
    // 【特別なポケモンを表示する】
    ranksCheckboxes(): { [key: string]: string }[] {
      return [
        { text: "伝説", value: "legendary" },
        { text: "幻", value: "mythical" },
        { text: "メガシンカ", value: "mega" },
        { text: "剣盾に登場しないポケモン", value: "NotInPokedex" },
      ];
    },
    // 【除外するステータス】
    statsCheckboxes(): { [key: string]: string }[] {
      return [
        { text: "攻撃", value: "attack" },
        { text: "特攻", value: "spAttack" },
        { text: "素早さ", value: "speed" },
      ];
    },
    /* ここまで */

    // v-data-tableに表示させる内容とオプションの設定
    headers(): { [key: string]: string }[] {
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
      if (this.removeStats.attack) {
        delete dataTableList[2].value;
      }
      if (this.removeStats.spAttack) {
        delete dataTableList[4].value;
      }
      if (this.removeStats.speed) {
        delete dataTableList[6].value;
      }
      return dataTableList;
    },
    // ステータスの合計(total)を計算して返す
    pokemonListInTotal() {
      // 直接データを書き換えるわけにはいかないので、フィルター用の変数に格納しておく
      let pokemonList = Array.from(this.pokemonList);
      // mapメソッドの中ではthisが使えないため、定数に格納しておく
      const removeStats = this.removeStats;

      // 『メガシンカ』にチェックがついていないときは表示させない
      if (!this.displayRankPokemons.mega) {
        pokemonList = pokemonList.filter(
          (pokemonData: any) =>
            !pokemonData.ranks.some((rank: string) => rank == "mega")
        );
      }
      // 『伝説』にチェックがついていないときは表示させない
      if (!this.displayRankPokemons.legendary) {
        pokemonList = pokemonList.filter(
          (pokemonData: any) =>
            !pokemonData.ranks.some((rank: string) => rank == "legendary")
        );
      }
      // 『幻』にチェックがついていないときは表示させない
      if (!this.displayRankPokemons.mythical) {
        pokemonList = pokemonList.filter(
          (pokemonData: any) =>
            !pokemonData.ranks.some((rank: string) => rank == "mythical")
        );
      }
      // 『剣盾に登場しないポケモン』にチェックがついていないときは表示させない
      if (!this.displayRankPokemons.NotInPokedex) {
        pokemonList = pokemonList.filter(
          (pokemonData: any) =>
            !pokemonData.ranks.some((rank: string) => rank == "NotInPokedex")
        );
      }
      // 全てのオブジェクトで合計(total)を計算する
      pokemonList = pokemonList.map((array: any) => {
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
      return pokemonList;
    },
  },
  methods: {
    // 【特別なポケモンを表示する】のオンオフを切り替える
    rankChange(value: string): void {
      this.$set(
        this.displayRankPokemons,
        value,
        !this.displayRankPokemons[value]
      );
    },
    // 【除外するステータス】のオンオフを切り替える
    statsChange(value: string): void {
      this.$set(this.removeStats, value, !this.removeStats[value]);
    },
  },
});
</script>
