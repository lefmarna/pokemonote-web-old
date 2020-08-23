<template>
  <div class="container my-1 my-sm-2">
    <div class="row">
      <div class="col-12 col-md-6 px-1">
        <div class="mb-1">
          <div class="card shadow-sm p-0">
            <div class="bg-light p-3">
              <div>
                <label>ポケモン</label>
                <v-select
                  class="bg-white"
                  :options="pokemons"
                  label="name"
                  v-model="selectPokemonData"
                  placeholder="ポケモン名を入力してください"
                />
              </div>
              <hr />
              <!-- <div class="font-weight-bold text-info">
                種族値：{{ values[0].bs }}-{{ values[1].bs }}-{{
                values[2].bs
                }}-{{ values[3].bs }}-{{ values[4].bs }}-{{ values[5].bs }}
              </div>-->
              <div class="d-flex justify-content-between">
                <div class="form-row" style="width: 35%">
                  <div>
                    <label for="lv">レベル</label>
                    <input
                      type="number"
                      class="form-control form-control-sm"
                      id="lv"
                      min="1"
                      max="100"
                      v-model.number="lv"
                    />
                  </div>
                  <div class="btn-group-vertical">
                    <button class="btn btn-outline-secondary btn-sm" v-on:click="lv = 100">100</button>
                    <button class="btn btn-outline-secondary btn-sm" v-on:click="lv = 50">50</button>
                  </div>
                </div>
                <div style="width: 65%">
                  <label>性格</label>
                  <v-select
                    class="bg-white"
                    :options="natureList"
                    label="nature"
                    v-model="selectNature"
                    placeholder="性格を入力してください"
                  />
                </div>
              </div>
            </div>
            <table class="table table-sm table-striped">
              <thead>
                <tr align="center">
                  <th class="px-0">種族値</th>
                  <th class="px-0" colspan="2">個体値</th>
                  <th class="px-0" colspan="2">努力値</th>
                  <th colspan="2">実数値</th>
                </tr>
              </thead>
              <tfoot>
                <tr align="center">
                  <th>合計</th>
                  <th colspan="2">
                    <span v-bind:class="totalIvCheck">{{ totalIv }}</span> / 186
                  </th>
                  <th colspan="2">
                    <span v-bind:class="totalEvCheck">{{ totalEv }}</span> / 510
                  </th>
                  <th>{{ totalStats }}</th>
                </tr>
              </tfoot>
              <tbody>
                <tr align="center">
                  <td
                    v-bind:class="[
                      'align-middle',
                      {
                        'text-danger': values[0].natureCalc == 1.1,
                        'text-primary': values[0].natureCalc == 0.9,
                      },
                    ]"
                  >
                    HP
                    <br />
                    {{ values[0].bs }}
                  </td>
                  <td class="align-middle text-right">
                    <input type="number" min="0" max="31" v-model.number="values[0].iv" />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[0].iv = 31"
                      >31</button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[0].iv = 0"
                      >0</button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    <input type="number" min="0" max="252" step="4" v-model.number="values[0].ev" />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[0].ev = 252"
                      >252</button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[0].ev = 0"
                      >0</button>
                    </div>
                  </td>
                  <td class="align-middle" colspan="2">
                    <input type="number" min="0" max="999" v-bind:value="hp" v-on:change="hpCalc()" />
                  </td>
                </tr>
                <tr align="center">
                  <td
                    v-bind:class="[
                      'align-middle',
                      {
                        'text-danger': values[1].natureCalc == 1.1,
                        'text-primary': values[1].natureCalc == 0.9,
                      },
                    ]"
                  >
                    攻撃
                    <br />
                    {{ this.values[1].bs }}
                  </td>
                  <td class="align-middle text-right">
                    <input type="number" min="0" max="31" v-model.number="values[1].iv" />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[1].iv = 31"
                      >31</button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[1].iv = 0"
                      >0</button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    <input type="number" min="0" max="252" step="4" v-model.number="values[1].ev" />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[1].ev = 252"
                      >252</button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[1].ev = 0"
                      >0</button>
                    </div>
                  </td>
                  <td class="align-middle" colspan="2">
                    <input
                      type="number"
                      min="0"
                      max="999"
                      v-bind:value="attack"
                      v-on:change="statsCalc(1)"
                    />
                  </td>
                </tr>
                <tr align="center">
                  <td
                    v-bind:class="[
                      'align-middle',
                      {
                        'text-danger': values[2].natureCalc == 1.1,
                        'text-primary': values[2].natureCalc == 0.9,
                      },
                    ]"
                  >
                    防御
                    <br />
                    {{ this.values[2].bs }}
                  </td>
                  <td class="align-middle text-right">
                    <input type="number" min="0" max="31" v-model.number="values[2].iv" />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[2].iv = 31"
                      >31</button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[2].iv = 0"
                      >0</button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    <input type="number" min="0" max="252" step="4" v-model.number="values[2].ev" />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[2].ev = 252"
                      >252</button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[2].ev = 0"
                      >0</button>
                    </div>
                  </td>
                  <td class="align-middle" colspan="2">
                    <input
                      type="number"
                      min="0"
                      max="999"
                      v-bind:value="defence"
                      v-on:change="statsCalc(2)"
                    />
                  </td>
                </tr>
                <tr align="center">
                  <td
                    v-bind:class="[
                      'align-middle',
                      {
                        'text-danger': values[3].natureCalc == 1.1,
                        'text-primary': values[3].natureCalc == 0.9,
                      },
                    ]"
                  >
                    特攻
                    <br />
                    {{ this.values[3].bs }}
                  </td>
                  <td class="align-middle text-right">
                    <input type="number" min="0" max="31" v-model.number="values[3].iv" />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[3].iv = 31"
                      >31</button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[3].iv = 0"
                      >0</button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    <input type="number" min="0" max="252" step="4" v-model.number="values[3].ev" />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[3].ev = 252"
                      >252</button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[3].ev = 0"
                      >0</button>
                    </div>
                  </td>
                  <td class="align-middle" colspan="2">
                    <input
                      type="number"
                      min="0"
                      max="999"
                      v-bind:value="spAttack"
                      v-on:change="statsCalc(3)"
                    />
                  </td>
                </tr>
                <tr align="center">
                  <td
                    v-bind:class="[
                      'align-middle',
                      {
                        'text-danger': values[4].natureCalc == 1.1,
                        'text-primary': values[4].natureCalc == 0.9,
                      },
                    ]"
                  >
                    特防
                    <br />
                    {{ this.values[4].bs }}
                  </td>
                  <td class="align-middle text-right">
                    <input type="number" min="0" max="31" v-model.number="values[4].iv" />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[4].iv = 31"
                      >31</button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[4].iv = 0"
                      >0</button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    <input type="number" min="0" max="252" step="4" v-model.number="values[4].ev" />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[4].ev = 252"
                      >252</button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[4].ev = 0"
                      >0</button>
                    </div>
                  </td>
                  <td class="align-middle" colspan="2">
                    <input
                      type="number"
                      min="0"
                      max="999"
                      v-bind:value="spDefence"
                      v-on:change="statsCalc(4)"
                    />
                  </td>
                </tr>
                <tr align="center">
                  <td
                    v-bind:class="[
                      'align-middle',
                      {
                        'text-danger': values[5].natureCalc == 1.1,
                        'text-primary': values[5].natureCalc == 0.9,
                      },
                    ]"
                  >
                    素早
                    <br />
                    {{ this.values[5].bs }}
                  </td>
                  <td class="align-middle text-right">
                    <input type="number" min="0" max="31" v-model.number="values[5].iv" />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[5].iv = 31"
                      >31</button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[5].iv = 0"
                      >0</button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    <input type="number" min="0" max="252" step="4" v-model.number="values[5].ev" />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[5].ev = 252"
                      >252</button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[5].ev = 0"
                      >0</button>
                    </div>
                  </td>
                  <td class="align-middle" colspan="2">
                    <input
                      type="number"
                      min="0"
                      max="999"
                      v-bind:value="speed"
                      v-on:change="statsCalc(5)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 px-1 d-flex flex-column">
        <result class="mb-1 border rounded shadow-sm order-md-2"></result>
        <result class="mb-1 border rounded shadow-sm order-md-3"></result>
        <div class="d-flex bg-white border rounded-lg shadow-sm mb-1 pt-3 order-md-1">
          <div class="col-6">
            <p>めざパ：{{ hiddenPower }}</p>
            <p>
              総合耐久：{{ physicalDurability + specialDurability }}
              <br />
              <span class="col-1"></span>
              物理：{{ physicalDurability }}
              <br />
              <span class="col-1"></span>
              特殊：{{ specialDurability }}
            </p>
          </div>
          <div class="col-6">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="item"
                id="item1"
                value="持ち物なし"
                v-model="item"
                checked
              />
              <label class="form-check-label" for="item1">持ち物なし</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="item"
                id="item2"
                value="とつげきチョッキ"
                v-model="item"
              />
              <label class="form-check-label" for="item2">とつげきチョッキ</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="item"
                id="item3"
                value="しんかのきせき"
                v-model="item"
                v-bind:disabled="evolutions.length == 0"
              />
              <label class="form-check-label" for="item3">しんかのきせき</label>
            </div>
          </div>
        </div>
        <div class="bg-white border rounded shadow-sm pt-3 px-2 order-md-4">
          <p>使い方</p>
          <p>
            ポケモンの各種ステータスをリアルタイムに計算するツールです。
            <br />実数値から努力値の逆算にも対応しています。（個体値は自動で変動しません）
          </p>
          <p>
            <br />『ポケットモンスター
            ソード・シールド』（ポケモン剣盾）に対応しています。ピカブイには対応しておりません。
          </p>
        </div>
      </div>
    </div>
    <Adsense data-ad-client="ca-pub-3240586325286249" data-ad-slot="3353369882"></Adsense>
  </div>
