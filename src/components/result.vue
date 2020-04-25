<template>
  <div class="position-relative">
    <textarea class="form-control" rows="5" v-model="calcArea"></textarea>
    <div class="position-absolute">
      <div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            v-model="attackCheck"
          />
          <label class="form-check-label" for="inlineCheckbox1">A</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            v-model="spAttackCheck"
          />
          <label class="form-check-label" for="inlineCheckbox2">C</label>
        </div>
      </div>
      <button class="btn btn-outline-secondary btn-sm" v-on:click="result()">
        保存する
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calcArea: "",
      attackCheck: true,
      spAttackCheck: true
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
      if (!this.attackCheck) {
        stats[1] = "*";
      }
      if (!this.spAttackCheck) {
        stats[3] = "*";
      }
      // 各行に出力する初期値を設定
      let line1 = `${parent.name} ${parent.nature}`;
      let line2 = "";
      let line3 = `${stats[0]}-${stats[1]}-${stats[2]}-${stats[3]}-${stats[4]}-${stats[5]}`;
      let line4 = "";
      let line5 = `${parent.physicalDurability + parent.specialDurability}-${
        parent.physicalDurability
      }-${parent.specialDurability}`;
      // 努力値が252とそれ以外の箇所に分け、それぞれ配列に格納
      let maxEv = valuesCopy.filter(value => value.ev == 252);
      let noMaxEv = valuesCopy.filter(value => value.ev != 252 && value.ev > 0);
      // 努力値が振られているなら()で囲む
      for (let i = 0, len = parent.values.length; i < len; i++) {
        if (i > 0) {
          line2 += "-";
        }
        line2 += String(stats[i]);
        if (valuesCopy[i].ev > 0) {
          line2 += `(${valuesCopy[i].ev})`;
        }
      }
      // 252振りの箇所が2箇所以上あれば、それを1箇所にまとめる
      if (maxEv.length >= 2) {
        // 252振りの箇所は先に
        for (let i = 0, len = maxEv.length; i < len; i++) {
          line4 += `${maxEv[i].initial}`;
        }
        line4 = line4 + "252";
        // 252振りでない箇所は後ろに
        for (let i = 0, len = noMaxEv.length; i < len; i++) {
          if (noMaxEv[i].ev) {
            line4 += ` ${noMaxEv[i].initial}${noMaxEv[i].ev}`;
          }
        }
        // 252振りの箇所が2箇所以下あれば、HABCDSの順に表示する
      } else {
        for (let i = 0, len = parent.values.length; i < len; i++) {
          if (valuesCopy[i].ev > 0) {
            if (line4) {
              line4 += " ";
            }
            line4 += parent.values[i].initial + valuesCopy[i].ev;
          }
        }
      }
      // 持ち物があれば、耐久指数の箇所に持ち物も出力する
      if (parent.item == "とつげきチョッキ") {
        line5 += "(チョッキ)";
      } else if (parent.item == "しんかのきせき" && parent.evolution.length) {
        line5 += "(輝石)";
      }
      // 無振りのときは努力値を出力しない
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
.position-relative .position-absolute {
  right: -8px;
  bottom: 0.5px;
}
</style>
