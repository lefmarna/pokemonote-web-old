<template>
  <div class="overflow-auto px-2">
    <updatesTemplate day="2020-04-20" content="サイト全体のデザインを変更" />
    <updatesTemplate
      day="2020-04-19"
      content="『ステータス計算機』において、進化先の存在しないポケモンであっても『しんかのきせき』にチェックを入れることができていた不具合を修正"
    />
    <updatesTemplate
      day="2020-04-18"
      content="『ステータス計算機』におけるヌケニンのHPを修正"
    />
  </div>
</template>

<script>
import updatesTemplate from "./updatesTemplate.vue";

export default {
  components: {
    updatesTemplate
  }
};
</script>

<style lang="scss">
h3 {
  position: relative;
  display: inline-block;
  padding: 0 55px;
}
h3:before,
h3:after {
  content: "";
  position: absolute;
  top: 50%;
  display: inline-block;
  width: 45px;
  height: 1px;
  background-color: black;
}

h3:before {
  left: 0;
}
h3:after {
  right: 0;
}

.overflow-auto {
  height: 280px;
}
</style>
