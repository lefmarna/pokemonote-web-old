<template>
  <v-autocomplete
    :items="pokemonList"
    item-text="name"
    label="ポケモン名"
    :filter="katakanaToHiragana"
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
    // ひらがなをカタカナに変換して検索するフィルター
    katakanaToHiragana(item, queryText) {
      const itemName = item.name.toLowerCase();
      const hiragana = queryText
        .toLowerCase()
        .replace(/[ぁ-ん]/g, (t) => String.fromCharCode(t.charCodeAt(0) + 96));
      // 元々の検索ワード、または、ひらがなに変換後の検索ワードと一致する結果を部分一致で表示する
      return (
        (itemName || "").indexOf(queryText) > -1 ||
        (itemName || "").indexOf(hiragana) > -1
      );
    },
  },
};
</script>
