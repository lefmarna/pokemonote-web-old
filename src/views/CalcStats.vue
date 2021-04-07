<template>
  <v-container class="contents">
    <Title text="ステータス計算機（ポケモン剣盾）" />
    <v-row no-gutters>
      <v-col cols="12" md="6" class="d-flex">
        <v-container :class="$vuetify.breakpoint.xs ? 'px-0' : ''">
          <SearchPokemon />
          <v-row>
            <v-col cols="4" class="d-flex">
              <div>
                <v-text-field
                  ref="lv"
                  type="number"
                  label="レベル"
                  placeholder="1"
                  v-model="lv"
                ></v-text-field>
              </div>
              <div>
                <CalcButton
                  buttonText="100"
                  class="mb-1 btn-min-sm"
                  @click.native="lv = 100"
                />
                <br />
                <CalcButton
                  buttonText="50"
                  class="btn-min-sm"
                  @click.native="lv = 50"
                />
              </div>
            </v-col>
            <v-col cols="8">
              <SearchNature />
            </v-col>
          </v-row>
          <v-divider />
          <div class="statsTable">
            <v-row v-for="(stat, index) in stats" :key="stat.en">
              <v-col
                cols="2"
                :class="[
                  'justify-center',
                  {
                    'text-danger': currentNature.stats[stat.en] == 1.1,
                    'text-primary': currentNature.stats[stat.en] == 0.9,
                  },
                ]"
              >
                <v-text-field
                  label="種族値"
                  placeholder="0"
                  :value="
                    `${stat.abbreviation}${currentPokemon.stats[stat.en]}`
                  "
                  disabled
                ></v-text-field>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    ref="individualValue"
                    type="number"
                    label="個体値"
                    placeholder="0"
                    :value="stats[index].individualValue"
                    @input="updateIndividualValue($event, stat.en, index)"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="31"
                    class="mb-1 btn-min-xs"
                    @click.native="stats[index].individualValue = 31"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-xs"
                    @click.native="stats[index].individualValue = null"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    ref="effortValue"
                    type="number"
                    label="努力値"
                    placeholder="0"
                    :value="stats[index].effortValue"
                    @input="updateEffortValue($event, stat.en, index)"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="252"
                    class="mb-1 btn-min-sm"
                    @click.native="stats[index].effortValue = 252"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-sm"
                    @click.native="stats[index].effortValue = null"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <!-- 努力値が自動更新されることによって実数値の入力を妨げてしまうため、実数値はinputではなくchangeで発火させている
                  なお、Vuetifyではv-modelのlazy修飾子をサポートしていないため、:valueと@changeで分けて書く必要がある -->
                  <v-text-field
                    ref="realNumbers"
                    type="number"
                    :label="stats[index].ja"
                    :value="realNumbers[index]"
                    @change="setStats($event, stat.en, index)"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="▲"
                    class="mb-1 btn-min-xs"
                    @click.native="statPlus(stat.en)"
                  />
                  <br />
                  <CalcButton
                    buttonText="▼"
                    class="btn-min-xs"
                    @click.native="statMinus(stat.en)"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row class="font-weight-bold">
              <v-col cols="2" class="d-flex justify-center">
                <p class="mb-0">{{ totalBaseStats }}</p>
              </v-col>
              <v-col cols="3" class="d-flex justify-center">
                <span class="pr-1" :class="totalIvCheck">{{ totalIv }}</span>
              </v-col>
              <v-col class="d-flex justify-center">
                <span class="pr-1" :class="totalEvCheck">{{ totalEv }}</span
                >/&nbsp;510
              </v-col>
              <v-col class="d-flex justify-center">
                {{ totalStats }}
              </v-col>
            </v-row>
            <v-row class="pb-3">
              <v-col class="hiddenPower" align-self="center">
                <p class="mb-0">めざパ：{{ hiddenPower }}</p>
              </v-col>
              <v-col align-self="center">
                <v-btn
                  color="danger"
                  elevation="2"
                  class="centered-input"
                  outlined
                  small
                  @click.native="resetEffortValue"
                  >努力値リセット</v-btn
                >
              </v-col>
              <v-col align-self="center">
                <v-btn
                  color="primary"
                  elevation="2"
                  class="centered-input"
                  outlined
                  small
                  @click.native="durabilityAdjustment"
                  >耐久調整</v-btn
                >
              </v-col>
            </v-row>
          </div>
          <v-divider v-if="$vuetify.breakpoint.xs" />
        </v-container>
      </v-col>
      <v-col cols="12" md="6" class="d-flex">
        <v-divider
          v-if="!$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
          vertical
        />
        <v-container :class="$vuetify.breakpoint.xs ? 'pa-0' : ''">
          <v-row>
            <v-col cols="6" class="py-0" align-self="center">
              <p class="mb-2">
                総合耐久：{{ physicalDurability + specialDurability }}
              </p>
              <p class="mb-2" style="padding-left: 2em;">
                物理：{{ physicalDurability }}
              </p>
              <p class="mb-0" style="padding-left: 2em;">
                特殊：{{ specialDurability }}
              </p>
            </v-col>
            <v-col cols="6" class="py-0" align-self="center">
              <v-radio-group v-model="itemGroup">
                <v-radio label="持ち物なし" value="持ち物なし"></v-radio>
                <v-radio
                  label="とつげきチョッキ"
                  value="とつげきチョッキ"
                ></v-radio>
                <v-radio
                  label="しんかのきせき"
                  value="しんかのきせき"
                  :disabled="
                    this.$store.getters.currentPokemon.evolutions.length == 0
                  "
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-divider />
          <div class="d-flex justify-end align-center">
            <v-checkbox
              v-model="attackCheck"
              label="A不問"
              class="pr-3"
              dense
            ></v-checkbox>
            <v-checkbox
              v-model="spAttackCheck"
              label="C不問"
              class="pr-3"
              dense
            ></v-checkbox>
          </div>
          <!-- 保存場所は2つ作る -->
          <v-row
            v-for="(calcArea, index) in calcAreas"
            :key="index"
            id="resultArea"
          >
            <v-col class="py-0">
              <v-textarea
                outlined
                rows="5"
                :value="calcAreas[index]"
              ></v-textarea>
            </v-col>
            <v-btn
              class="saveButton"
              absolute
              small
              color="primary"
              right
              @click="outputResult(index)"
            >
              保存する
            </v-btn>
          </v-row>
          <v-divider />
          <v-row class="text-justify pa-3 px-3 body-1">
            <p>【ステータス計算機について】</p>
            <p>
              ポケモンの各種ステータスをリアルタイムに計算するツールです。
              <br />実数値から努力値の逆算にも対応しています。（個体値までは自動で変動しない仕様としています）
            </p>
            <p>
              『ポケットモンスター
              ソード・シールド』（ポケモン剣盾）に対応しています。ピカブイには対応しておりません。
            </p>
            <p>
              『耐久調整』ボタンを押すと、余っている努力値から計算された理想的な配分を導き出すことができます。すでに耐久面に振られている努力値については、一度リセットされてから再計算されます。
            </p>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CalcButton from "@/components/CalcButton.vue";
