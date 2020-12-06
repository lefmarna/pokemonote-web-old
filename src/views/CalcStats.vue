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
                  type="number"
                  label="レベル"
                  placeholder="1"
                  v-model.trim.number="lv"
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
                    type="number"
                    label="個体値"
                    placeholder="0"
                    v-model.trim.number="stats[index].individualValue"
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
                    @click.native="stats[index].individualValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
                    placeholder="0"
                    v-model.trim.number="stats[index].effortValue"
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
                    @click.native="stats[index].effortValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[index].ja"
                    :value="realNumbers[index]"
                    @change="updateStats(stat.en, index)"
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
              <v-col cols="2">
                <p>合計</p>
              </v-col>
              <v-col class="d-flex justify-center">
                <span class="pr-1" :class="totalIvCheck">{{ totalIv }}</span
                >/&nbsp;186
              </v-col>
              <v-col class="d-flex justify-center">
                <span class="pr-1" :class="totalEvCheck">{{ totalEv }}</span
                >/&nbsp;510
              </v-col>
              <v-col class="d-flex justify-center">
                {{ totalStats }}
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
        <v-container :class="$vuetify.breakpoint.xs ? 'px-0' : ''">
          <v-row>
            <v-col cols="6">
              <p>めざパ：{{ hiddenPower }}</p>
              <p>
                総合耐久：{{ physicalDurability + specialDurability }}
                <br />
                <span style="padding-left: 2em;"
                  >物理：{{ physicalDurability }}</span
                >
                <br />
                <span style="padding-left: 2em;"
                  >特殊：{{ specialDurability }}</span
                >
              </p>
            </v-col>
            <v-col cols="6">
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
          <v-row v-for="i in 2" :key="i" id="resultArea">
            <v-col class="py-0">
              <v-textarea
                outlined
                rows="5"
                v-model="calcAreas['calcArea' + i]"
              ></v-textarea>
            </v-col>
            <v-btn
              class="saveButton"
              absolute
              small
              color="primary"
              right
              @click="outputResult(i)"
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
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <Adsense
      data-ad-client="ca-pub-3240586325286249"
      data-ad-slot="3353369882"
    ></Adsense>
  </v-container>
</template>

<script>
import CalcButton from "@/components/CalcButton.vue";
import SearchPokemon from "@/components/SearchPokemon.vue";
import SearchNature from "@/components/SearchNature.vue";

