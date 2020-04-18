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
      let valuesCopy = [
        parent.values[0],
        parent.values[1],
        parent.values[2],
        parent.values[3],
        parent.values[4],
        parent.values[5]
      ];
      let maxEvCount = valuesCopy.filter(value => value.ev == 252);
      let noMaxEvCount = valuesCopy.filter(
        value => value.ev != 252 && value.ev > 0
      );
      if (maxEvCount.length >= 2) {
        for (let i = 0, len = maxEvCount.length; i < len; i++) {
          v = v + `${maxEvCount[i].abbreviation}`;
        }
        v = v + "252";
        for (let i = 0, len = noMaxEvCount.length; i < len; i++) {
          if (noMaxEvCount[i].ev) {
            v = v + ` ${noMaxEvCount[i].abbreviation}${noMaxEvCount[i].ev}`;
          }
        }

        for (let i = 0, len = parent.values.length; i < len; i++) {
          if (valuesCopy[i].ev == 0) {
            if (i == 0) {
              n = n + `${stats[i]}`;
            } else {
              n = n + `-${stats[i]}`;
            }
          } else {
            if (i == 0) {
              n = n + `${stats[i]}(${valuesCopy[i].ev})`;
            } else {
              n = n + `-${stats[i]}(${valuesCopy[i].ev})`;
            }
          }
        }
      } else {
        for (let i = 0, len = parent.values.length; i < len; i++) {
          if (valuesCopy[i].ev == 0) {
            if (i == 0) {
              n = n + `${stats[i]}`;
            } else {
              n = n + `-${stats[i]}`;
            }
          } else {
            if (i == 0) {
              n = n + `${stats[i]}(${valuesCopy[i].ev})`;
              v = v + `${parent.values[i].abbreviation}${valuesCopy[i].ev}`;
            } else {
              n = n + `-${stats[i]}(${valuesCopy[i].ev})`;
              v = v + ` ${parent.values[i].abbreviation}${valuesCopy[i].ev}`;
            }
          }
        }
      }
      if (valuesCopy.some(value => value.ev > 0)) {
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
