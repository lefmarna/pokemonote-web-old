<template>
  <v-autocomplete
    :items="items"
    item-text="name"
    :label="label"
    :filter="filterForSearch"
    :no-data-text="`${itemName}が見つかりません。`"
    :clearable="clearable"
    auto-select-first
    return-object
    :value="selectItem"
    @input="updateItem"
  ></v-autocomplete>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    items: {
      type: Array,
    },
    label: {
      type: String,
    },
    itemName: {
      type: String,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    selectItem: {
      type: Object,
    },
  },
  computed: {
    // ローマ字の変換表
    $_romanConversionTable() {
      return {
        a: "ア",
        i: "イ",
        u: "ウ",
        e: "エ",
        o: "オ",
        k: {
          a: "カ",
          i: "キ",
          u: "ク",
          e: "ケ",
          o: "コ",
          y: { a: "キャ", i: "キィ", u: "キュ", e: "キェ", o: "キョ" },
        },
        s: {
          a: "サ",
          i: "シ",
          u: "ス",
          e: "セ",
          o: "ソ",
          h: { a: "シャ", i: "シ", u: "シュ", e: "シェ", o: "ショ" },
          y: { a: "キャ", i: "キィ", u: "キュ", e: "キェ", o: "キョ" },
        },
        t: {
          a: "タ",
          i: "チ",
          u: "ツ",
          e: "テ",
          o: "ト",
          h: { a: "テャ", i: "ティ", u: "テュ", e: "テェ", o: "テョ" },
          y: { a: "チャ", i: "チィ", u: "チュ", e: "チェ", o: "チョ" },
          s: { a: "ツァ", i: "ツィ", u: "ツ", e: "ツェ", o: "ツォ" },
        },
        c: {
          a: "カ",
          i: "シ",
          u: "ク",
          e: "セ",
          o: "コ",
          h: { a: "チャ", i: "チ", u: "チュ", e: "チェ", o: "チョ" },
          y: { a: "チャ", i: "チィ", u: "チュ", e: "チェ", o: "チョ" },
        },
        q: {
          a: "クァ",
          i: "クィ",
          u: "ク",
          e: "クェ",
          o: "クォ",
        },
        n: {
          a: "ナ",
          i: "ニ",
          u: "ヌ",
          e: "ネ",
          o: "ノ",
          n: "ン",
          y: { a: "ニャ", i: "ニィ", u: "ニュ", e: "ニェ", o: "ニョ" },
        },
        h: {
          a: "ハ",
          i: "ヒ",
          u: "フ",
          e: "ヘ",
          o: "ホ",
          y: { a: "ヒャ", i: "ヒィ", u: "ヒュ", e: "ヒェ", o: "ヒョ" },
        },
        f: {
          a: "ファ",
          i: "フィ",
          u: "フ",
          e: "フェ",
          o: "フォ",
          y: { a: "フャ", u: "フュ", o: "フョ" },
        },
        m: {
          a: "マ",
          i: "ミ",
          u: "ム",
          e: "メ",
          o: "モ",
          y: { a: "ミャ", i: "ミィ", u: "ミュ", e: "ミェ", o: "ミョ" },
        },
        y: { a: "ヤ", i: "イ", u: "ユ", e: "イェ", o: "ヨ" },
        r: {
          a: "ラ",
          i: "リ",
          u: "ル",
          e: "レ",
          o: "ロ",
          y: { a: "リャ", i: "リィ", u: "リュ", e: "リェ", o: "リョ" },
        },
        w: { a: "ワ", i: "ウィ", u: "ウ", e: "ウェ", o: "ヲ" },
        g: {
          a: "ガ",
          i: "ギ",
          u: "グ",
          e: "ゲ",
          o: "ゴ",
          y: { a: "ギャ", i: "ギィ", u: "ギュ", e: "ギェ", o: "ギョ" },
        },
        z: {
          a: "ザ",
          i: "ジ",
          u: "ズ",
          e: "ゼ",
          o: "ゾ",
          y: { a: "ジャ", i: "ジィ", u: "ジュ", e: "ジェ", o: "ジョ" },
        },
        j: {
          a: "ジャ",
          i: "ジ",
          u: "ジュ",
          e: "ジェ",
          o: "ジョ",
          y: { a: "ジャ", i: "ジィ", u: "ジュ", e: "ジェ", o: "ジョ" },
        },
        d: {
          a: "ダ",
          i: "ヂ",
          u: "ヅ",
          e: "デ",
          o: "ド",
          h: { a: "デャ", i: "ディ", u: "デュ", e: "デェ", o: "デョ" },
          y: { a: "ヂャ", i: "ヂィ", u: "ヂュ", e: "ヂェ", o: "ヂョ" },
        },
        b: {
          a: "バ",
          i: "ビ",
          u: "ブ",
          e: "ベ",
          o: "ボ",
          y: { a: "ビャ", i: "ビィ", u: "ビュ", e: "ビェ", o: "ビョ" },
        },
        v: {
          a: "ヴァ",
          i: "ヴィ",
          u: "ヴ",
          e: "ヴェ",
          o: "ヴォ",
          y: { a: "ヴャ", i: "ヴィ", u: "ヴュ", e: "ヴェ", o: "ヴョ" },
        },
        p: {
          a: "パ",
          i: "ピ",
          u: "プ",
          e: "ペ",
          o: "ポ",
          y: { a: "ピャ", i: "ピィ", u: "ピュ", e: "ピェ", o: "ピョ" },
        },
        x: {
          a: "ァ",
          i: "ィ",
          u: "ゥ",
          e: "ェ",
          o: "ォ",
          y: {
            a: "ャ",
            i: "ィ",
            u: "ュ",
            e: "ェ",
            o: "ョ",
          },
          t: {
            u: "ッ",
            s: {
              u: "ッ",
            },
          },
        },
        l: {
          a: "ァ",
          i: "ィ",
          u: "ゥ",
          e: "ェ",
          o: "ォ",
          y: {
            a: "ャ",
            i: "ィ",
            u: "ュ",
            e: "ェ",
            o: "ョ",
          },
          t: {
            u: "ッ",
            s: {
              u: "ッ",
            },
          },
        },
      };
    },
  },
  methods: {
    // Itemが変更されたときに親のイベントを発火させる
    updateItem($event: any): void {
      if ($event) {
        this.$emit("update", $event);
        (document.activeElement as HTMLElement).blur(); // 性格を更新後、フォーカスを外す
      }
    },
    // ひらがなをすべてカタカナに変換し、一致する結果を返すフィルター
    filterForSearch(item: any, queryText: string): boolean {
      // アイテム名のひらがなを全てカタカナに置き換える
      const itemName = item.name.replace(/[ぁ-ん]/g, (t) =>
        String.fromCharCode(t.charCodeAt(0) + 96)
      );
      // 入力されたひらがなを全てカタカナに、括弧やハイフンも検索元に合わせる形で置き換える
      let katakana = queryText
        .replace(/[ぁ-ん]/g, (t) => String.fromCharCode(t.charCodeAt(0) + 96))
        .replace(/[-]/g, "ー")
        .replace(/[（]/g, "(")
        .replace(/[）]/g, ")");
      // 入力されたローマ字を全てカタカナに書き換える
      katakana = this.$_convertRomanToKana(katakana);
      // 部分一致でフィルタリングする
      return (itemName || "").indexOf(katakana) > -1;
    },
    // ローマ字をカタカナに変換する関数
    $_convertRomanToKana(queryText: string) {
      const LowerCaseText = queryText.toLowerCase(); // 大文字を小文字に変更
      let result = ""; // result：最終的に返すテキストを格納していく変数
      let tmp = ""; // tmp：子音のみが入力されている状態など、カタカナに変換できない場合に一時的に格納しておくための変数
      let node: any = this.$_romanConversionTable; // eslint-disable-line
      const push = (char: string, toRoot = true) => {
        result += char;
        tmp = "";
        if (toRoot) {
          node = this.$_romanConversionTable;
        }
      };
      for (let i = 0, len = LowerCaseText.length; i < len; i++) {
        const char = LowerCaseText.charAt(i); // i番目の文字をcharに格納する
        if (char.match(/[a-z]/)) {
          // charがアルファベットならばカタカナへの変換を行い、nextへ格納する
          if (char in node) {
            const next = node[char];
            if (typeof next === "string") {
              push(next);
            } else {
              tmp += queryText.charAt(i);
              node = next;
            }
            continue;
          }
          const prev = LowerCaseText.charAt(i - 1);
          if (prev && (prev === "n" || prev === char)) {
            // 促音やnへの対応
            push(prev === "n" ? "ン" : "ッ", false);
          }
          if (
            node !== this.$_romanConversionTable &&
            char in this.$_romanConversionTable
          ) {
            // 今のノードがルート以外だった場合、仕切り直してチェックする
            push(tmp);
            i--;
            continue;
          }
        }
        push(tmp + char);
      }
      tmp = tmp.replace(/n$/, "ン"); // 末尾のnはンに変換する
      push(tmp);
      return result;
    },
  },
});
</script>
