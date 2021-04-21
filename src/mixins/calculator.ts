import Vue from "vue";

export default Vue.extend({
  methods: {
    // 小数点を切り捨てる、また、nullや負の数には初期値を返していく
    numberToInt(value: number, defaultValue = 0): number {
      if (String(value) === "" || value < defaultValue) {
        return defaultValue;
      } else {
        return Math.floor(value);
      }
    },
    // 代入する値を検証して返す
    valueVerification(value: number, max: number): number | null {
      if (value > max) {
        return max;
      } else if (value <= 0) {
        return null;
      } else {
        return Math.floor(value);
      }
    },
  },
});
