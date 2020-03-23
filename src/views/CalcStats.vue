<template>
  <div class="about">
    <h1>工事中です</h1>
    <h1>{{ lv }}</h1>
    <div>
      レベル：
      <input type="number" id="lv" min="1" max="100" v-model.number="lv" />
      <button class="btn btn-outline-secondary btn-sm" v-on:click="lv=50">50</button>
      <button class="btn btn-outline-secondary btn-sm" v-on:click="lv=100">100</button>
      {{ hp }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CalcStats",
  data() {
    return {
      lv: 50,
      nature: "いじっぱり",
      values: [
        { name: "ＨＰ", iv: 31, ev: 0, bs: 108, calc: "hp" },
        { name: "攻撃", iv: 31, ev: 0, bs: 130, calc: "attack" },
        { name: "防御", iv: 31, ev: 0, bs: 95, calc: "defence" },
        { name: "特攻", iv: 31, ev: 0, bs: 80, calc: "spAttack" },
        { name: "特防", iv: 31, ev: 0, bs: 85, calc: "spDefence" },
        { name: "素早", iv: 31, ev: 0, bs: 102, calc: "speed" }
      ]
    };
  },
  computed: {
    hp() {
      return (
        Math.floor(
          ((this.values[0].bs * 2 + this.values[0].iv + Math.floor(this.values[0].ev / 4)) *
            this.lv) /
            100
        ) +
        10 +
        this.lv
      )
    }
  }
};
</script>