export default {
  name: "Home",
  components: {
    CalcButton,
    SearchPokemon,
    SearchNature,
  },
  data: () => ({
    itemGroup: "持ち物なし",
    isNumber: /^([1-9]\d*|0)$/, // 1~9で始まる整数、または0であるときにtrueを返す正規表現
    calcAreas: {
      calcArea1: "",
      calcArea2: "",
    },
    attackCheck: false,
    spAttackCheck: false,
  }),
  computed: {
    // 将来的な拡張性を考慮して、ポケモン名や各種ステータスはVuexで管理している
    currentPokemon() {
      return this.$store.getters.currentPokemon;
    },
    currentNature() {
      return this.$store.getters.currentNature;
    },
    lv: {
      get() {
        return this.$store.getters.lv;
      },
      set(value) {
        this.$store.commit("updateLv", value);
      },
    },
    stats: {
      get() {
        return this.$store.getters.stats;
      },
      set(value) {
        this.$store.commit("updateStats", value);
      },
    },
    // 各種ステータスの計算（methodsで引数を指定すれば、同じ計算を1箇所にまとめることもできるが、パフォーマンスの高いcomputedを使いたいため、あえて個別に計算している）
    hp: {
      get() {
        let lv = this.lv;
        let individualValue = this.stats[0].individualValue;
        if (!this.isNumber.test(lv)) {
          lv = 1;
        }
        if (!this.isNumber.test(individualValue)) {
          individualValue = 0;
        }
        if (this.currentPokemon.name == "ヌケニン") {
          return 1;
        } else {
          return (
            Math.floor(
              ((this.currentPokemon.stats["hp"] * 2 +
                individualValue +
                Math.floor(this.stats[0].effortValue / 4)) *
                lv) /
                100
            ) +
            10 +
            lv
          );
        }
      },
      set(value) {
        let lv = this.lv;
        if (!this.isNumber.test(lv)) {
          lv = 1;
        }
        const n =
          (Math.ceil(((Number(value) - lv - 10) * 100) / lv) -
            this.currentPokemon.stats.hp * 2 -
            this.stats[0].individualValue) *
          4;
        if (n < 0) {
          this.stats[0].effortValue = "";
        } else {
          this.stats[0].effortValue = n;
        }
      },
    },
    attack: {
      get() {
        let lv = this.lv;
        let individualValue = this.stats[1].individualValue;
        if (!this.isNumber.test(lv)) {
          lv = 1;
        }
        if (!this.isNumber.test(individualValue)) {
          individualValue = 0;
        }
        return Math.floor(
          (Math.floor(
            ((this.currentPokemon.stats["attack"] * 2 +
              individualValue +
              Math.floor(this.stats[1].effortValue / 4)) *
              lv) /
              100
          ) +
            5) *
            this.currentNature.stats.attack
        );
      },
      set(value) {
        let lv = this.lv;
        if (!this.isNumber.test(lv)) {
          lv = 1;
        }
        let n = Number(value);
        if (n % 11 === 10 && this.currentNature.stats.attack === 1.1) {
          if (
            n >=
            Math.floor(
              (Math.floor(
                ((this.currentPokemon.stats.attack * 2 +
                  this.stats[1].individualValue +
                  Math.floor(this.stats[1].effortValue / 4)) *
                  lv) /
                  100
              ) +
                5) *
                this.currentNature.stats.attack
            )
          ) {
            n += 1;
          } else {
            n -= 1;
          }
        }
        if (this.currentNature.stats.attack === 1.1) {
          n = Math.ceil(n / 1.1);
        } else if (this.currentNature.stats.attack === 0.9) {
          n = Math.ceil(n / 0.9);
        }
        n =
          (Math.ceil(((n - 5) * 100) / this.lv) -
            this.currentPokemon.stats.attack * 2 -
            this.stats[1].individualValue) *
          4;
        if (n < 0) {
          this.stats[1].effortValue = "";
        } else {
          this.stats[1].effortValue = n;
        }
      },
    },
    defence: {
      get() {
        let lv = this.lv;
        let individualValue = this.stats[2].individualValue;
        if (!this.isNumber.test(lv)) {
          lv = 1;
        }
        if (!this.isNumber.test(individualValue)) {
          individualValue = 0;
        }
        return Math.floor(
          (Math.floor(
            ((this.currentPokemon.stats["defence"] * 2 +
              individualValue +
              Math.floor(this.stats[2].effortValue / 4)) *
              lv) /
              100
          ) +
            5) *
            this.currentNature.stats.defence
        );
      },
      set(value) {
        let lv = this.lv;
        if (!this.isNumber.test(lv)) {
          lv = 1;
        }
        let n = Number(value);
        if (n % 11 === 10 && this.currentNature.stats.defence === 1.1) {
          if (
            n >=
            Math.floor(
              (Math.floor(
                ((this.currentPokemon.stats.defence * 2 +
                  this.stats[2].individualValue +
                  Math.floor(this.stats[2].effortValue / 4)) *
                  lv) /
                  100
              ) +
                5) *
                this.currentNature.stats.defence
            )
          ) {
            n += 1;
          } else {
            n -= 1;
          }
        }
        if (this.currentNature.stats.defence === 1.1) {
          n = Math.ceil(n / 1.1);
        } else if (this.currentNature.stats.defence === 0.9) {
          n = Math.ceil(n / 0.9);
        }
        n =
          (Math.ceil(((n - 5) * 100) / this.lv) -
            this.currentPokemon.stats.defence * 2 -
            this.stats[2].individualValue) *
          4;
        if (n < 0) {
          this.stats[2].effortValue = "";
        } else {
          this.stats[2].effortValue = n;
        }
      },
    },
    spAttack: {
      get() {
        let lv = this.lv;
        let individualValue = this.stats[3].individualValue;
        if (!this.isNumber.test(lv)) {
          lv = 1;
        }
        if (!this.isNumber.test(individualValue)) {
          individualValue = 0;
        }
        return Math.floor(
          (Math.floor(
            ((this.currentPokemon.stats["spAttack"] * 2 +
              individualValue +
              Math.floor(this.stats[3].effortValue / 4)) *
              lv) /
              100
          ) +
            5) *
            this.currentNature.stats.spAttack
        );
      },
      set(value) {
        let lv = this.lv;
        if (!this.isNumber.test(lv)) {
          lv = 1;
        }
        let n = Number(value);
        if (n % 11 === 10 && this.currentNature.stats.spAttack === 1.1) {
          if (
            n >=
            Math.floor(
              (Math.floor(
                ((this.currentPokemon.stats.spAttack * 2 +
                  this.stats[3].individualValue +
                  Math.floor(this.stats[3].effortValue / 4)) *
                  lv) /
                  100
              ) +
                5) *
                this.currentNature.stats.spAttack
            )
          ) {
            n += 1;
          } else {
            n -= 1;
          }
        }
        if (this.currentNature.stats.spAttack === 1.1) {
          n = Math.ceil(n / 1.1);
        } else if (this.currentNature.stats.spAttack === 0.9) {
          n = Math.ceil(n / 0.9);
        }
        n =
          (Math.ceil(((n - 5) * 100) / this.lv) -
            this.currentPokemon.stats.spAttack * 2 -
            this.stats[3].individualValue) *
          4;
        if (n < 0) {
          this.stats[3].effortValue = "";
        } else {
          this.stats[3].effortValue = n;
        }
      },
    },
    spDefence: {
      get() {
        let lv = this.lv;
        let individualValue = this.stats[4].individualValue;
        if (!this.isNumber.test(lv)) {
          lv = 1;
        }
        if (!this.isNumber.test(individualValue)) {
          individualValue = 0;
        }
        return Math.floor(
          (Math.floor(
            ((this.currentPokemon.stats["spDefence"] * 2 +
              individualValue +
              Math.floor(this.stats[4].effortValue / 4)) *
              lv) /
              100
          ) +
            5) *
            this.currentNature.stats.spDefence
        );
      },
      set(value) {
        let lv = this.lv;
        if (!this.isNumber.test(lv)) {
          lv = 1;
        }
        let n = Number(value);
        if (n % 11 === 10 && this.currentNature.stats.spDefence === 1.1) {
          if (
            n >=
            Math.floor(
              (Math.floor(
                ((this.currentPokemon.stats.spDefence * 2 +
                  this.stats[4].individualValue +
                  Math.floor(this.stats[4].effortValue / 4)) *
                  lv) /
                  100
              ) +
                5) *
                this.currentNature.stats.spDefence
            )
          ) {
            n += 1;
          } else {
            n -= 1;
          }
        }
        if (this.currentNature.stats.spDefence === 1.1) {
          n = Math.ceil(n / 1.1);
        } else if (this.currentNature.stats.spDefence === 0.9) {
          n = Math.ceil(n / 0.9);
        }
        n =
          (Math.ceil(((n - 5) * 100) / this.lv) -
            this.currentPokemon.stats.spDefence * 2 -
            this.stats[4].individualValue) *
          4;
        if (n < 0) {
          this.stats[4].effortValue = "";
        } else {
          this.stats[4].effortValue = n;
        }
      },
    },
    speed: {
      get() {
        let lv = this.lv;
        let individualValue = this.stats[5].individualValue;
        if (!this.isNumber.test(lv)) {
          lv = 1;
        }
        if (!this.isNumber.test(individualValue)) {
          individualValue = 0;
        }
        return Math.floor(
          (Math.floor(
            ((this.currentPokemon.stats["speed"] * 2 +
              individualValue +
              Math.floor(this.stats[5].effortValue / 4)) *
              lv) /
              100
          ) +
            5) *
            this.currentNature.stats.speed
        );
      },
      set(value) {
        let lv = this.lv;
        if (!this.isNumber.test(lv)) {
          lv = 1;
        }
        let n = Number(value);
        if (n % 11 === 10 && this.currentNature.stats.speed === 1.1) {
          if (
            n >=
            Math.floor(
              (Math.floor(
                ((this.currentPokemon.stats.speed * 2 +
                  this.stats[5].individualValue +
                  Math.floor(this.stats[5].effortValue / 4)) *
                  lv) /
                  100
              ) +
                5) *
                this.currentNature.stats.speed
            )
          ) {
            n += 1;
          } else {
            n -= 1;
          }
        }
        if (this.currentNature.stats.speed === 1.1) {
          n = Math.ceil(n / 1.1);
        } else if (this.currentNature.stats.speed === 0.9) {
          n = Math.ceil(n / 0.9);
        }
        n =
          (Math.ceil(((n - 5) * 100) / this.lv) -
            this.currentPokemon.stats.speed * 2 -
            this.stats[5].individualValue) *
          4;
        if (n < 0) {
          this.stats[5].effortValue = "";
        } else {
          this.stats[5].effortValue = n;
        }
      },
    },
    // computedで計算した値を配列に格納することで、v-forで回すことが可能になる
    realNumbers() {
      return [
        this.hp,
        this.attack,
        this.defence,
        this.spAttack,
        this.spDefence,
        this.speed,
      ];
    },
    totalStats() {
      // レベルが空白のときに、String型になって連結した結果が表示されてしまう不具合があったため、Numberオブジェクトを使い型を厳密に定義することにした
      return (
        Number(this.hp) +
        Number(this.attack) +
        Number(this.defence) +
        Number(this.spAttack) +
        Number(this.spDefence) +
        Number(this.speed)
      );
    },
    // 個体値の合計値を計算する
    totalIv() {
      return this.stats.reduce((sum, stat) => {
        // 空白の箇所が存在すると、数値が連結された表示になってしまうため、0以上の整数であるかどうかをチェックしてから加算する処理を記載した
        if (this.isNumber.test(stat.individualValue)) {
          sum += stat.individualValue;
        }
        return sum;
      }, 0);
    },
    // 個体値の合計が186より大きい場合は警告を出す
    totalIvCheck() {
      if (this.totalIv > 186) {
        return "text-danger";
      } else {
        return "";
      }
    },
    // 努力値の合計値を計算する
    totalEv() {
      return this.stats.reduce((sum, stat) => {
        // 空白の箇所が存在すると、数値が連結された表示になってしまうため、0以上の整数であるかどうかをチェックしてから加算する処理を記載した
        if (this.isNumber.test(stat.effortValue)) {
          sum += stat.effortValue;
        }
        return sum;
      }, 0);
    },
    // 努力値の合計が510より大きい場合は警告を出す
    totalEvCheck() {
      if (this.totalEv > 510) {
        return "text-danger";
      } else {
        return "";
      }
    },
    // 物理耐久指数を求める
    physicalDurability() {
      let hp = this.hp;
      let defence = this.defence;
      if (!this.isNumber.test(hp)) {
        hp = 0;
      }
      if (!this.isNumber.test(defence)) {
        defence = 0;
      }
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
    specialDurability() {
      let hp = this.hp;
      let spDefence = this.spDefence;
      if (!this.isNumber.test(hp)) {
        hp = 0;
      }
      if (!this.isNumber.test(spDefence)) {
        spDefence = 0;
      }
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
    hiddenPower() {
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
    // 実数値を上下させるボタンを設置
    statPlus(statName) {
      this[statName]++;
    },
    statMinus(statName) {
      this[statName]--;
    },
    // 実数値から努力値の逆算を行う（実数値の更新にはSetterを設定しているため、本来なら不要な関数。しかし、Vuetifyではv-modelのlazy修飾子をサポートしていないため、inputではなくchangeイベントで発火させたいケースでは、v-bind:valueとv-on:changeで分けて記述してメソッドを呼び出す必要がある。なお、inputではダメな理由としては、実数値を消しながら入力する際に、努力値が自動更新されることによって、実数値の入力が滞ってしまうから（【例】183→164→16→1））
    updateStats(statsName, index) {
      let lv = this.lv;
      if (!this.isNumber.test(lv)) {
        lv = 1;
      }
      // HPのみ計算式が異なる
      if (statsName == "hp") {
        const n =
          (Math.ceil(((Number(event.target.value) - lv - 10) * 100) / lv) -
            this.currentPokemon.stats.hp * 2 -
            this.stats[0].individualValue) *
          4;
        if (n < 0) {
          this.stats[0].effortValue = "";
        } else {
          this.stats[0].effortValue = n;
        }
        // HP以外の計算では、性格補正を修正してから努力値の逆算を行う必要がある
      } else {
        let n = Number(event.target.value);
        const currentNatureStat = Number(this.currentNature.stats[statsName]);
        if (n % 11 === 10 && currentNatureStat === 1.1) {
          if (
            n >=
            Math.floor(
              (Math.floor(
                ((this.currentPokemon.stats[statsName] * 2 +
                  this.stats[index].individualValue +
                  Math.floor(this.stats[index].effortValue / 4)) *
                  lv) /
                  100
              ) +
                5) *
                currentNatureStat
            )
          ) {
            n += 1;
          } else {
            n -= 1;
          }
        }
        if (currentNatureStat === 1.1) {
          n = Math.ceil(n / 1.1);
        } else if (currentNatureStat === 0.9) {
          n = Math.ceil(n / 0.9);
        }
        n =
          (Math.ceil(((n - 5) * 100) / this.lv) -
            this.currentPokemon.stats[statsName] * 2 -
            this.stats[index].individualValue) *
          4;
        if (n < 0) {
          this.stats[index].effortValue = "";
        } else {
          this.stats[index].effortValue = n;
        }
      }
    },
    // 計算結果を出力する
    outputResult(i) {
      // 配列は『mutable』なオブジェクトなため、複製して別の変数に入れている
      const realNumbers = Array.from(this.realNumbers);
      if (this.attackCheck) {
        realNumbers[1] = "*";
      }
      if (this.spAttackCheck) {
        realNumbers[3] = "*";
      }
      // 各行に出力する初期値を設定
      const line1 = `${this.$store.getters.currentPokemon.name} ${this.currentNature.name}`;
      let line2 = "";
      const line3 = `${realNumbers[0]}-${realNumbers[1]}-${realNumbers[2]}-${realNumbers[3]}-${realNumbers[4]}-${realNumbers[5]}`;
      let line4 = "";
      let line5 = `${this.physicalDurability + this.specialDurability}-${
        this.physicalDurability
      }-${this.specialDurability}`;
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
        if (this.stats[i].effortValue > 0) {
          line2 += `(${this.stats[i].effortValue})`;
        }
      }
      // 252振りの箇所が2箇所以上あれば、それを1箇所にまとめる
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
      // 持ち物があれば、耐久指数の箇所に持ち物も出力する
      if (this.itemGroup == "とつげきチョッキ") {
        line5 += "(チョッキ)";
      } else if (
        this.itemGroup == "しんかのきせき" &&
        this.currentPokemon.evolutions.length
      ) {
        line5 += "(輝石)";
      }
      // 努力値が振られているときは努力値も出力、無振りのときは努力値を出力しない
      if (this.stats.some((stat) => stat.effortValue > 0)) {
        this.calcAreas[
          "calcArea" + i
        ] = `${line1}\n${line2}\n${line3}\n${line4}\n${line5}`;
      } else {
        this.calcAreas["calcArea" + i] = `${line1}\n${line2}\n${line5}`;
      }
    },
  },
  updated() {
    // inputタグは、直接入力することでmaxやminを無視することができてしまうため、値を監視して修正する処理を記載した
    this.stats.forEach((stat, index) => {
      // 個体値の上限を31、下限を0とする
      if (stat.individualValue > 31) {
        this.stats[index].individualValue = 31;
      } else if (stat.individualValue < 0) {
        this.stats[index].individualValue = "";
      }
      // 努力値の上限を252、下限を0とする
      if (stat.effortValue > 252) {
        this.stats[index].effortValue = 252;
      } else if (stat.effortValue < 0) {
        this.stats[index].effortValue = "";
      }
    });
    // レベルの上限を100、下限を1とする
    if (this.lv > 100) {
      this.lv = 100;
      // ここを「this.lv < 1」にしてしまうと、一度消してから入力しようとした際に「1」が自動入力されてしまう。これはUI的によろしくないため、空白の際にはString型になることを利用し「this.lv === 0」としてNumber型のみを検出することによって、空白の際の自動入力はなくしつつも「0」以下の入力を「1」に繰り上げる処理を実現した。
    } else if (this.lv < 0 || this.lv === 0) {
      this.lv = 1;
    }
  },
};
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
