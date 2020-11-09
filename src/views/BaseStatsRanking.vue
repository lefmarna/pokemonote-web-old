<template>
  <v-container class="contents">
    <h1 class="title font-weight-bold my-2">
      種族値ランキング（ポケモン剣盾）
    </h1>
    <v-divider />
    <v-row>
      <v-col cols="12" md="6">
        <p>【除外するポケモン】</p>
        <div class="d-flex">
          <v-checkbox
            v-model="removeLegendary"
            class="pr-2 mt-0"
            label="伝説"
            dense
          ></v-checkbox>
          <v-checkbox
            v-model="removeMythical"
            class="pr-2 mt-0"
            label="幻"
            dense
          ></v-checkbox>
          <v-checkbox
            v-model="removeMega"
            class="pr-2 mt-0"
            label="メガシンカ"
            dense
          ></v-checkbox>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <p>【除外するステータス】</p>
        <div class="d-flex">
          <v-checkbox
            v-model="removeAttack"
            class="pr-2 mt-0"
            label="攻撃"
            dense
          ></v-checkbox>
          <v-checkbox
            v-model="removeSpAttack"
            class="pr-2 mt-0"
            label="特攻"
            dense
          ></v-checkbox>
          <v-checkbox
            v-model="removeSpeed"
            class="pr-2 mt-0"
            label="素早さ"
            dense
          ></v-checkbox>
        </div>
      </v-col>
      <v-col>
        <v-data-table
          style="border-top: thin solid rgba(0, 0, 0, 0.12);"
          :headers="headers"
          :items="pokemonListInTotal"
          :items-per-page="10"
          class="elevation-1"
          sort-by="total"
          sort-desc
          multi-sort
          dense
        ></v-data-table>
      </v-col>
    </v-row>
    <Adsense
      data-ad-client="ca-pub-3240586325286249"
      data-ad-slot="3353369882"
    ></Adsense>
  </v-container>
</template>

<script>
import PokemonData from "@/components/pokemon_data.json";

export default {
  name: "BaseStatsRanking",
  data: () => ({
    pokemonList: PokemonData, // ポケモンのデータはjsonファイルにまとめてあるため、そちらから取得する
    // 除外するポケモン
    removeLegendary: false,
    removeMythical: false,
    removeMega: false,
    // 除外するステータス
    removeAttack: false,
    removeSpAttack: false,
    removeSpeed: false,
  }),
  computed: {
    headers() {
      let dataTableList = [
        { text: "ポケモン名", value: "name", align: "start", width: "30%" },
        { text: "ＨＰ", value: "stats.hp", align: "end", width: "10%" },
        { text: "攻撃", value: "stats.attack", align: "end", width: "10%" },
        { text: "防御", value: "stats.defence", align: "end", width: "10%" },
        { text: "特攻", value: "stats.spAttack", align: "end", width: "10%" },
        { text: "特防", value: "stats.spDefence", align: "end", width: "10%" },
        { text: "素早", value: "stats.speed", align: "end", width: "10%" },
        { text: "合計", value: "total", align: "end", width: "10%" },
      ];
      if (this.removeAttack) {
        dataTableList[2].value = "";
      }
      if (this.removeSpAttack) {
        dataTableList[4].value = "";
      }
      if (this.removeSpeed) {
        dataTableList[6].value = "";
      }
      return dataTableList;
    },
    pokemonListInTotal() {
      let PokemonDataList = this.pokemonList;
      // mapメソッドの中ではthisが使えないため、変数に格納しておく
      let removeAttack = this.removeAttack;
      let removeSpAttack = this.removeSpAttack;
      let removeSpeed = this.removeSpeed;
      // ステータスの合計を求め、totalに代入する
      PokemonDataList.map(function(array) {
        let stats = Object.values(array.stats);
        // 配列の要素数が変わってしまうため、後ろから順に削除していく必要がある
        if (removeSpeed) {
          stats.splice(5, 1);
        }
        if (removeSpAttack) {
          stats.splice(3, 1);
        }
        if (removeAttack) {
          stats.splice(1, 1);
        }
        // 配列の中の整数を全て合計して返す
        array.total = stats.reduce((sum, value) => {
          if (Number.isInteger(value)) {
            sum += value;
          }
          return sum;
        }, 0);
        return array;
      });
      return PokemonDataList;
    },
  },
};
</script>
