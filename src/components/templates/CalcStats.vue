<template>
  <v-container>
    <Title :text="title" />
    <v-row>
      <!-- 左ここから -->
      <v-col cols="12" md="6" class="d-flex">
        <v-container :class="$vuetify.breakpoint.xs ? 'px-0' : ''">
          <PokemonParams
            :currentPokemon="currentPokemon"
            :currentNature="currentNature"
            :lv="lv"
            @updatePokemon="$emit('update:currentPokemon', $event)"
            @updateNature="$emit('update:currentNature', $event)"
            @updateLv="$emit('update:lv', $event)"
          />
          <!-- ステータス一覧 -->
          <div class="statsTable">
            <v-row v-for="(stat, index) in stats" :key="stat.en">
              <!-- 種族値 -->
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
                  :value="`${stat.abbreviation}${
                    currentPokemon.stats[stat.en]
                  }`"
                  disabled
                  persistent-placeholder
                />
              </v-col>
              <!-- 個体値 -->
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    ref="individualValue"
                    type="number"
                    label="個体値"
                    placeholder="0"
                    :value="stats[index].individualValue"
                    @input="updateIndividualValue($event, stat.en, index)"
                    persistent-placeholder
                  />
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
              <!-- 努力値 -->
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    ref="effortValue"
                    type="number"
                    label="努力値"
                    placeholder="0"
                    :value="stats[index].effortValue"
                    @input="updateEffortValue($event, stat.en, index)"
                    persistent-placeholder
                  />
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
              <!-- 実数値 -->
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
                    persistent-placeholder
                  />
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
          </div>
        </v-container>
      </v-col>
      <!-- 左ここまで -->
      <!-- 右ここから -->
      <v-col cols="12" md="6" class="d-flex">
        <v-container :class="$vuetify.breakpoint.xs ? 'pa-0' : ''">
          <v-row>
            <v-col cols="6">
              <v-card height="100%" shaped>
                <v-card-title>耐久指数</v-card-title>
                <v-card-text>
                  <p class="mb-2">
                    総合：{{ physicalDurability + specialDurability }}
                  </p>
                  <p class="mb-2">物理：{{ physicalDurability }}</p>
                  <p class="mb-0">特殊：{{ specialDurability }}</p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card height="100%" shaped>
                <v-card-title>その他</v-card-title>
                <v-card-text>めざパ：{{ hiddenPower }} </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- 耐久調整-->
          <v-row class="pb-2" align="start">
            <v-col cols="12">
              <v-card shaped>
                <v-card-title>耐久調整</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="6" class="pb-0" align="center">
                      <v-card-subtitle class="pa-0">倍率</v-card-subtitle>
                      <v-select
                        v-model="selectDefenceEnhancement"
                        :items="defenceEnhancements"
                        item-text="name"
                        item-value="value"
                        label="防御"
                      ></v-select>
                      <v-select
                        v-model="selectSpDefenceEnhancement"
                        :items="spDefenceEnhancements"
                        item-text="name"
                        item-value="value"
                        label="特防"
                      ></v-select>
                    </v-col>
                    <v-col cols="6" class="pb-0" align="center">
                      <v-card-subtitle class="pa-0"
                        >計算スタイル</v-card-subtitle
                      >
                      <v-radio-group v-model="calcStyle">
                        <v-radio
                          label="バランス - HBD/(B+D)"
                          value="balance"
                        ></v-radio>
                        <v-radio
                          label="総合耐久 - H=B+D"
                          value="performance"
                          disabled
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-row class="mb-0">
                    <v-col cols="12" align="center">
                      <v-btn
                        color="primary"
                        elevation="2"
                        outlined
                        @click.native="durabilityAdjustment"
                        large
                        >耐久調整を計算する</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <!-- ポケモンの説明 -->
          <v-row>
            <v-col class="py-0">
              <v-textarea
                v-model="description"
                outlined
                rows="5"
                shaped
                placeholder="ポケモンの説明（例：○○の××確定耐え）"
              ></v-textarea>
            </v-col>
          </v-row>
          <!-- 「努力値リセット」と「投稿する」のボタン -->
          <v-row class="pb-2" align-content="center">
            <v-col class="text-center">
              <v-btn
                color="danger"
                elevation="2"
                outlined
                @click.native="resetEffortValue"
                large
                >努力値リセット</v-btn
              >
            </v-col>
            <v-col class="text-center">
              <v-btn
                color="primary"
                elevation="3"
                @click="emitPokemon"
                :disabled="!$store.getters.isLogin"
                large
                >{{ buttonText }}</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CalcButton from "@/components/molecules/CalcButton.vue";
import calculator from "@/mixins/calculator";
import PokemonParams from "@/components/organisms/PokemonParams.vue";
import { Pokemon } from "@/types/pokemon";
import { Nature } from "@/types/nature";
import { Stat } from "@/types/stat";

export interface DataType {
  selectDefenceEnhancement: number;
  selectSpDefenceEnhancement: number;
  calcStyle: string;
  description: string;
}

export default Vue.extend({
  components: {
    CalcButton,
    PokemonParams,
  },
  mixins: [calculator],
  props: {
    title: {
      type: String,
    },
    buttonText: {
      type: String,
    },
    currentPokemon: {
      type: Object as Vue.PropType<Pokemon>,
    },
    currentNature: {
      type: Object as Vue.PropType<Nature>,
    },
    lv: {
      // String型を許可しないと null のとき怒られる
      type: [Number, String],
      default: "",
    },
    stats: {
      type: Array as Vue.PropType<Stat[]>,
    },
  },
  data: (): DataType => ({
    selectDefenceEnhancement: 1,
    selectSpDefenceEnhancement: 1,
    calcStyle: "balance",
    description: "",
  }),
  computed: {
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
      // reduce を使うと型が unknown になってしまうため、計算時にNumber関数を使って計算している
      return Object.values(this.currentPokemon.stats).reduce(
        (sum: number, stat) => {
          sum += Number(stat);
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
      return hp * Math.floor(defence * this.selectDefenceEnhancement);
    },
    // 特殊耐久指数を求める
    specialDurability(): number {
      const hp = this.numberToInt(this.hp);
      const spDefence = this.numberToInt(this.spDefence);
      return hp * Math.floor(spDefence * this.selectSpDefenceEnhancement);
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
    defenceEnhancements(): {
      name: string;
      value: number;
    }[] {
      return [
        { name: "2.0 - ファーコート等", value: 2.0 },
        { name: "1.5 - ふくつのたて等", value: 1.5 },
        { name: "1.0", value: 1.0 },
      ];
    },
    spDefenceEnhancements(): {
      name: string;
      value: number;
    }[] {
      return [
        { name: "2.0 - こおりのりんぷん等", value: 2.0 },
        { name: "1.5 - とつげきチョッキ等", value: 1.5 },
        { name: "1.0", value: 1.0 },
      ];
    },
  },
  methods: {
    // 努力値の更新
    updateEffortValue(value: number, statsName: string, index: number): void {
      value = this.valueVerification(value, 252);
      // lazyValueはVuetifyでinputタグの中身の値を示す、ここに直接代入することでリアクティブに入力を更新することができる
      (
        this.$refs.effortValue as Vue & {
          [key: number]: {
            lazyValue: number;
          };
        }
      )[index].lazyValue = value;
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
      (
        this.$refs.individualValue as Vue & {
          [key: number]: {
            lazyValue: number;
          };
        }
      )[index].lazyValue = value;
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
      (
        this.$refs.realNumbers as Vue & {
          [key: number]: {
            lazyValue: number;
          };
        }
      )[index].lazyValue = this.getStats(statsName, index);
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

      // 実数値の計算は耐久補正込で行うが、代入する際には元の値を使うため、別の変数を用意することにした
      let tmpDefenceEnhancement = 0;
      let tmpSpDefenceEnhancement = 0;

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

          // 耐久補正込での耐久値を求める
          tmpDefenceEnhancement = Math.floor(
            tmpDefence * this.selectDefenceEnhancement
          );
          tmpSpDefenceEnhancement = Math.floor(
            tmpSpDefence * this.selectSpDefenceEnhancement
          );

          // 耐久指数を計算する
          newHBD =
            (tmpHp * tmpDefenceEnhancement * tmpSpDefenceEnhancement) /
            (tmpDefenceEnhancement + tmpSpDefenceEnhancement);
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
    // ポケモンのデータを親に渡す
    emitPokemon(): void {
      const params = {
        name: this.currentPokemon.name,
        nature: this.currentNature.name,
        lv: this.lv,
        hp_iv: this.stats[0].individualValue,
        hp_ev: this.stats[0].effortValue,
        hp: this.hp,
        attack_iv: this.stats[1].individualValue,
        attack_ev: this.stats[1].effortValue,
        attack: this.attack,
        defence_iv: this.stats[2].individualValue,
        defence_ev: this.stats[2].effortValue,
        defence: this.defence,
        sp_attack_iv: this.stats[3].individualValue,
        sp_attack_ev: this.stats[3].effortValue,
        sp_attack: this.spAttack,
        sp_defence_iv: this.stats[4].individualValue,
        sp_defence_ev: this.stats[4].effortValue,
        sp_defence: this.spDefence,
        speed_iv: this.stats[5].individualValue,
        speed_ev: this.stats[5].effortValue,
        speed: this.speed,
        description: this.description,
        public_flg: 1,
      };
      this.$emit("submit", params);
    },
  },
});
</script>
