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
      let parent = this.$parent;
      let n = "";
      let v = "";
      let stats = [
        parent.hp,
        parent.attack,
        parent.defence,
        parent.spAttack,
        parent.spDefence,
        parent.speed
      ];
      let ev = [
        parent.values[0].ev,
        parent.values[1].ev,
        parent.values[2].ev,
        parent.values[3].ev,
        parent.values[4].ev,
        parent.values[5].ev
      ];
      for (let i = 0, len = parent.values.length; i < len; i++) {
        if (ev[i] == 0) {
          if (i == 5) {
            n = n + `${stats[i]}`;
          } else {
            n = n + `${stats[i]}-`;
          }
        } else {
          if (i == 5) {
            n = n + `${stats[i]}(${ev[i]})`;
            v = v + `${parent.values[i].abbreviation}${ev[i]}`;
          } else {
            n = n + `${stats[i]}(${ev[i]})-`;
            v = v + `${parent.values[i].abbreviation}${ev[i]} `;
          }
        }
      }
      if (ev.some(value => value > 0)) {
        this.calcArea =
          `${parent.name} ${parent.nature}\n` +
          n +
          `\n${stats[0]}-${stats[1]}-${stats[2]}-${stats[3]}-${stats[4]}-${stats[5]}\n` +
          v +
          `\n${parent.physicalDurability + parent.specialDurability}-${
            parent.physicalDurability
          }-${parent.specialDurability}`;
      } else {
        this.calcArea =
          `${parent.name} ${parent.nature}\n` +
          n +
          `\n${parent.physicalDurability + parent.specialDurability}-${
            parent.physicalDurability
          }-${parent.specialDurability}`;
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
