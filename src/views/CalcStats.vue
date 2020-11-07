<template>
  <v-container class="pa-0" fluid>
    <v-row no-gutters>
      <v-col cols="12" md="6" class="d-flex">
        <v-container class="contents">
          <v-autocomplete
            :items="pokemonList"
            item-text="name"
            label="ポケモン名"
            :filter="katakanaToHiragana"
            v-model="currentPokemon"
            no-data-text="ポケモンが見つかりません。"
            clearable
            auto-select-first
            return-object
          ></v-autocomplete>
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
                  class="mb-1 btn-min-35px"
                  @click.native="lv = 100"
                />
                <br />
                <CalcButton
                  buttonText="50"
                  class="btn-min-35px"
                  @click.native="lv = 50"
                />
              </div>
            </v-col>
            <v-col cols="8">
              <v-autocomplete
                :items="natureList"
                item-text="name"
                label="性格"
                :filter="katakanaToHiragana"
                v-model="currentNature"
                no-data-text="性格が見つかりません。"
                auto-select-first
                return-object
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-divider />
          <!-- v-forを使用したいところだが、computedでは引数を取ることができないため断念することに… -->
          <div id="statsTable">
            <v-row>
              <v-col cols="2"
                ><div class="v-input--is-disabled theme--light v-text-field">
                  <div class="v-input__control">
                    <div class="v-input__slot">
                      <div class="v-text-field__slot">
                        <label
                          class="v-label v-label--active v-label--is-disabled theme--light"
                          style="left: 0px; right: auto; position: absolute;"
                          >種族値</label
                        ><span
                          :class="[
                            'py-1',
                            {
                              'text-danger': currentNature.stats.hp == 1.1,
                              'text-primary': currentNature.stats.hp == 0.9,
                            },
                          ]"
                          >{{ `H${currentPokemon.stats.hp}` }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="個体値"
                    placeholder="0"
                    v-model.trim.number="stats[0].individualValue"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="31"
                    class="mb-1 btn-min-30px"
                    @click.native="stats[0].individualValue = 31"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-30px"
                    @click.native="stats[0].individualValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
                    placeholder="0"
                    v-model.trim.number="stats[0].effortValue"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="252"
                    class="mb-1 btn-min-35px"
                    @click.native="stats[0].effortValue = 252"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-35px"
                    @click.native="stats[0].effortValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[0].ja"
                    :value="hp"
                    @change="updateHp()"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="▲"
                    class="mb-1 btn-min-30px"
                    @click.native="hp++"
                  />
                  <br />
                  <CalcButton
                    buttonText="▼"
                    class="btn-min-30px"
                    @click.native="hp--"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"
                ><div class="v-input--is-disabled theme--light v-text-field">
                  <div class="v-input__control">
                    <div class="v-input__slot">
                      <div class="v-text-field__slot">
                        <label
                          class="v-label v-label--active v-label--is-disabled theme--light"
                          style="left: 0px; right: auto; position: absolute;"
                          >種族値</label
                        ><span
                          :class="[
                            'py-1',
                            {
                              'text-danger': currentNature.stats.attack == 1.1,
                              'text-primary': currentNature.stats.attack == 0.9,
                            },
                          ]"
                          >{{ `A${currentPokemon.stats.attack}` }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="個体値"
                    placeholder="0"
                    v-model.trim.number="stats[1].individualValue"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="31"
                    class="mb-1 btn-min-30px"
                    @click.native="stats[1].individualValue = 31"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-30px"
                    @click.native="stats[1].individualValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
                    placeholder="0"
                    v-model.trim.number="stats[1].effortValue"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="252"
                    class="mb-1 btn-min-35px"
                    @click.native="stats[1].effortValue = 252"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-35px"
                    @click.native="stats[1].effortValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[1].ja"
                    :value="attack"
                    @change="updateStats('attack', 1)"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="▲"
                    class="mb-1 btn-min-30px"
                    @click.native="attack++"
                  />
                  <br />
                  <CalcButton
                    buttonText="▼"
                    class="btn-min-30px"
                    @click.native="attack--"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"
                ><div class="v-input--is-disabled theme--light v-text-field">
                  <div class="v-input__control">
                    <div class="v-input__slot">
                      <div class="v-text-field__slot">
                        <label
                          class="v-label v-label--active v-label--is-disabled theme--light"
                          style="left: 0px; right: auto; position: absolute;"
                          >種族値</label
                        ><span
                          :class="[
                            'py-1',
                            {
                              'text-danger': currentNature.stats.defence == 1.1,
                              'text-primary':
                                currentNature.stats.defence == 0.9,
                            },
                          ]"
                          >{{ `B${currentPokemon.stats.defence}` }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="個体値"
                    placeholder="0"
                    v-model.trim.number="stats[2].individualValue"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="31"
                    class="mb-1 btn-min-30px"
                    @click.native="stats[2].individualValue = 31"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-30px"
                    @click.native="stats[2].individualValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
                    placeholder="0"
                    v-model.trim.number="stats[2].effortValue"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="252"
                    class="mb-1 btn-min-35px"
                    @click.native="stats[2].effortValue = 252"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-35px"
                    @click.native="stats[2].effortValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[2].ja"
                    :value="defence"
                    @change="updateStats('defence', 2)"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="▲"
                    class="mb-1 btn-min-30px"
                    @click.native="defence++"
                  />
                  <br />
                  <CalcButton
                    buttonText="▼"
                    class="btn-min-30px"
                    @click.native="defence--"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"
                ><div class="v-input--is-disabled theme--light v-text-field">
                  <div class="v-input__control">
                    <div class="v-input__slot">
                      <div class="v-text-field__slot">
                        <label
                          class="v-label v-label--active v-label--is-disabled theme--light"
                          style="left: 0px; right: auto; position: absolute;"
                          >種族値</label
                        ><span
                          :class="[
                            'py-1',
                            {
                              'text-danger':
                                currentNature.stats.spAttack == 1.1,
                              'text-primary':
                                currentNature.stats.spAttack == 0.9,
                            },
                          ]"
                          >{{ `C${currentPokemon.stats.spAttack}` }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="個体値"
                    placeholder="0"
                    v-model.trim.number="stats[3].individualValue"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="31"
                    class="mb-1 btn-min-30px"
                    @click.native="stats[3].individualValue = 31"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-30px"
                    @click.native="stats[3].individualValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
                    placeholder="0"
                    v-model.trim.number="stats[3].effortValue"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="252"
                    class="mb-1 btn-min-35px"
                    @click.native="stats[3].effortValue = 252"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-35px"
                    @click.native="stats[3].effortValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[3].ja"
                    :value="spAttack"
                    @change="updateStats('spAttack', 3)"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="▲"
                    class="mb-1 btn-min-30px"
                    @click.native="spAttack++"
                  />
                  <br />
                  <CalcButton
                    buttonText="▼"
                    class="btn-min-30px"
                    @click.native="spAttack--"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"
                ><div class="v-input--is-disabled theme--light v-text-field">
                  <div class="v-input__control">
                    <div class="v-input__slot">
                      <div class="v-text-field__slot">
                        <label
                          class="v-label v-label--active v-label--is-disabled theme--light"
                          style="left: 0px; right: auto; position: absolute;"
                          >種族値</label
                        ><span
                          :class="[
                            'py-1',
                            {
                              'text-danger':
                                currentNature.stats.spDefence == 1.1,
                              'text-primary':
                                currentNature.stats.spDefence == 0.9,
                            },
                          ]"
                          >{{ `D${currentPokemon.stats.spDefence}` }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="個体値"
                    placeholder="0"
                    v-model.trim.number="stats[4].individualValue"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="31"
                    class="mb-1 btn-min-30px"
                    @click.native="stats[4].individualValue = 31"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-30px"
                    @click.native="stats[4].individualValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
                    placeholder="0"
                    v-model.trim.number="stats[4].effortValue"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="252"
                    class="mb-1 btn-min-35px"
                    @click.native="stats[4].effortValue = 252"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-35px"
                    @click.native="stats[4].effortValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[4].ja"
                    :value="spDefence"
                    @change="updateStats('spDefence', 4)"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="▲"
                    class="mb-1 btn-min-30px"
                    @click.native="spDefence++"
                  />
                  <br />
                  <CalcButton
                    buttonText="▼"
                    class="btn-min-30px"
                    @click.native="spDefence--"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"
                ><div class="v-input--is-disabled theme--light v-text-field">
                  <div class="v-input__control">
                    <div class="v-input__slot">
                      <div class="v-text-field__slot">
                        <label
                          class="v-label v-label--active v-label--is-disabled theme--light"
                          style="left: 0px; right: auto; position: absolute;"
                          >種族値</label
                        ><span
                          :class="[
                            'py-1',
                            {
                              'text-danger': currentNature.stats.speed == 1.1,
                              'text-primary': currentNature.stats.speed == 0.9,
                            },
                          ]"
                          >{{ `S${currentPokemon.stats.speed}` }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="個体値"
                    placeholder="0"
                    v-model.trim.number="stats[5].individualValue"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="31"
                    class="mb-1 btn-min-30px"
                    @click.native="stats[5].individualValue = 31"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-30px"
                    @click.native="stats[5].individualValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
                    placeholder="0"
                    v-model.trim.number="stats[5].effortValue"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="252"
                    class="mb-1 btn-min-35px"
                    @click.native="stats[5].effortValue = 252"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-35px"
                    @click.native="stats[5].effortValue = ''"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[5].ja"
                    :value="speed"
                    @change="updateStats('speed', 5)"
                  ></v-text-field>
                </div>
                <div>
                  <CalcButton
                    buttonText="▲"
                    class="mb-1 btn-min-30px"
                    @click.native="speed++"
                  />
                  <br />
                  <CalcButton
                    buttonText="▼"
                    class="btn-min-30px"
                    @click.native="speed--"
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
        </v-container>
      </v-col>
      <v-col cols="12" md="6" class="d-flex">
        <v-container class="contents">
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
          <!-- <TitleInDivider title="【ステータス計算機について】" /> -->
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
  </v-container>
</template>

<script>
import PokemonData from "@/components/pokemon_data.json";
import CalcButton from "@/components/CalcButton.vue";

export default {
  name: "Home",
  components: {
    CalcButton,
  },
  data: () => ({
    pokemonList: PokemonData, // ポケモンのデータはjsonファイルにまとめてあるため、そちらから取得する
    lv: 50,
    itemGroup: "持ち物なし",
    isNumber: /^([1-9]\d*|0)$/, // 1~9で始まる整数、または0であるときにtrueを返す正規表現
    currentNature: {
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
    natureList: [
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
    ],
    stats: [
      {
        en: "hp",
        ja: "ＨＰ",
        abbreviation: "H",
        individualValue: 31,
        effortValue: "",
      },
      {
        en: "attack",
        ja: "こうげき",
        abbreviation: "A",
        individualValue: 31,
        effortValue: "",
      },
      {
        en: "defence",
        ja: "ぼうぎょ",
        abbreviation: "B",
        individualValue: 31,
        effortValue: "",
      },
      {
        en: "spAttack",
        ja: "とくこう",
        abbreviation: "C",
        individualValue: 31,
        effortValue: "",
      },
      {
        en: "spDefence",
        ja: "とくぼう",
        abbreviation: "D",
        individualValue: 31,
        effortValue: "",
      },
      {
        en: "speed",
        ja: "すばやさ",
        abbreviation: "S",
        individualValue: 31,
        effortValue: "",
      },
    ],
    calcAreas: {
      calcArea1: "",
      calcArea2: "",
    },
    attackCheck: false,
    spAttackCheck: false,
  }),
  computed: {
    // ポケモンの更新には、将来的な拡張性を考慮してVuexを使用している
    currentPokemon: {
      get() {
        return this.$store.getters.currentPokemon;
      },
      set(selectedPokemon) {
        this.$store.commit("updateCurrentPokemon", selectedPokemon);
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
      if (
        this.itemGroup == "しんかのきせき" &&
        this.currentPokemon.evolutions.length
      ) {
        return this.hp * Math.floor(this.defence * 1.5);
      } else {
        return this.hp * this.defence;
      }
    },
    // 特殊耐久指数を求める
    specialDurability() {
      if (
        (this.itemGroup == "しんかのきせき" &&
          this.currentPokemon.evolutions.length) ||
        this.itemGroup == "とつげきチョッキ"
      ) {
        return this.hp * Math.floor(this.spDefence * 1.5);
      } else {
        return this.hp * this.spDefence;
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
    // ひらがなをカタカナに変換して検索するフィルター
    katakanaToHiragana(item, queryText) {
      const itemName = item.name.toLowerCase();
      const hiragana = queryText
        .toLowerCase()
        .replace(/[ぁ-ん]/g, (t) => String.fromCharCode(t.charCodeAt(0) + 96));
      // 元々の検索ワード、または、ひらがなに変換後の検索ワードと一致する結果を部分一致で表示する
      return (
        (itemName || "").indexOf(queryText) > -1 ||
        (itemName || "").indexOf(hiragana) > -1
      );
    },
    // 実数値の更新にはSetterを設定しているため、本来なら不要な関数。しかし、Vuetifyではv-modelのlazy修飾子をサポートしていないため、inputではなくchangeイベントで発火させたいケースでは、v-bind:valueとv-on:changeで分けて記述してメソッドを呼び出す必要がある。なお、inputではダメな理由としては、実数値を消しながら入力する際に、努力値が自動更新されることによって、実数値の入力が滞ってしまうから（【例】183→164→16→1）
    updateStats(statsName, index) {
      let lv = this.lv;
      if (!this.isNumber.test(lv)) {
        lv = 1;
      }
      let n = Number(event.target.value);
      let currentNatureStat = Number(this.currentNature.stats[statsName]);
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
    },
    // HPのみ計算式が異なるので別の関数を用意した
    updateHp() {
      let lv = this.lv;
      if (!this.isNumber.test(lv)) {
        lv = 1;
      }
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
    },
    // 計算結果を出力する
    outputResult(i) {
      // 実数値を取得
      let realNumbers = [
        this.hp,
        this.attack,
        this.defence,
        this.spAttack,
        this.spDefence,
        this.speed,
      ];
      if (this.attackCheck) {
        realNumbers[1] = "*";
      }
      if (this.spAttackCheck) {
        realNumbers[3] = "*";
      }
      // 各行に出力する初期値を設定
      let line1 = `${this.$store.getters.currentPokemon.name} ${this.currentNature.name}`;
      let line2 = "";
      let line3 = `${realNumbers[0]}-${realNumbers[1]}-${realNumbers[2]}-${realNumbers[3]}-${realNumbers[4]}-${realNumbers[5]}`;
      let line4 = "";
      let line5 = `${this.physicalDurability + this.specialDurability}-${
        this.physicalDurability
      }-${this.specialDurability}`;
      // 努力値が252とそれ以外の箇所に分け、それぞれ配列に格納
      let maxEv = this.stats.filter((stat) => stat.effortValue == 252);
      let noMaxEv = this.stats.filter(
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
.text-danger {
  color: #dc3545;
}

.text-primary {
  color: #1876d1;
}

/* デフォルトのボタンだと横幅が大きすぎるのを調整する */
.btn-min-30px {
  min-width: 30px !important;
}
.btn-min-35px {
  min-width: 35px !important;
}

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

/* ステータスの入力時にハイライトをつけて見やすくする */
#statsTable .row:hover:not(:last-child) {
  background-color: #eee;
}
</style>
