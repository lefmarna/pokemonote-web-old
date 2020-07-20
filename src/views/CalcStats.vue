<template>
  <div class="container my-1 my-sm-2">
    <div class="row">
      <div class="col-12 col-md-6 px-1">
        <div class="mb-1">
          <div class="card shadow-sm p-0">
            <div class="bg-light p-3">
              <div class="d-flex">
                <label for="" class="pt-1 w-25 text-right">ポケモン：</label>
                <v-select
                  class="bg-white w-75"
                  :options="pokemons"
                  label="name"
                  v-model="selectPokemon"
                  placeholder="ここにポケモン名を入力してください"
                />
              </div>
              <div class="font-weight-bold text-info">
                種族値：{{ values[0].bs }}-{{ values[1].bs }}-{{
                  values[2].bs
                }}-{{ values[3].bs }}-{{ values[4].bs }}-{{ values[5].bs }}
              </div>
              <div>
                <div>
                  性格：
                  <select class="py-1" v-model="nature">
                    <option value="いじっぱり">いじっぱり</option>
                    <option value="うっかりや">うっかりや</option>
                    <option value="おくびょう">おくびょう</option>
                    <option value="おだやか">おだやか</option>
                    <option value="おっとり">おっとり</option>
                    <option value="おとなしい">おとなしい</option>
                    <option value="がんばりや">がんばりや</option>
                    <option value="きまぐれ">きまぐれ</option>
                    <option value="さみしがり">さみしがり</option>
                    <option value="しんちょう">しんちょう</option>
                    <option value="すなお">すなお</option>
                    <option value="ずぶとい">ずぶとい</option>
                    <option value="せっかち">せっかち</option>
                    <option value="てれや">てれや</option>
                    <option value="なまいき">なまいき</option>
                    <option value="のうてんき">のうてんき</option>
                    <option value="のんき">のんき</option>
                    <option value="ひかえめ">ひかえめ</option>
                    <option value="まじめ">まじめ</option>
                    <option value="むじゃき">むじゃき</option>
                    <option value="やんちゃ">やんちゃ</option>
                    <option value="ゆうかん">ゆうかん</option>
                    <option value="ようき">ようき</option>
                    <option value="れいせい">れいせい</option>
                    <option value="わんぱく">わんぱく</option>
                  </select>
                </div>
                <div>
                  レベル：
                  <input
                    type="number"
                    id="lv"
                    min="1"
                    max="100"
                    v-model.number="lv"
                  />
                  <button
                    class="btn btn-outline-secondary btn-sm"
                    v-on:click="lv = 50"
                  >
                    50
                  </button>
                  <button
                    class="btn btn-outline-secondary btn-sm"
                    v-on:click="lv = 100"
                  >
                    100
                  </button>
                </div>
              </div>
            </div>
            <table class="table table-sm table-striped">
              <thead>
                <tr align="center">
                  <th></th>
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
                        'text-danger': natureCalc[0] == 1.1,
                        'text-primary': natureCalc[0] == 0.9,
                      },
                    ]"
                  >
                    HP
                  </td>
                  <td class="align-middle text-right">
                    <input
                      type="number"
                      min="0"
                      max="31"
                      v-model.number="values[0].iv"
                    />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[0].iv = 31"
                      >
                        31
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[0].iv = 0"
                      >
                        0
                      </button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    <input
                      type="number"
                      min="0"
                      max="252"
                      step="4"
                      v-model.number="values[0].ev"
                    />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[0].ev = 252"
                      >
                        252
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[0].ev = 0"
                      >
                        0
                      </button>
                    </div>
                  </td>
                  <td class="align-middle" colspan="2">
                    <input
                      type="number"
                      min="0"
                      max="999"
                      v-bind:value="hp"
                      v-on:change="hpCalc()"
                    />
                  </td>
                </tr>
                <tr align="center">
                  <td
                    v-bind:class="[
                      'align-middle',
                      {
                        'text-danger': natureCalc[1] == 1.1,
                        'text-primary': natureCalc[1] == 0.9,
                      },
                    ]"
                  >
                    攻撃
                  </td>
                  <td class="align-middle text-right">
                    <input
                      type="number"
                      min="0"
                      max="31"
                      v-model.number="values[1].iv"
                    />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[1].iv = 31"
                      >
                        31
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[1].iv = 0"
                      >
                        0
                      </button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    <input
                      type="number"
                      min="0"
                      max="252"
                      step="4"
                      v-model.number="values[1].ev"
                    />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[1].ev = 252"
                      >
                        252
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[1].ev = 0"
                      >
                        0
                      </button>
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
                        'text-danger': natureCalc[2] == 1.1,
                        'text-primary': natureCalc[2] == 0.9,
                      },
                    ]"
                  >
                    防御
                  </td>
                  <td class="align-middle text-right">
                    <input
                      type="number"
                      min="0"
                      max="31"
                      v-model.number="values[2].iv"
                    />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[2].iv = 31"
                      >
                        31
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[2].iv = 0"
                      >
                        0
                      </button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    <input
                      type="number"
                      min="0"
                      max="252"
                      step="4"
                      v-model.number="values[2].ev"
                    />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[2].ev = 252"
                      >
                        252
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[2].ev = 0"
                      >
                        0
                      </button>
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
                        'text-danger': natureCalc[3] == 1.1,
                        'text-primary': natureCalc[3] == 0.9,
                      },
                    ]"
                  >
                    特攻
                  </td>
                  <td class="align-middle text-right">
                    <input
                      type="number"
                      min="0"
                      max="31"
                      v-model.number="values[3].iv"
                    />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[3].iv = 31"
                      >
                        31
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[3].iv = 0"
                      >
                        0
                      </button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    <input
                      type="number"
                      min="0"
                      max="252"
                      step="4"
                      v-model.number="values[3].ev"
                    />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[3].ev = 252"
                      >
                        252
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[3].ev = 0"
                      >
                        0
                      </button>
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
                        'text-danger': natureCalc[4] == 1.1,
                        'text-primary': natureCalc[4] == 0.9,
                      },
                    ]"
                  >
                    特防
                  </td>
                  <td class="align-middle text-right">
                    <input
                      type="number"
                      min="0"
                      max="31"
                      v-model.number="values[4].iv"
                    />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[4].iv = 31"
                      >
                        31
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[4].iv = 0"
                      >
                        0
                      </button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    <input
                      type="number"
                      min="0"
                      max="252"
                      step="4"
                      v-model.number="values[4].ev"
                    />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[4].ev = 252"
                      >
                        252
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[4].ev = 0"
                      >
                        0
                      </button>
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
                        'text-danger': natureCalc[5] == 1.1,
                        'text-primary': natureCalc[5] == 0.9,
                      },
                    ]"
                  >
                    素早
                  </td>
                  <td class="align-middle text-right">
                    <input
                      type="number"
                      min="0"
                      max="31"
                      v-model.number="values[5].iv"
                    />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[5].iv = 31"
                      >
                        31
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[5].iv = 0"
                      >
                        0
                      </button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    <input
                      type="number"
                      min="0"
                      max="252"
                      step="4"
                      v-model.number="values[5].ev"
                    />
                  </td>
                  <td class="text-left">
                    <div class="btn-group-vertical">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[5].ev = 252"
                      >
                        252
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        v-on:click="values[5].ev = 0"
                      >
                        0
                      </button>
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
        <div
          class="d-flex bg-white border rounded-lg shadow-sm mb-1 pt-3 order-md-1"
        >
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
              <label class="form-check-label" for="item2"
                >とつげきチョッキ</label
              >
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="item"
                id="item3"
                value="しんかのきせき"
                v-model="item"
                v-bind:disabled="evolution.length == 0"
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
    <Adsense
      data-ad-client="ca-pub-3240586325286249"
      data-ad-slot="3353369882"
    ></Adsense>
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
      selectPokemon: null,
      pokemons: Pokemon,
      lv: 50,
      nature: "がんばりや",
      item: "持ち物なし",
      evolution: "",
      regex: /^[-]?([1-9]\d*|0)(\.\d+)?$/,
      values: [
        { name: "ＨＰ", iv: 31, ev: 0, bs: 108, calc: "hp", initial: "H" },
        {
          name: "攻撃",
          iv: 31,
          ev: 0,
          bs: 130,
          calc: "attack",
          initial: "A",
        },
        {
          name: "防御",
          iv: 31,
          ev: 0,
          bs: 95,
          calc: "defence",
          initial: "B",
        },
        {
          name: "特攻",
          iv: 31,
          ev: 0,
          bs: 80,
          calc: "spAttack",
          initial: "C",
        },
        {
          name: "特防",
          iv: 31,
          ev: 0,
          bs: 85,
          calc: "spDefence",
          initial: "D",
        },
        {
          name: "素早",
          iv: 31,
          ev: 0,
          bs: 102,
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
          this.natureCalc[1]
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
          this.natureCalc[2]
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
          this.natureCalc[3]
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
          this.natureCalc[4]
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
          this.natureCalc[5]
      );
    },
    // 性格補正
    natureCalc() {
      switch (this.nature) {
        case "いじっぱり":
          return [1.0, 1.1, 1.0, 0.9, 1.0, 1.0];
        case "うっかりや":
          return [1.0, 1.0, 1.0, 1.1, 0.9, 1.0];
        case "おくびょう":
          return [1.0, 0.9, 1.0, 1.0, 1.0, 1.1];
        case "おだやか":
          return [1.0, 0.9, 1.0, 1.0, 1.1, 1.0];
        case "おっとり":
          return [1.0, 1.0, 0.9, 1.1, 1.0, 1.0];
        case "おとなしい":
          return [1.0, 1.0, 0.9, 1.0, 1.1, 1.0];
        case "さみしがり":
          return [1.0, 1.1, 0.9, 1.0, 1.0, 1.0];
        case "しんちょう":
          return [1.0, 1.0, 1.0, 0.9, 1.1, 1.0];
        case "ずぶとい":
          return [1.0, 0.9, 1.1, 1.0, 1.0, 1.0];
        case "せっかち":
          return [1.0, 1.0, 0.9, 1.0, 1.0, 1.1];
        case "なまいき":
          return [1.0, 1.0, 1.0, 1.0, 1.1, 0.9];
        case "のうてんき":
          return [1.0, 1.0, 1.1, 1.0, 0.9, 1.0];
        case "のんき":
          return [1.0, 1.0, 1.1, 1.0, 1.0, 0.9];
        case "ひかえめ":
          return [1.0, 0.9, 1.0, 1.1, 1.0, 1.0];
        case "むじゃき":
          return [1.0, 1.0, 1.0, 1.0, 0.9, 1.1];
        case "やんちゃ":
          return [1.0, 1.1, 1.0, 1.0, 0.9, 1.0];
        case "ゆうかん":
          return [1.0, 1.1, 1.0, 1.0, 1.0, 0.9];
        case "ようき":
          return [1.0, 1.0, 1.0, 0.9, 1.0, 1.1];
        case "れいせい":
          return [1.0, 1.0, 1.0, 1.1, 1.0, 0.9];
        case "わんぱく":
          return [1.0, 1.0, 1.1, 0.9, 1.0, 1.0];
        default:
          return [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
      }
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
      if (this.item == "しんかのきせき" && this.evolution.length) {
        return this.hp * Math.floor(this.defence * 1.5);
      } else {
        return this.hp * this.defence;
      }
    },
    specialDurability() {
      if (
        (this.item == "しんかのきせき" && this.evolution.length) ||
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
    selectPokemon() {
      if (this.selectPokemon !== undefined) {
        this.name = this.selectPokemon.name;
        this.evolution = this.selectPokemon.evolutions;
        this.values[0].bs = this.selectPokemon.stats.hp;
        this.values[1].bs = this.selectPokemon.stats.attack;
        this.values[2].bs = this.selectPokemon.stats.defence;
        this.values[3].bs = this.selectPokemon.stats.spAttack;
        this.values[4].bs = this.selectPokemon.stats.spDefence;
        this.values[5].bs = this.selectPokemon.stats.speed;
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
      if (n % 11 === 10 && this.natureCalc[i] === 1.1) {
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
              this.natureCalc[i]
          )
        ) {
          n += 1;
        } else {
          n -= 1;
        }
      }
      if (this.natureCalc[i] === 1.1) {
        n = Math.ceil(n / 1.1);
      } else if (this.natureCalc[i] === 0.9) {
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