</template>

<script>
import Pokemon from "@/components/pokemon_data.json";
import result from "@/components/result.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "CalcStats",
  components: {
    result,
    vSelect,
  },
  data() {
    return {
      name: "ガブリアス",
      selectPokemonData: null,
      pokemons: Pokemon,
      lv: 50,
      nature: "がんばりや",
      selectNature: null,
      natureList: [
        {
          nature: "いじっぱり",
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
          nature: "うっかりや",
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
          nature: "おくびょう",
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
          nature: "おだやか",
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
          nature: "おっとり",
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
          nature: "おとなしい",
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
          nature: "がんばりや",
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
          nature: "きまぐれ",
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
          nature: "さみしがり",
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
          nature: "しんちょう",
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
          nature: "すなお",
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
          nature: "ずぶとい",
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
          nature: "せっかち",
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
          nature: "なまいき",
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
          nature: "てれや",
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
          nature: "のうてんき",
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
          nature: "のんき",
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
          nature: "ひかえめ",
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
          nature: "まじめ",
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
          nature: "むじゃき",
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
          nature: "やんちゃ",
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
          nature: "ゆうかん",
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
          nature: "ようき",
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
          nature: "れいせい",
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
          nature: "わんぱく",
          stats: {
            hp: 1.0,
            attack: 1.0,
            defence: 1.1,
            spAttack: 0.9,
            spDefence: 1.0,
            speed: 1.0,
          },
        },
      ],
      item: "持ち物なし",
      evolutions: "",
      regex: /^[-]?([1-9]\d*|0)(\.\d+)?$/,
      values: [
        { name: "ＨＰ", iv: 31, ev: 0, bs: 108, calc: "hp", initial: "H" },
        {
          name: "攻撃",
          iv: 31,
          ev: 0,
          bs: 130,
          natureCalc: 1.0,
          calc: "attack",
          initial: "A",
        },
        {
          name: "防御",
          iv: 31,
          ev: 0,
          bs: 95,
          natureCalc: 1.0,
          calc: "defence",
          initial: "B",
        },
        {
          name: "特攻",
          iv: 31,
          ev: 0,
          bs: 80,
          natureCalc: 1.0,
          calc: "spAttack",
          initial: "C",
        },
        {
          name: "特防",
          iv: 31,
          ev: 0,
          bs: 85,
          natureCalc: 1.0,
          calc: "spDefence",
          initial: "D",
        },
        {
          name: "素早",
          iv: 31,
          ev: 0,
          bs: 102,
          natureCalc: 1.0,
          calc: "speed",
          initial: "S",
        },
      ],
    };
  },
  computed: {
    hp() {
      let iv = this.values[0].iv;
      if (!this.regex.test(iv)) {
        iv = 0;
      }
      if (this.name == "ヌケニン") {
        return 1;
      } else {
        return (
          Math.floor(
            ((this.values[0].bs * 2 + iv + Math.floor(this.values[0].ev / 4)) *
              this.lv) /
              100
          ) +
          10 +
          this.lv
        );
      }
    },
    attack() {
      let iv = this.values[1].iv;
      if (!this.regex.test(iv)) {
        iv = 0;
      }
      return Math.floor(
        (Math.floor(
          ((this.values[1].bs * 2 + iv + Math.floor(this.values[1].ev / 4)) *
            this.lv) /
            100
        ) +
          5) *
          this.values[1].natureCalc
      );
    },
    defence() {
      let iv = this.values[2].iv;
      if (!this.regex.test(iv)) {
        iv = 0;
      }
      return Math.floor(
        (Math.floor(
          ((this.values[2].bs * 2 + iv + Math.floor(this.values[2].ev / 4)) *
            this.lv) /
            100
        ) +
          5) *
          this.values[2].natureCalc
      );
    },
    spAttack() {
      let iv = this.values[3].iv;
      if (!this.regex.test(iv)) {
        iv = 0;
      }
      return Math.floor(
        (Math.floor(
          ((this.values[3].bs * 2 + iv + Math.floor(this.values[3].ev / 4)) *
            this.lv) /
            100
        ) +
          5) *
          this.values[3].natureCalc
      );
    },
    spDefence() {
      let iv = this.values[4].iv;
      if (!this.regex.test(iv)) {
        iv = 0;
      }
      return Math.floor(
        (Math.floor(
          ((this.values[4].bs * 2 + iv + Math.floor(this.values[4].ev / 4)) *
            this.lv) /
            100
        ) +
          5) *
          this.values[4].natureCalc
      );
    },
    speed() {
      let iv = this.values[5].iv;
      if (!this.regex.test(iv)) {
        iv = 0;
      }
      return Math.floor(
        (Math.floor(
          ((this.values[5].bs * 2 + iv + Math.floor(this.values[5].ev / 4)) *
            this.lv) /
            100
        ) +
          5) *
          this.values[5].natureCalc
      );
    },
    totalStats() {
      return (
        this.hp +
        this.attack +
        this.defence +
        this.spAttack +
        this.spDefence +
        this.speed
      );
    },
    totalIv() {
      let n = 0;
      for (let i = 0, len = this.values.length; i < len; i++) {
        if (this.regex.test(this.values[i].iv)) {
          n += this.values[i].iv;
        }
      }
      return n;
    },
    // 努力値の合計を計算
    totalEv() {
      let n = 0;
      for (let i = 0, len = this.values.length; i < len; i++) {
        if (this.regex.test(this.values[i].ev)) {
          n += this.values[i].ev;
        }
      }
      return n;
    },
    // 個体値の合計が186より大きいとき、警告を出す
    totalIvCheck() {
      if (this.totalIv > 186) {
        return "text-danger";
      } else {
        return "";
      }
    },
    // 努力値の合計が510より大きいとき、警告を出す
    totalEvCheck() {
      if (this.totalEv > 510) {
        return "text-danger";
      } else {
        return "";
      }
    },
    // 耐久指数
    physicalDurability() {
      if (this.item == "しんかのきせき" && this.evolutions.length) {
        return this.hp * Math.floor(this.defence * 1.5);
      } else {
        return this.hp * this.defence;
      }
    },
    specialDurability() {
      if (
        (this.item == "しんかのきせき" && this.evolutions.length) ||
        this.item == "とつげきチョッキ"
      ) {
        return this.hp * Math.floor(this.spDefence * 1.5);
      } else {
        return this.hp * this.spDefence;
      }
    },
    // めざめるパワーのタイプを求める
    hiddenPower() {
      let hiddenPowerCalc = 0;
      for (let i = 0; i < this.values.length; i++) {
        if (this.values[i].iv % 2 == 1) {
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
  watch: {
    // 入力されたポケモンが存在するとき、各種情報を更新する
    selectPokemonData() {
      if (this.selectPokemonData !== undefined) {
        this.name = this.selectPokemonData.name;
        this.evolutions = this.selectPokemonData.evolutions;
        // 種族値を更新する
        let selectPokemonStats = this.selectPokemonData.stats;
        Object.keys(selectPokemonStats).forEach((value, index) => {
          this.values[index].bs = selectPokemonStats[value];
        });
      }
    },
    // 性格が変更されたとき、性格補正のかかる箇所を更新する
    selectNature() {
      if (this.selectNature !== undefined) {
        this.nature = this.selectNature.nature;
        let selectNatureStats = this.selectNature.stats;
        Object.keys(selectNatureStats).forEach((value, index) => {
          this.values[index].natureCalc = selectNatureStats[value];
        });
      }
    },
  },
  // メソッドは重くなるので、あまり使わないようにしよう
  methods: {
    hpCalc() {
      if (!this.regex.test(this.values[0].iv)) {
        this.values[0].iv = 0;
      }
      const n =
        (Math.ceil(
          ((Number(event.target.value) - this.lv - 10) * 100) / this.lv
        ) -
          this.values[0].bs * 2 -
          this.values[0].iv) *
        4;
      if (n < 0) {
        this.values[0].ev = 0;
      } else {
        this.values[0].ev = n;
      }
    },
    statsCalc(i) {
      let n = Number(event.target.value);
      if (!this.regex.test(this.values[i].iv)) {
        this.values[i].iv = 0;
      }
      if (n % 11 === 10 && this.values[i].natureCalc === 1.1) {
        if (
          n >=
          Math.floor(
            (Math.floor(
              ((this.values[i].bs * 2 +
                this.values[i].iv +
                Math.floor(this.values[i].ev / 4)) *
                this.lv) /
                100
            ) +
              5) *
              this.values[i].natureCalc
          )
        ) {
          n += 1;
        } else {
          n -= 1;
        }
      }
      if (this.values[i].natureCalc === 1.1) {
        n = Math.ceil(n / 1.1);
      } else if (this.values[i].natureCalc === 0.9) {
        n = Math.ceil(n / 0.9);
      }
      n =
        (Math.ceil(((n - 5) * 100) / this.lv) -
          this.values[i].bs * 2 -
          this.values[i].iv) *
        4;
      if (n < 0) {
        this.values[i].ev = 0;
      } else {
        this.values[i].ev = n;
      }
    },
  },
};
</script>

<style lang="scss">
input::placeholder {
  color: #757575 !important;
}
</style>
