<template>
  <v-autocomplete
    :items="natureList"
    item-text="name"
    label="性格"
    :filter="hiraganaToKatakana"
    v-model="currentNature"
    no-data-text="性格が見つかりません。"
    auto-select-first
    return-object
  ></v-autocomplete>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    natureList(): {
      name: string;
      stats: {
        hp: number;
        attack: number;
        defence: number;
        spAttack: number;
        spDefence: number;
        speed: number;
      };
    }[] {
      return [
        {
          name: "いじっぱり",
          stats: {
            hp: 1.0,
            attack: 1.1,
            defence: 1.0,
            spAttack: 0.9,
            spDefence: 1.0,
            speed: 1.0,
          },
        },
        {
          name: "うっかりや",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.0,
            spAttack: 1.1,
            spDefence: 0.9,
            speed: 1.0,
          },
        },
        {
          name: "おくびょう",
          stats: {
            hp: 1.0,
            attack: 0.9,
            defence: 1.0,
            spAttack: 1.0,
            spDefence: 1.0,
            speed: 1.1,
          },
        },
        {
          name: "おだやか",
          stats: {
            hp: 1.0,
            attack: 0.9,
            defence: 1.0,
            spAttack: 1.0,
            spDefence: 1.1,
            speed: 1.0,
          },
        },
        {
          name: "おっとり",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 0.9,
            spAttack: 1.1,
            spDefence: 1.0,
            speed: 1.0,
          },
        },
        {
          name: "おとなしい",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 0.9,
            spAttack: 1.0,
            spDefence: 1.1,
            speed: 1.0,
          },
        },
        {
          name: "がんばりや",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.0,
            spAttack: 1.0,
            spDefence: 1.0,
            speed: 1.0,
          },
        },
        {
          name: "きまぐれ",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.0,
            spAttack: 1.0,
            spDefence: 1.0,
            speed: 1.0,
          },
        },
        {
          name: "さみしがり",
          stats: {
            hp: 1.0,
            attack: 1.1,
            defence: 0.9,
            spAttack: 1.0,
            spDefence: 1.0,
            speed: 1.0,
          },
        },
        {
          name: "しんちょう",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.0,
            spAttack: 0.9,
            spDefence: 1.1,
            speed: 1.0,
          },
        },
        {
          name: "すなお",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.0,
            spAttack: 1.0,
            spDefence: 1.0,
            speed: 1.0,
          },
        },
        {
          name: "ずぶとい",
          stats: {
            hp: 1.0,
            attack: 0.9,
            defence: 1.1,
            spAttack: 1.0,
            spDefence: 1.0,
            speed: 1.0,
          },
        },
        {
          name: "せっかち",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 0.9,
            spAttack: 1.0,
            spDefence: 1.0,
            speed: 1.1,
          },
        },
        {
          name: "なまいき",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.0,
            spAttack: 1.0,
            spDefence: 1.1,
            speed: 0.9,
          },
        },
        {
          name: "てれや",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.0,
            spAttack: 1.0,
            spDefence: 1.0,
            speed: 1.0,
          },
        },
        {
          name: "のうてんき",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.1,
            spAttack: 1.0,
            spDefence: 0.9,
            speed: 1.0,
          },
        },
        {
          name: "のんき",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.1,
            spAttack: 1.0,
            spDefence: 1.0,
            speed: 0.9,
          },
        },
        {
          name: "ひかえめ",
          stats: {
            hp: 1.0,
            attack: 0.9,
            defence: 1.0,
            spAttack: 1.1,
            spDefence: 1.0,
            speed: 1.0,
          },
        },
        {
          name: "まじめ",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.0,
            spAttack: 1.0,
            spDefence: 1.0,
            speed: 1.0,
          },
        },
        {
          name: "むじゃき",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.0,
            spAttack: 1.0,
            spDefence: 0.9,
            speed: 1.1,
          },
        },
        {
          name: "やんちゃ",
          stats: {
            hp: 1.0,
            attack: 1.1,
            defence: 1.0,
            spAttack: 1.0,
            spDefence: 0.9,
            speed: 1.0,
          },
        },
        {
          name: "ゆうかん",
          stats: {
            hp: 1.0,
            attack: 1.1,
            defence: 1.0,
            spAttack: 1.0,
            spDefence: 1.0,
            speed: 0.9,
          },
        },
        {
          name: "ようき",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.0,
            spAttack: 0.9,
            spDefence: 1.0,
            speed: 1.1,
          },
        },
        {
          name: "れいせい",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.0,
            spAttack: 1.1,
            spDefence: 1.0,
            speed: 0.9,
          },
        },
        {
          name: "わんぱく",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.1,
            spAttack: 0.9,
            spDefence: 1.0,
            speed: 1.0,
          },
        },
      ];
    },
    currentNature: {
      get(): {
        currentNature: {
          name: string;
          stats: {
            [key: string]: number;
          };
        };
      } {
        return this.$store.getters.currentNature;
      },
      set(selectedNature): void {
        this.$store.commit("updateCurrentNature", selectedNature);
        (document.activeElement as HTMLElement).blur(); // 性格を更新後、フォーカスを外す
      },
    },
  },
  methods: {
    // 元々の検索ワード、または、カタカナに変換後の検索ワードと一致する結果を返すフィルター
    hiraganaToKatakana(item: { name: string }, queryText: string): boolean {
      const itemName = item.name;
      // ひらがなをカタカナに置き換える
      const katakana = queryText.replace(/[ぁ-ん]/g, (t) =>
        String.fromCharCode(t.charCodeAt(0) + 96)
      );
      // 複数条件を指定するケースでは、"test"を使ったほうがパフォーマンスが良いと思われたが、動的な正規表現はどうやら重い？らしく、"無難にindexOf"で検索するようにした。
      return (
        (itemName || "").indexOf(queryText) > -1 ||
        (itemName || "").indexOf(katakana) > -1
      );
    },
  },
});
</script>
