import Vue from "vue";

export default Vue.extend({
  computed: {
    currentPokemon(): {
      no: number;
      name: string;
      form: string;
      ranks: string[];
      evolutions: number[];
      types: string[];
      abilities: string[];
      hiddenAbilities: string[];
      stats: {
        [key: string]: number;
      };
    } {
      return this.$store.getters.currentPokemon;
    },
    currentNature(): {
      id: number;
      name: string;
      stats: {
        [key: string]: number;
      };
    } {
      return this.$store.getters.currentNature;
    },
    lv: {
      get(): number {
        return this.$store.getters.lv;
      },
      set(value: number) {
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
        this.$store.commit("updateLv", value);
      },
    },
    stats(): {
      en: string;
      ja: string;
      abbreviation: string;
      individualValue: number | null;
      effortValue: number | null;
    }[] {
      return this.$store.getters.stats;
    },
  },
});
