<template>
  <v-container class="contents">
    <Title text="素早さ計算機（ポケモン剣盾）" />
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
            <v-row>
              <v-col
                cols="2"
                :class="[
                  'justify-center',
                  {
                    'text-danger': currentNature.stats['speed'] == 1.1,
                    'text-primary': currentNature.stats['speed'] == 0.9,
                  },
                ]"
              >
                <v-text-field
                  label="種族値"
                  placeholder="0"
                  :value="
                    `${stats[5].abbreviation}${currentPokemon.stats['speed']}`
                  "
                  disabled
                ></v-text-field>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    ref="speedIndividualValue"
                    type="number"
                    label="個体値"
                    placeholder="0"
                    :value="stats[5].individualValue"
                    @input="updateSpeedIndividualValue($event)"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="31"
                    class="mb-1 btn-min-xs"
                    @click.native="stats[5].individualValue = 31"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-xs"
                    @click.native="stats[5].individualValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    ref="speedEffortValue"
                    type="number"
                    label="努力値"
                    placeholder="0"
                    :value="stats[5].effortValue"
                    @input="updateSpeedEffortValue($event)"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="252"
                    class="mb-1 btn-min-sm"
                    @click.native="stats[5].effortValue = 252"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-sm"
                    @click.native="stats[5].effortValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    ref="speed"
                    type="number"
                    :label="stats[5].ja"
                    :value="speed"
                    @change="setSpeed($event)"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="▲"
                    class="mb-1 btn-min-xs"
                    @click.native="speed++"
                  />
                  <br />
                  <CalcButton
                    buttonText="▼"
                    class="btn-min-xs"
                    @click.native="speed--"
                  />
                </div>
              </v-col>
            </v-row>
          </div>
          <v-divider />
          <div class="px-0 pt-3">
            <div>
              <div>
                <v-select
                  v-model="selectItem"
                  :items="items"
                  item-text="name"
                  item-value="value"
                  label="道具"
                ></v-select>
              </div>
              <div>
                <v-select
                  v-model="selectAbility"
                  :items="abilities"
                  item-text="name"
                  item-value="value"
                  label="特性"
                ></v-select>
              </div>
            </div>
            <div class="d-flex pa-3">
              <v-checkbox
                label="おいかぜ (×2.0)"
                class="pr-2"
                v-model="tailwind"
                true-value="2"
                false-value="1"
                dense
              />
              <v-checkbox
                label="まひ (×0.5)"
                v-model="paralysis"
                class="pr-2"
                true-value="5"
                false-value="10"
                dense
              />
              <v-checkbox
                label="湿原 (×0.25)"
                v-model="swamp"
                true-value="25"
                false-value="100"
                dense
              />
            </div>
            <p>オプション</p>
            <v-switch label="±4以上も表示する" v-model="option1" dense />
            <v-divider v-if="$vuetify.breakpoint.sm" />
          </div>
        </v-container>
      </v-col>
      <v-col cols="12" md="6" class="d-flex pb-0">
        <v-divider
          v-if="!$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
          vertical
        />
        <v-simple-table style="width: 100%;">
          <thead>
            <tr>
              <th class="thead-align-center">ランク</th>
              <th class="thead-align-center">素早さ</th>
            </tr>
          </thead>
          <!-- 浮動小数点数により誤差が生じるのを防ぐため、あらかじめ100倍した数値を引数に渡し、計算後の結果を1/100にして返すようにしている -->
          <tbody align="center">
            <tr v-if="option1">
              <td>+6</td>
              <td>{{ Math.floor(speed * 4) }} ({{ calcSpeed(400) }})</td>
            </tr>
            <tr v-if="option1">
              <td>+5</td>
              <td>
                {{ Math.floor((speed * 35) / 10) }} ({{
                  Math.floor(calcSpeed(350))
                }})
              </td>
            </tr>
            <tr v-if="option1">
              <td>+4</td>
              <td>{{ Math.floor(speed * 3) }} ({{ calcSpeed(300) }})</td>
            </tr>
            <tr>
              <td>+3</td>
              <td>
                {{ Math.floor((speed * 25) / 10) }} ({{
                  Math.floor(Math.floor(calcSpeed(250)))
                }})
              </td>
            </tr>
            <tr>
              <td>+2</td>
              <td>
                {{ Math.floor(speed * 2) }} ({{
                  Math.floor(Math.floor(calcSpeed(200)))
                }})
              </td>
            </tr>
            <tr>
              <td>+1</td>
              <td>
                {{ Math.floor((speed * 15) / 10) }} ({{
                  Math.floor(Math.floor(calcSpeed(150)))
                }})
              </td>
            </tr>
            <tr>
              <td>±0</td>
              <td>
                {{ Math.floor(speed) }} ({{ Math.floor(calcSpeed(100)) }})
              </td>
            </tr>
            <tr>
              <td>-1</td>
              <td>
                {{ Math.floor((speed * 67) / 100) }} ({{
                  Math.floor(calcSpeed(67))
                }})
              </td>
            </tr>
            <tr>
              <td>-2</td>
              <td>
                {{ Math.floor((speed * 5) / 10) }} ({{
                  Math.floor(calcSpeed(50))
                }})
              </td>
            </tr>
            <tr>
              <td>-3</td>
              <td>
                {{ Math.floor((speed * 4) / 10) }} ({{
                  Math.floor(calcSpeed(40))
                }})
              </td>
            </tr>
            <tr v-if="option1">
              <td>-4</td>
              <td>
                {{ Math.floor((speed * 33) / 100) }} ({{
                  Math.floor(calcSpeed(33))
                }})
              </td>
            </tr>
            <tr v-if="option1">
              <td>-5</td>
              <td>
                {{ Math.floor((speed * 29) / 100) }} ({{
                  Math.floor(calcSpeed(29))
                }})
              </td>
            </tr>
            <tr v-if="option1">
              <td>-6</td>
              <td>
                {{ Math.floor((speed * 25) / 100) }} ({{
                  Math.floor(calcSpeed(25))
                }})
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <Adsense
      data-ad-client="ca-pub-3240586325286249"
      data-ad-slot="3353369882"
    ></Adsense>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CalcButton from "@/components/CalcButton.vue";
