<template>
  <v-container class="contents">
    <Title text="素早さ計算機（ポケモン剣盾）" />
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="d-flex justify-center"
        :class="$vuetify.breakpoint.xs ? 'px-0' : ''"
      >
        <div class="pa-3">
          <v-text-field
            type="number"
            label="素早さ実数値"
            placeholder="0"
            v-model="speed"
          ></v-text-field>
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
          <v-divider v-if="!$vuetify.breakpoint.md" />
        </div>
      </v-col>
      <v-col cols="12" md="6" class="pb-0">
        <v-simple-table>
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

<script>
export default {
  name: "CalcSpeed",
  data: () => ({
    speed: 100,
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
  methods: {
    calcSpeed(rank) {
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
  // 素早さの上限を999、下限を0とする
  updated() {
    if (this.speed > 999) {
      this.speed = 999;
    } else if (this.speed < 0) {
      this.speed = "";
    }
  },
};
</script>

<style lang="scss" scoped>
// Tableのヘッダー部分は、importantで強行しないと左揃えになってしまう
.thead-align-center {
  text-align: center !important;
}
</style>
