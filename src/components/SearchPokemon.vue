<template>
  <v-autocomplete
    :items="pokemonList"
    item-text="name"
    label="ポケモン名"
    :filter="hiraganaToKatakana"
    v-model="currentPokemon"
    no-data-text="ポケモンが見つかりません。"
    class="mt-3"
    clearable
    auto-select-first
    return-object
  ></v-autocomplete>
</template>

<script>
import PokemonData from "@/components/pokemon_data.json";

export default {
  data: () => ({
    pokemonList: PokemonData, // ポケモンのデータはjsonファイルにまとめてあるため、そちらから取得する
  }),
  computed: {
    currentPokemon: {
      get() {
        return this.$store.getters.currentPokemon;
      },
      set(selectedPokemon) {
        this.$store.commit("updateCurrentPokemon", selectedPokemon);
        document.activeElement.blur(); // ポケモンを更新後、フォーカスを外す
      },
    },
  },
  methods: {
    // 元々の検索ワード、または、カタカナに変換後の検索ワードと一致する結果を返すフィルター
    hiraganaToKatakana(item, queryText) {
      // ひらがなをカタカナに置き換える
      const katakana = queryText.replace(/[ぁ-ん]/g, (t) =>
        String.fromCharCode(t.charCodeAt(0) + 96)
      );
      // 複数条件を指定するケースでは、"test"を使ったほうがパフォーマンスが良いと思われたが、動的な正規表現はどうやら重い？らしく、"無難にindexOf"で検索するようにした。
      return (
        (item.name || "").indexOf(queryText) > -1 ||
        (item.name || "").indexOf(katakana) > -1
      );
    },
  },
};
</script>
