<template>
  <div class="overflow-auto px-2">
        <updatesTemplate
      day="2020-04-25"
      content="『ステータス計算機』の保存用エリアに、不要箇所のチェック項目（『こうげき(A)』と『とくこう(C)』のみ）を追加しました。"
    />
    <updatesTemplate
      day="2020-04-24"
      content="『ステータス計算機』で[保存する]のボタンを押した際に「とつげきチョッキ」や「しんかのきせき」にチェックを入れていたかどうかも出力するようにしました。"
    />
    <updatesTemplate
      day="2020-04-23"
      content="トップページのデザインが『利用規約』のデザインにも影響を及ぼしていた不具合を修正しました。"
      content2="『ステータス計算機』をスマホで表示した際のレイアウトを少し変更しました。"
    />
    <updatesTemplate
      day="2020-04-22"
      content="『ステータス計算機』におけるポケモン入力の候補選択を、キーボードの上下キーで移動できるようにしました。"
    />
    <updatesTemplate
      day="2020-04-20"
      content="サイト全体のデザインを変更しました。"
    />
    <updatesTemplate
      day="2020-04-19"
      content="『ステータス計算機』において、進化先の存在しないポケモンであっても『しんかのきせき』にチェックを入れることができていた不具合を修正しました。"
    />
    <updatesTemplate
      day="2020-04-18"
      content="『ステータス計算機』におけるヌケニンのHPを修正しました。"
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

<style lang="scss" scoped>
.overflow-auto {
  height: 280px;
}
</style>