import SearchPokemon from "@/components/SearchPokemon.vue";
import SearchNature from "@/components/SearchNature.vue";

export type DataType = {
  itemGroup: string;
  calcAreas: string[];
  attackCheck: boolean;
  spAttackCheck: boolean;
};

export default Vue.extend({
  components: {
    CalcButton,
    SearchPokemon,
    SearchNature,
  },
  data: (): DataType => ({
    itemGroup: "持ち物なし",
    calcAreas: ["", ""],
    attackCheck: false,
    spAttackCheck: false,
  }),
  computed: {
    // 将来的な拡張性を考慮して、ポケモン名や各種ステータスはVuexで管理している
    currentPokemon(): {
      no: number;
      name: string;
      form: string;
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
    // 各種ステータスの計算（methodsで引数を指定すれば、同じ計算を1箇所にまとめることもできるが、パフォーマンスの高いcomputedを使いたいため、あえて個別に計算している）
    hp: {
      get(): number {
        return this.getStats("hp", 0);
      },
      set(value: number) {
        this.setStats(value, "hp", 0);
      },
    },
    attack: {
      get(): number {
        return this.getStats("attack", 1);
      },
      set(value: number) {
        this.setStats(value, "attack", 1);
      },
    },
    defence: {
      get(): number {
        return this.getStats("defence", 2);
      },
      set(value: number) {
        this.setStats(value, "defence", 2);
      },
    },
    spAttack: {
      get(): number {
        return this.getStats("spAttack", 3);
      },
      set(value: number) {
        this.setStats(value, "spAttack", 3);
      },
    },
    spDefence: {
      get(): number {
        return this.getStats("spDefence", 4);
      },
      set(value: number) {
        this.setStats(value, "spDefence", 4);
      },
    },
    speed: {
      get(): number {
        return this.getStats("speed", 5);
      },
      set(value: number) {
        this.setStats(value, "speed", 5);
      },
    },
    // computedで計算した値を配列に格納することで、v-forで回すことが可能になる
    realNumbers(): number[] {
      return [
        this.hp,
        this.attack,
        this.defence,
        this.spAttack,
        this.spDefence,
        this.speed,
      ];
    },
    totalStats(): number {
      // レベルが空白のときに、String型になって連結した結果が表示されてしまう不具合があったため、Numberオブジェクトを使い型を厳密に定義することにした
      return (
        this.hp +
        this.attack +
        this.defence +
        this.spAttack +
        this.spDefence +
        this.speed
      );
    },
    // 種族値の合計値を計算する
    totalBaseStats(): number {
      return Object.values(this.currentPokemon.stats).reduce(
        (sum: number, stat: number) => {
          // 空白の箇所が存在すると、数値が連結された表示になってしまうため、0以上の整数であるかどうかをチェックしてから加算する処理を記載した
          sum += stat;
          return sum;
        },
        0
      );
    },
    // 個体値の合計値を計算する
    totalIv(): number {
      return this.stats.reduce((sum: number, stat) => {
        // 空白の箇所が存在すると、数値が連結された表示になってしまうため、0以上の整数であるかどうかをチェックしてから加算する処理を記載した
        sum += this.numberToInt(stat.individualValue);
        return sum;
      }, 0);
    },
    // 個体値の合計が186より大きい場合は警告を出す
    totalIvCheck(): string {
      if (this.totalIv > 186) {
        return "text-danger";
      } else {
        return "";
      }
    },
    // 努力値の合計値を計算する
    totalEv(): number {
      return this.stats.reduce((sum: number, stat) => {
        // 空白の箇所が存在すると、数値が連結された表示になってしまうため、0以上の整数であるかどうかをチェックしてから加算する処理を記載した
        sum += this.numberToInt(stat.effortValue);
        return sum;
      }, 0);
    },
    // 努力値の合計が510より大きい場合は警告を出す
    totalEvCheck(): string {
      if (this.totalEv > 510) {
        return "text-danger";
      } else {
        return "";
      }
    },
    // 物理耐久指数を求める
    physicalDurability(): number {
      const hp = this.numberToInt(this.hp);
      const defence = this.numberToInt(this.defence);
      if (
        this.itemGroup == "しんかのきせき" &&
        this.currentPokemon.evolutions.length
      ) {
        return hp * Math.floor(defence * 1.5);
      } else {
        return hp * defence;
      }
    },
    // 特殊耐久指数を求める
    specialDurability(): number {
      const hp = this.numberToInt(this.hp);
      const spDefence = this.numberToInt(this.spDefence);
      if (
        (this.itemGroup == "しんかのきせき" &&
          this.currentPokemon.evolutions.length) ||
        this.itemGroup == "とつげきチョッキ"
      ) {
        return hp * Math.floor(spDefence * 1.5);
      } else {
        return hp * spDefence;
      }
    },
    // めざめるパワーのタイプを求める
    hiddenPower(): string {
      let hiddenPowerCalc = 0;
      for (let i = 0, len = this.stats.length; i < len; i++) {
        if (this.stats[i].individualValue % 2 == 1) {
          // めざパの計算では特攻の前に素早さを持ってくる必要があるため、とりあえずif文で対応した（配列の順番を変えてからまとめて処理するのもありかもしれない）
          if (i == 5) {
            hiddenPowerCalc += 8;
          } else if (i > 2) {
            hiddenPowerCalc += 2 ** (1 + i);
          } else {
            hiddenPowerCalc += 2 ** i;
          }
        }
      }
      hiddenPowerCalc = Math.floor((hiddenPowerCalc * 15) / 63);
      switch (hiddenPowerCalc) {
        case 0:
          return "かくとう";
        case 1:
          return "ひこう";
        case 2:
          return "どく";
        case 3:
          return "じめん";
        case 4:
          return "いわ";
        case 5:
          return "むし";
        case 6:
          return "ゴースト";
        case 7:
          return "はがね";
        case 8:
          return "ほのお";
        case 9:
          return "みず";
        case 10:
          return "くさ";
        case 11:
          return "でんき";
        case 12:
          return "エスパー";
        case 13:
          return "こおり";
        case 14:
          return "ドラゴン";
        default:
          return "あく";
      }
    },
  },
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
    // 努力値の更新
    updateEffortValue(value: number, statsName: string, index: number): void {
      value = this.valueVerification(value, 252);
      // lazyValueはVuetifyでinputタグの中身の値を示す、ここに直接代入することでリアクティブに入力を更新することができる
      (this.$refs.effortValue as Vue & {
        [key: number]: {
          lazyValue: number;
        };
      })[index].lazyValue = value;
      this.stats[index].effortValue = value;
    },
    // 個体値の更新
    updateIndividualValue(
      value: number,
      statsName: string,
      index: number
    ): void {
      value = this.valueVerification(value, 31);
      // lazyValueはVuetifyでinputタグの中身の値を示す、ここに直接代入することでリアクティブに入力を更新することができる
      (this.$refs.individualValue as Vue & {
        [key: number]: {
          lazyValue: number;
        };
      })[index].lazyValue = value;
      this.stats[index].individualValue = value;
    },
    // 実数値を+1するボタンを設置
    statPlus(statsName: string): void {
      switch (statsName) {
        case "hp":
          this.hp++;
          break;
        case "attack":
          this.attack++;
          break;
        case "defence":
          this.defence++;
          break;
        case "spAttack":
          this.spAttack++;
          break;
        case "spDefence":
          this.spDefence++;
          break;
        case "speed":
          this.speed++;
          break;
      }
    },
    // 実数値を-1するボタンを設置
    statMinus(statsName: string): void {
      switch (statsName) {
        case "hp":
          this.hp--;
          break;
        case "attack":
          this.attack--;
          break;
        case "defence":
          this.defence--;
          break;
        case "spAttack":
          this.spAttack--;
          break;
        case "spDefence":
          this.spDefence--;
          break;
        case "speed":
          this.speed--;
          break;
      }
    },
    // 実数値を計算して返す
    getStats(statsName: string, index: number, tmpEV = 0): number {
      const lv = this.numberToInt(this.lv, 1);
      const individualValue = this.numberToInt(
        this.stats[index].individualValue
      );
      let effortValue = 0;
      // 耐久調整ボタンから呼び出した場合は、仮の努力値を代入する
      if (tmpEV) {
        effortValue = tmpEV;
      } else {
        effortValue = this.numberToInt(this.stats[index].effortValue);
      }
      if (statsName == "hp") {
        if (this.currentPokemon.name == "ヌケニン") {
          return 1;
        } else {
          return (
            Math.floor(
              ((this.currentPokemon.stats[statsName] * 2 +
                individualValue +
                Math.floor(effortValue / 4)) *
                lv) /
                100
            ) +
            10 +
            lv
          );
        }
      } else {
        return Math.floor(
          (Math.floor(
            ((this.currentPokemon.stats[statsName] * 2 +
              individualValue +
              Math.floor(effortValue / 4)) *
              lv) /
              100
          ) +
            5) *
            this.currentNature.stats[statsName]
        );
      }
    },
    // 実数値から努力値の逆算を行う
    setStats(event: number, statsName: string, index: number): void {
      let setValue = Number(event); // eventで取ってきたものはstring型になってしまうため、明示的にキャストの処理を記載している
      const lv = this.numberToInt(this.lv, 1);
      const individualValue = this.numberToInt(
        this.stats[index].individualValue
      );
      // HPのみ計算式が異なる
      if (statsName == "hp") {
        setValue =
          (Math.ceil(((setValue - lv - 10) * 100) / lv) -
            this.currentPokemon.stats.hp * 2 -
            individualValue) *
          4;
        // HP以外の計算では、性格補正を修正してから努力値の逆算を行う必要がある
      } else {
        const effortValue = this.numberToInt(this.stats[index].effortValue);
        const currentNatureStat = Number(this.currentNature.stats[statsName]);
        if (setValue % 11 === 10 && currentNatureStat === 1.1) {
          if (
            setValue >=
            Math.floor(
              (Math.floor(
                ((this.currentPokemon.stats[statsName] * 2 +
                  individualValue +
                  Math.floor(effortValue / 4)) *
                  lv) /
                  100
              ) +
                5) *
                currentNatureStat
            )
          ) {
            setValue += 1;
          } else {
            setValue -= 1;
          }
        }
        if (currentNatureStat === 1.1) {
          setValue = Math.ceil(setValue / 1.1);
        } else if (currentNatureStat === 0.9) {
          setValue = Math.ceil(setValue / 0.9);
        }
        setValue =
          (Math.ceil(((setValue - 5) * 100) / lv) -
            this.currentPokemon.stats[statsName] * 2 -
            individualValue) *
          4;
      }
      // 【共通の処理】計算した値を代入する
      setValue = this.valueVerification(setValue, 252);
      this.stats[index].effortValue = setValue;
      (this.$refs.realNumbers as Vue & {
        [key: number]: {
          lazyValue: number;
        };
      })[index].lazyValue = this.getStats(statsName, index);
    },
    // 計算結果を出力する
    outputResult(index: number): void {
      // 配列は『mutable』なオブジェクトなため、複製して別の変数に代入。不問箇所を*で表示したいため、String型も許可している。
      const realNumbers: (string | number)[] = [...this.realNumbers];

      // 不問の値を * で表示させる
      if (this.attackCheck) {
        realNumbers[1] = "*";
      }
      if (this.spAttackCheck) {
        realNumbers[3] = "*";
      }

      // 各行に出力する初期値を設定
      const line1 = `${this.$store.getters.currentPokemon.name} ${this.currentNature.name}`; // １行目にはポケモン名と性格を表示させている
      let line2 = "";
      const line3 = `${realNumbers[0]}-${realNumbers[1]}-${realNumbers[2]}-${realNumbers[3]}-${realNumbers[4]}-${realNumbers[5]}`;
      let line4 = "";
      let line5 = `${this.physicalDurability + this.specialDurability}-${
        this.physicalDurability
      }-${this.specialDurability}`;

      /* 2行目 ここから */
      // 努力値が振られている場合は()で囲み、そうでなければそのまま表示させる
      // 努力値が252とそれ以外の箇所に分け、それぞれ配列に格納
      const maxEv = this.stats.filter((stat) => stat.effortValue == 252);
      const noMaxEv = this.stats.filter(
        (stat) => stat.effortValue != 252 && stat.effortValue > 0
      );
      // 努力値が振られているなら()で囲む
      for (let i = 0, len = this.stats.length; i < len; i++) {
        if (i > 0) {
          line2 += "-";
        }
        line2 += String(realNumbers[i]);
        if (this.stats[i].effortValue > 0 && realNumbers[i] != "*") {
          line2 += `(${this.stats[i].effortValue})`;
        }
      }
      /* 2行目 ここまで */

      /* 3行目は最初に代入済み */

      /* 4行目 ここから */
      // 252振りの箇所が2箇所以上あれば、それを1箇所にまとめて表示させる
      if (maxEv.length >= 2) {
        // 252振りの箇所は先に
        for (let i = 0, len = maxEv.length; i < len; i++) {
          line4 += `${maxEv[i].abbreviation}`;
        }
        line4 = line4 + "252";
        // 252振りでない箇所は後ろに
        for (let i = 0, len = noMaxEv.length; i < len; i++) {
          if (noMaxEv[i].effortValue) {
            line4 += ` ${noMaxEv[i].abbreviation}${noMaxEv[i].effortValue}`;
          }
        }
        // 252振りの箇所が2箇所以上あれば、HABCDSの順に表示する
      } else {
        for (let i = 0, len = this.stats.length; i < len; i++) {
          if (this.stats[i].effortValue > 0) {
            if (line4) {
              line4 += " ";
            }
            line4 += this.stats[i].abbreviation + this.stats[i].effortValue;
          }
        }
      }
      /* 4行目 ここまで */

      /* 5行目 ここから*/
      // 持ち物があれば、耐久指数の箇所に持ち物も出力する
      if (this.itemGroup == "とつげきチョッキ") {
        line5 += "(チョッキ)";
      } else if (
        this.itemGroup == "しんかのきせき" &&
        this.currentPokemon.evolutions.length
      ) {
        line5 += "(輝石)";
      }
      /* 5行目 ここまで*/

      // 努力値が振られているときは努力値(3, 4行目)も出力、無振りのときは努力値(3, 4行目)を出力しない
      if (this.stats.some((stat) => stat.effortValue > 0)) {
        this.calcAreas.splice(
          index,
          1,
          `${line1}\n${line2}\n${line3}\n${line4}\n${line5}`
        ); // dataプロパティの配列を変更する場合には、普通に代入するとリアクティブに変化しなくなってしまうため、spliceメソッドで明示的に置き換える必要がある
      } else {
        this.calcAreas.splice(index, 1, `${line1}\n${line2}\n${line5}`);
      }
    },
    // 努力値をリセットする
    resetEffortValue(): void {
      this.stats.forEach((stat) => {
        stat.effortValue = null;
      });
    },
    // 理想の耐久調整を自動で計算する関数
    durabilityAdjustment(): void {
      // 攻撃、特攻、素早さの努力値を除いた値を求める
      const maxEffortValue: number =
        510 -
        this.stats[1].effortValue -
        this.stats[3].effortValue -
        this.stats[5].effortValue;

      // 計算に使う努力値を一時的に格納しておくための変数
      let tmpHpEV = maxEffortValue; // HPから順に計算していくので、最初に余りの努力値をそのまま代入している
      let tmpDefenceEV = 0;
      let tmpSpDefenceEV = 0;

      // 計算に使う実数値を一時的に格納しておくための変数
      let tmpHp = 0;
      let tmpDefence = 0;
      let tmpSpDefence = 0;

      // 実数値の計算は持ち物による補正込で行うが、代入する際には元の値を使うため、別の変数を用意することにした
      let tmpDefenceInItem = 0;
      let tmpSpDefenceInItem = 0;

      // 最終的に代入することになる実数値を格納しておくための変数
      let resultHp = 0;
      let resultDefence = 0;
      let resultSpDefence = 0;

      // 計算された耐久指数を比較していくのに用いる変数
      let oldHBD = 0;
      let newHBD = 0;

      // HBDの努力値を一度リセットする(不要な処理のような気もするが、これを記載しないと努力値の合計が510を超えてしまうことがある)
      this.stats[0].effortValue = 0;
      this.stats[2].effortValue = 0;
      this.stats[4].effortValue = 0;

      // 努力値の余りが252より大きかった場合、スタートであるHPの仮努力値を252とする
      if (tmpHpEV > 252) {
        tmpHpEV = 252;
      }
      // HP→特防→防御の順に総当たりで計算していく
      while (tmpHpEV >= 0) {
        tmpHp = this.getStats("hp", 0, tmpHpEV); // HPの努力値からHPの実数値を計算
        tmpSpDefenceEV = maxEffortValue - tmpHpEV;
        if (tmpSpDefenceEV > 252) {
          tmpSpDefenceEV = 252;
        }
        // 防御より先に特防を計算することで、端数が出た場合に特防に割り振られるようになる(ダウンロード対策でB<Dのほうが好まれることから、このような仕様にしている)
        while (tmpSpDefenceEV >= 0) {
          tmpSpDefence = this.getStats("spDefence", 4, tmpSpDefenceEV); // 特防の努力値から特防の実数値を計算
          tmpDefenceEV = maxEffortValue - tmpHpEV - tmpSpDefenceEV;
          // 防御の仮努力値が252を超えてしまう場合には値を更新しない
          if (tmpDefenceEV > 252) {
            break;
          }
          tmpDefence = this.getStats("defence", 2, tmpDefenceEV); // 防御の努力値から防御の実数値を計算

          // 持ち物込での耐久値を求める
          if (
            this.itemGroup == "しんかのきせき" &&
            this.currentPokemon.evolutions.length
          ) {
            tmpDefenceInItem = Math.floor(tmpDefence * 1.5);
            tmpSpDefenceInItem = Math.floor(tmpSpDefence * 1.5);
          } else if (this.itemGroup == "とつげきチョッキ") {
            tmpDefenceInItem = tmpDefence;
            tmpSpDefenceInItem = Math.floor(tmpSpDefence * 1.5);
          } else {
            tmpDefenceInItem = tmpDefence;
            tmpSpDefenceInItem = tmpSpDefence;
          }

          // 耐久指数を計算する
          newHBD =
            (tmpHp * tmpDefenceInItem * tmpSpDefenceInItem) /
            (tmpDefenceInItem + tmpSpDefenceInItem);
          // 耐久指数が前回のものより大きければ更新、そうでなければ更新しない
          if (oldHBD < newHBD) {
            oldHBD = newHBD;
            resultHp = tmpHp;
            resultDefence = tmpDefence;
            resultSpDefence = tmpSpDefence;
          }
          tmpSpDefenceEV--;
        }
        tmpHpEV--;
      }
      // 最も優秀だった結果を代入する
      this.hp = resultHp;
      this.defence = resultDefence;
      this.spDefence = resultSpDefence;
    },
  },
});
</script>

<style lang="scss" scoped>
/* 『保存する』のボタンをテキストエリア内に埋め込む */
#resultArea {
  position: relative;
  right: 0px;
  bottom: 0.5px;
}
.saveButton {
  right: 12px;
  bottom: 30px;
}
</style>