import SearchPokemon from "@/components/SearchPokemon.vue";
import SearchNature from "@/components/SearchNature.vue";

export type DataType = {
  tailwind: number;
  paralysis: number;
  swamp: number;
  option1: boolean;
  selectItem: number;
  selectAbility: number;
  items: {
    name: string;
    value: number;
  }[];
  abilities: {
    name: string;
    value: number;
  }[];
};

export default Vue.extend({
  components: {
    CalcButton,
    SearchPokemon,
    SearchNature,
  },
  data: (): DataType => ({
    tailwind: 1,
    paralysis: 10,
    swamp: 100,
    option1: false,
    selectItem: 10,
    selectAbility: 10,
    items: [
      { name: "スピードパウダー (×2)", value: 20 },
      { name: "こだわりスカーフ (×1.5)", value: 15 },
      { name: "--- 道具を選択 ---", value: 10 },
      { name: "くろいてっきゅう (×0.5)", value: 5 },
    ],
    abilities: [
      { name: "すいすい・ようりょくそ (×2)", value: 20 },
      { name: "はやあし・かるわざ (×2)", value: 2 },
      { name: "--- 特性を選択 ---", value: 10 },
      { name: "スロースタート (×0.5)", value: 5 },
    ],
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
    speed: {
      get(): number {
        return this.getSpeed();
      },
      set(value: number) {
        this.setSpeed(value);
      },
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
    updateSpeedEffortValue(value: number): void {
      value = this.valueVerification(value, 252);
      // lazyValueはVuetifyでinputタグの中身の値を示す、ここに直接代入することでリアクティブに入力を更新することができる
      (this.$refs.speedEffortValue as Vue & {
        lazyValue: number;
      }).lazyValue = value;
      this.stats[5].effortValue = value;
    },
    // 個体値の更新
    updateSpeedIndividualValue(value: number): void {
      value = this.valueVerification(value, 31);
      // lazyValueはVuetifyでinputタグの中身の値を示す、ここに直接代入することでリアクティブに入力を更新することができる
      (this.$refs.speedIndividualValue as Vue & {
        lazyValue: number;
      }).lazyValue = value;
      this.stats[5].individualValue = value;
    },
    // 実数値を計算して返す
    getSpeed(): number {
      const lv = this.numberToInt(this.lv, 1);
      const individualValue = this.numberToInt(this.stats[5].individualValue);
      const effortValue = this.numberToInt(this.stats[5].effortValue);
      return Math.floor(
        (Math.floor(
          ((this.currentPokemon.stats["speed"] * 2 +
            individualValue +
            Math.floor(effortValue / 4)) *
            lv) /
            100
        ) +
          5) *
          this.currentNature.stats["speed"]
      );
    },
    // 実数値から努力値の逆算を行う
    setSpeed(event: number) {
      let setValue = Number(event); // eventで取ってきたものはstring型になってしまうため、明示的にキャストの処理を記載している
      const lv = this.numberToInt(this.lv, 1);
      const individualValue = this.numberToInt(this.stats[5].individualValue);
      const effortValue = this.numberToInt(this.stats[5].effortValue);
      const currentNatureStat = Number(this.currentNature.stats["speed"]);
      if (setValue % 11 === 10 && currentNatureStat === 1.1) {
        if (
          setValue >=
          Math.floor(
            (Math.floor(
              ((this.currentPokemon.stats["speed"] * 2 +
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
          this.currentPokemon.stats["speed"] * 2 -
          individualValue) *
        4;
      // 計算した値を代入する
      setValue = this.valueVerification(setValue, 252);
      this.stats[5].effortValue = setValue;
      (this.$refs.speed as Vue & {
        lazyValue: number;
      }).lazyValue = this.getSpeed();
    },
    // 素早さリストに表示する値を計算する
    calcSpeed(rank: number) {
      // 特性が「はやあし・かるわざ」のときは計算の順番を変える
      if (this.selectAbility == 2) {
        return Math.floor(
          (Math.floor(
            (Math.floor(
              (Math.floor((this.speed * rank) / 100) * this.selectItem) / 10
            ) *
              this.paralysis) /
              10
          ) *
            2 *
            this.tailwind *
            this.swamp) /
            100
        );
        // 特性がその他であれば通常通り計算する
      } else {
        return Math.floor(
          (Math.floor(
            (Math.floor(
              (Math.floor(
                (Math.floor((this.speed * rank) / 100) * this.selectAbility) /
                  10
              ) *
                this.selectItem) /
                10
            ) *
              this.paralysis) /
              10
          ) *
            this.tailwind *
            this.swamp) /
            100
        );
      }
    },
  },
});
</script>

<style lang="scss" scoped>
// Tableのヘッダー部分は、importantで強行しないと左揃えになってしまう
.thead-align-center {
  text-align: center !important;
}
</style>
