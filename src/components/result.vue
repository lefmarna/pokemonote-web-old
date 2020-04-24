<template>
  <div class="position-relative">
    <textarea class="form-control" rows="5" v-model="calcArea"></textarea>
    <button
      class="btn btn-outline-secondary btn-sm position-absolute"
      v-on:click="result()"
    >
      保存する
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calcArea: ""
    };
  },
  methods: {
    result() {
      // 親要素を parent に代入
      let parent = this.$parent;
      // 実数値を取得
      let stats = [
        parent.hp,
        parent.attack,
        parent.defence,
        parent.spAttack,
        parent.spDefence,
        parent.speed
      ];
      // 努力値を取得
      let valuesCopy = [
        parent.values[0],
        parent.values[1],
        parent.values[2],
        parent.values[3],
        parent.values[4],
        parent.values[5]
      ];
      // 各行に出力する初期値を設定
      let line1 = `${parent.name} ${parent.nature}`;
      let line2 = "";
      let line3 = `${stats[0]}-${stats[1]}-${stats[2]}-${stats[3]}-${stats[4]}-${stats[5]}`;
      let line4 = "";
      let line5 = `${parent.physicalDurability + parent.specialDurability}-${
        parent.physicalDurability
      }-${parent.specialDurability}`;
      // 努力値が252とそれ以外の箇所に分け、それぞれ配列に格納
      const MaxEv = valuesCopy.filter(value => value.ev == 252);
      const NoMaxEv = valuesCopy.filter(
        value => value.ev != 252 && value.ev > 0
      );
      // 持ち物があれば、耐久指数の箇所に持ち物も出力する
      if (parent.item == "とつげきチョッキ") {
        line5 += "(チョッキ)";
      }
      if (parent.item == "しんかのきせき" && parent.evolution.length) {
        line5 += "(輝石)";
      }
      // 252振りの箇所が2箇所以上あれば、それを1箇所にまとめる
      if (MaxEv.length >= 2) {
        // 252振りの箇所は先に
        for (let i = 0, len = MaxEv.length; i < len; i++) {
          line4 += `${MaxEv[i].abbreviation}`;
        }
        line4 = line4 + "252";
        // 252振りでない箇所は後ろに
        for (let i = 0, len = NoMaxEv.length; i < len; i++) {
          if (NoMaxEv[i].ev) {
            line4 += ` ${NoMaxEv[i].abbreviation}${NoMaxEv[i].ev}`;
          }
        }
        // 努力値が振られているなら()で囲む
        for (let i = 0, len = parent.values.length; i < len; i++) {
          if (valuesCopy[i].ev == 0) {
            if (i == 0) {
              line2 += `${stats[i]}`;
            } else {
              line2 += `-${stats[i]}`;
            }
          } else {
            if (i == 0) {
              line2 += `${stats[i]}(${valuesCopy[i].ev})`;
            } else {
              line2 += `-${stats[i]}(${valuesCopy[i].ev})`;
            }
          }
        }
      } else {
        for (let i = 0, len = parent.values.length; i < len; i++) {
          if (valuesCopy[i].ev == 0) {
            if (i == 0) {
              line2 += `${stats[i]}`;
            } else {
              line2 += `-${stats[i]}`;
            }
          } else {
            if (!line4) {
              if (i == 0) {
                line2 += `${stats[i]}(${valuesCopy[i].ev})`;
              } else {
                line2 += `-${stats[i]}(${valuesCopy[i].ev})`;
              }
              line4 += `${parent.values[i].abbreviation}${valuesCopy[i].ev}`;
            } else {
              line2 += `-${stats[i]}(${valuesCopy[i].ev})`;
              line4 += ` ${parent.values[i].abbreviation}${valuesCopy[i].ev}`;
            }
          }
        }
      }
      // 努力値が無振りのときは努力値を出力しない
      if (valuesCopy.some(value => value.ev > 0)) {
        this.calcArea = `${line1}\n${line2}\n${line3}\n${line4}\n${line5}`;
      } else {
        this.calcArea = `${line1}\n${line2}\n${line5}`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.position-relative .btn {
  right: 1px;
  bottom: 1px;
}
</style>
