<template>
  <div class="d-flex">
    <div>
      <v-text-field
        ref="lv"
        type="number"
        label="レベル"
        placeholder="1"
        :value="lv"
        @input="updateLv($event)"
        persistent-placeholder
      />
    </div>
    <div>
      <CalcButton
        buttonText="100"
        class="mb-1 btn-min-sm"
        @click.native="$emit('update', 100)"
      />
      <br />
      <CalcButton
        buttonText="50"
        class="btn-min-sm"
        @click.native="$emit('update', 50)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CalcButton from "@/components/molecules/CalcButton.vue";

export default Vue.extend({
  data: () => ({}),
  components: {
    CalcButton,
  },
  props: {
    lv: {
      // String型を許可しないと null のとき怒られる
      type: [Number, String],
      default: "",
    },
  },
  methods: {
    updateLv(value: number | null) {
      // レベルの上限を100、下限を1とする
      if (value > 100) {
        value = 100;
        // ここを「value < 1」にしてしまうと、一度消してから入力しようとした際に「1」が自動入力されるため、UI的によろしくない。そこで、"0から始まる数値"と"負の数"を正規表現を用いて検出するようにし、空白の際の自動入力はなくしつつも「0」以下の入力を「1」に繰り上げる処理を実現した。
      } else if (/^0|^\.|^-/.test(String(value))) {
        value = 1;
        // 小数点以下を削除する（勝手に0が入ってしまうのを防ぐため、空白を明示的に除外している）
      } else if (String(value) != "") {
        value = Math.floor(value);
      }
      // lazyValueはVuetifyでinputタグの中身の値を示す、ここに直接代入することでリアクティブに入力を更新することができる
      (this.$refs.lv as Vue & {
        lazyValue: number;
      }).lazyValue = value;
      this.$emit("update", value);
    },
  },
});
</script>
