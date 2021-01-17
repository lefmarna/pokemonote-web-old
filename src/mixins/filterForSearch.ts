import Vue from "vue";

export default Vue.extend({
  methods: {
    // ひらがなをすべてカタカナに変換し、一致する結果を返すフィルター
    filterForSearch(item: { name: string }, queryText: string): boolean {
      // アイテム名のひらがなを全てカタカナに置き換える
      const itemName = item.name.replace(/[ぁ-ん]/g, (t) =>
        String.fromCharCode(t.charCodeAt(0) + 96)
      );
      // 入力されたひらがなを全てカタカナに置き換える
      const katakana = queryText.replace(/[ぁ-ん]/g, (t) =>
        String.fromCharCode(t.charCodeAt(0) + 96)
      );
      // 部分一致でフィルタリングする
      return (itemName || "").indexOf(katakana) > -1;
    },
  },
});
