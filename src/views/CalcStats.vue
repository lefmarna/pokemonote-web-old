<template>
  <v-container class="pa-0">
    <v-row>
      <v-col cols="12" md="6" class="py-0">
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
          <div>
            <v-row>
              <v-col cols="2">
                <div>
                  <v-text-field
                    label="種族値"
                    :value="`H${currentPokemon.stats.hp}`"
                    disabled
                  ></v-text-field>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="個体値"
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
                    @click.native="stats[0].individualValue = 0"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
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
                    @click.native="stats[0].effortValue = 0"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[0].ja"
                    v-model.trim.number="hp"
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
              <v-col cols="2">
                <div>
                  <v-text-field
                    label="種族値"
                    :value="`A${currentPokemon.stats.attack}`"
                    disabled
                  ></v-text-field>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="個体値"
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
                    @click.native="stats[1].individualValue = 0"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
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
                    @click.native="stats[1].effortValue = 0"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[1].ja"
                    v-model.trim.number="attack"
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
              <v-col cols="2">
                <div>
                  <v-text-field
                    label="種族値"
                    :value="`B${currentPokemon.stats.defence}`"
                    disabled
                  ></v-text-field>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="個体値"
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
                    @click.native="stats[2].individualValue = 0"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
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
                    @click.native="stats[2].effortValue = 0"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[2].ja"
                    v-model.trim.number="defence"
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
              <v-col cols="2">
                <div>
                  <v-text-field
                    label="種族値"
                    :value="`C${currentPokemon.stats.spAttack}`"
                    disabled
                  ></v-text-field>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="個体値"
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
                    @click.native="stats[3].individualValue = 0"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
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
                    @click.native="stats[3].effortValue = 0"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[3].ja"
                    v-model.trim.number="spAttack"
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
              <v-col cols="2">
                <div>
                  <v-text-field
                    label="種族値"
                    :value="`D${currentPokemon.stats.spDefence}`"
                    disabled
                  ></v-text-field>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="個体値"
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
                    @click.native="stats[4].individualValue = 0"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
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
                    @click.native="stats[4].effortValue = 0"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[4].ja"
                    v-model.trim.number="spDefence"
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
              <v-col cols="2">
                <div>
                  <v-text-field
                    label="種族値"
                    :value="`S${currentPokemon.stats.speed}`"
                    disabled
                  ></v-text-field>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="個体値"
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
                    @click.native="stats[5].individualValue = 0"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    label="努力値"
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
                    @click.native="stats[5].effortValue = 0"
                  />
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    type="number"
                    :label="stats[5].ja"
                    v-model.trim.number="speed"
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
            <v-row>
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
      <v-col cols="12" md="6" class="py-0">
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
            <v-checkbox v-model="attackCheck" label="A不問" dense></v-checkbox>
            <v-checkbox
              v-model="spAttackCheck"
              label="C不問"
              dense
            ></v-checkbox>
          </div>
          <!-- 保存場所は2つ作る -->
          <v-row v-for="i in 2" :key="i" id="resultArea">
            <v-col class="py-0">
              <v-textarea
                outlined
                rows="5"
                label="エリア1"
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
          <v-row class="text-justify pt-3 px-2 body-1">
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
    isNumber: /^([1-9]\d*|0)$/, // 0~9の整数であればtrueを返す正規表現
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
        effortValue: 0,
      },
      {
        en: "attack",
        ja: "こうげき",
        abbreviation: "A",
        individualValue: 31,
        effortValue: 0,
      },
      {
        en: "defence",
        ja: "ぼうぎょ",
        abbreviation: "B",
        individualValue: 31,
        effortValue: 0,
      },
      {
        en: "spAttack",
        ja: "とくこう",
        abbreviation: "C",
        individualValue: 31,
        effortValue: 0,
      },
      {
        en: "spDefence",
        ja: "とくぼう",
        abbreviation: "D",
        individualValue: 31,
        effortValue: 0,
      },
      {
        en: "speed",
        ja: "すばやさ",
        abbreviation: "S",
        individualValue: 31,
        effortValue: 0,
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
        let individualValue = this.stats[0].individualValue;
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
                this.lv) /
                100
            ) +
            10 +
            this.lv
          );
        }
      },
      set(value) {
        const n =
          (Math.ceil(((Number(value) - this.lv - 10) * 100) / this.lv) -
            this.currentPokemon.stats.hp * 2 -
            this.stats[0].individualValue) *
          4;
        if (n < 0) {
          this.stats[0].effortValue = 0;
        } else {
          this.stats[0].effortValue = n;
        }
      },
    },
    attack: {
      get() {
        let individualValue = this.stats[1].individualValue;
        if (!this.isNumber.test(individualValue)) {
          individualValue = 0;
        }
        return Math.floor(
          (Math.floor(
            ((this.currentPokemon.stats["attack"] * 2 +
              individualValue +
              Math.floor(this.stats[1].effortValue / 4)) *
              this.lv) /
              100
          ) +
            5) *
            this.currentNature.stats.attack
        );
      },
      set(value) {
        let n = Number(value);
        if (n % 11 === 10 && this.currentNature.stats.attack === 1.1) {
          if (
            n >=
            Math.floor(
              (Math.floor(
                ((this.currentPokemon.stats.attack * 2 +
                  this.stats[1].individualValue +
                  Math.floor(this.stats[1].effortValue / 4)) *
                  this.lv) /
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
          this.stats[1].effortValue = 0;
        } else {
          this.stats[1].effortValue = n;
        }
      },
    },
    defence: {
      get() {
        let individualValue = this.stats[2].individualValue;
        if (!this.isNumber.test(individualValue)) {
          individualValue = 0;
        }
        return Math.floor(
          (Math.floor(
            ((this.currentPokemon.stats["defence"] * 2 +
              individualValue +
              Math.floor(this.stats[2].effortValue / 4)) *
              this.lv) /
              100
          ) +
            5) *
            this.currentNature.stats.defence
        );
      },
      set(value) {
        let n = Number(value);
        if (n % 11 === 10 && this.currentNature.stats.defence === 1.1) {
          if (
            n >=
            Math.floor(
              (Math.floor(
                ((this.currentPokemon.stats.defence * 2 +
                  this.stats[2].individualValue +
                  Math.floor(this.stats[2].effortValue / 4)) *
                  this.lv) /
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
          this.stats[2].effortValue = 0;
        } else {
          this.stats[2].effortValue = n;
        }
      },
    },
    spAttack: {
      get() {
        let individualValue = this.stats[3].individualValue;
        if (!this.isNumber.test(individualValue)) {
          individualValue = 0;
        }
        return Math.floor(
          (Math.floor(
            ((this.currentPokemon.stats["spAttack"] * 2 +
              individualValue +
              Math.floor(this.stats[3].effortValue / 4)) *
              this.lv) /
              100
          ) +
            5) *
            this.currentNature.stats.spAttack
        );
      },
      set(value) {
        let n = Number(value);
        if (n % 11 === 10 && this.currentNature.stats.spAttack === 1.1) {
          if (
            n >=
            Math.floor(
              (Math.floor(
                ((this.currentPokemon.stats.spAttack * 2 +
                  this.stats[3].individualValue +
                  Math.floor(this.stats[3].effortValue / 4)) *
                  this.lv) /
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
          this.stats[3].effortValue = 0;
        } else {
          this.stats[3].effortValue = n;
        }
      },
    },
    spDefence: {
      get() {
        let individualValue = this.stats[4].individualValue;
        if (!this.isNumber.test(individualValue)) {
          individualValue = 0;
        }
        return Math.floor(
          (Math.floor(
            ((this.currentPokemon.stats["spDefence"] * 2 +
              individualValue +
              Math.floor(this.stats[4].effortValue / 4)) *
              this.lv) /
              100
          ) +
            5) *
            this.currentNature.stats.spDefence
        );
      },
      set(value) {
        let n = Number(value);
        if (n % 11 === 10 && this.currentNature.stats.spDefence === 1.1) {
          if (
            n >=
            Math.floor(
              (Math.floor(
                ((this.currentPokemon.stats.spDefence * 2 +
                  this.stats[4].individualValue +
                  Math.floor(this.stats[4].effortValue / 4)) *
                  this.lv) /
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
          this.stats[4].effortValue = 0;
        } else {
          this.stats[4].effortValue = n;
        }
      },
    },
    speed: {
      get() {
        let individualValue = this.stats[5].individualValue;
        if (!this.isNumber.test(individualValue)) {
          individualValue = 0;
        }
        return Math.floor(
          (Math.floor(
            ((this.currentPokemon.stats["speed"] * 2 +
              individualValue +
              Math.floor(this.stats[5].effortValue / 4)) *
              this.lv) /
              100
          ) +
            5) *
            this.currentNature.stats.speed
        );
      },
      set(value) {
        let n = Number(value);
        if (n % 11 === 10 && this.currentNature.stats.speed === 1.1) {
          if (
            n >=
            Math.floor(
              (Math.floor(
                ((this.currentPokemon.stats.speed * 2 +
                  this.stats[5].individualValue +
                  Math.floor(this.stats[5].effortValue / 4)) *
                  this.lv) /
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
          this.stats[5].effortValue = 0;
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
};
</script>

<style scoped>
.text-danger {
  color: #dc3545;
}

.btn-min-30px {
  min-width: 30px !important;
}
.btn-min-35px {
  min-width: 35px !important;
}

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
