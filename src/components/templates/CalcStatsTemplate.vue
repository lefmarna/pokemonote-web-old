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
                    'text-danger': currentNature.stats[stat.en] == UPPER_NATURE,
                    'text-primary':
                      currentNature.stats[stat.en] == LOWER_NATURE,
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
                    ref="individualValueRefs"
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
                    :buttonText="String(MAX_IV)"
                    class="mb-1 btn-min-xs"
                    @click.native="
                      updateIndividualValue(MAX_IV, stat.en, index)
                    "
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-xs"
                    @click.native="updateIndividualValue(null, stat.en, index)"
                  />
                </div>
              </v-col>
              <!-- 努力値 -->
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    ref="effortValueRefs"
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
                    :buttonText="String(MAX_EV)"
                    class="mb-1 btn-min-sm"
                    @click.native="updateEffortValue(MAX_EV, stat.en, index)"
                  />
                  <br />
                  <CalcButton
                    buttonText="0"
                    class="btn-min-sm"
                    @click.native="updateEffortValue(null, stat.en, index)"
                  />
                </div>
              </v-col>
              <!-- 実数値 -->
              <v-col class="d-flex justify-center">
                <div>
                  <!-- 努力値が自動更新されることによって実数値の入力を妨げてしまうため、実数値はinputではなくchangeで発火させている
                  なお、Vuetifyではv-modelのlazy修飾子をサポートしていないため、:valueと@changeで分けて書く必要がある -->
                  <v-text-field
                    ref="realNumberRefs"
                    type="number"
                    :label="stats[index].ja"
                    :value="realNumbers[stat.en]"
                    @change="setStat($event, stat.en, index)"
                    persistent-placeholder
                  />
                </div>
                <div>
                  <CalcButton
                    buttonText="▲"
                    class="mb-1 btn-min-xs"
                    @click.native="statPlus(stat.en, index)"
                  />
                  <br />
                  <CalcButton
                    buttonText="▼"
                    class="btn-min-xs"
                    @click.native="statMinus(stat.en, index)"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row class="font-weight-bold">
              <v-col cols="2" class="d-flex justify-center">
                <p class="mb-0">{{ totalBaseStats }}</p>
              </v-col>
              <v-col cols="3" class="d-flex justify-center">
                <span class="pr-1">{{ totalIv }}</span>
              </v-col>
              <v-col class="d-flex justify-center">
                <span class="pr-1" :class="totalEvCheck">{{ totalEv }}</span
                >/&nbsp;{{ MAX_TOTAL_EV }}
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
                        :items="DEFENCE_ENHANCEMENTS"
                        item-text="name"
                        item-value="value"
                        label="防御"
                      ></v-select>
                      <v-select
                        v-model="selectSpDefenceEnhancement"
                        :items="SP_DEFENCE_ENHANCEMENTS"
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
import { computed, defineComponent, ref, PropType } from "@vue/composition-api";
import CalcButton from "@/components/molecules/CalcButton.vue";
import PokemonParams from "@/components/organisms/PokemonParams.vue";
import { numberToInt, valueVerification } from "@/utils/calc";
import {
  DEFENCE_ENHANCEMENTS,
  LOWER_NATURE,
  MAX_EV,
  MAX_IV,
  MAX_TOTAL_EV,
  SP_DEFENCE_ENHANCEMENTS,
  UPPER_NATURE,
} from "@/utils/constants";
import { LazyValue, Nature, PokemonData, Stat } from "@/types/index";

export default defineComponent({
  components: {
    CalcButton,
    PokemonParams,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    currentPokemon: {
      type: Object as PropType<PokemonData>,
      required: true,
    },
    currentNature: {
      type: Object as PropType<Nature>,
      required: true,
    },
    lv: {
      type: Number,
      required: false,
      default: null,
    },
    stats: {
      type: [] as PropType<Stat[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectDefenceEnhancement = ref(1);
    const selectSpDefenceEnhancement = ref(1);
    const calcStyle = ref("balance");
    const description = ref("");

    const effortValueRefs = ref<LazyValue[]>();
    const individualValueRefs = ref<LazyValue[]>();
    const realNumberRefs = ref<LazyValue[]>();

    const totalStats = computed(() => {
      return (
        realNumbers.value.hp +
        realNumbers.value.attack +
        realNumbers.value.defence +
        realNumbers.value.spAttack +
        realNumbers.value.spDefence +
        realNumbers.value.speed
      );
    });

    // 種族値の合計値を計算する
    const totalBaseStats = computed(() => {
      return Object.values(props.currentPokemon.stats).reduce((sum, stat) => {
        sum += stat;
        return sum;
      }, 0);
    });

    // 個体値の合計値を計算する
    const totalIv = computed(() => {
      return props.stats.reduce((sum, stat) => {
        sum += numberToInt(stat.individualValue);
        return sum;
      }, 0);
    });

    // 努力値の合計値を計算する
    const totalEv = computed(() => {
      return props.stats.reduce((sum, stat) => {
        sum += numberToInt(stat.effortValue);
        return sum;
      }, 0);
    });

    // 努力値の合計が最大値より大きい場合は警告を出す
    const totalEvCheck = computed(() => {
      if (totalEv.value > MAX_TOTAL_EV) return "text-danger";
      return "";
    });

    // 物理耐久指数を求める
    const physicalDurability = computed(() => {
      return (
        realNumbers.value.hp *
        Math.floor(realNumbers.value.defence * selectDefenceEnhancement.value)
      );
    });

    // 特殊耐久指数を求める
    const specialDurability = computed(() => {
      return (
        realNumbers.value.hp *
        Math.floor(
          realNumbers.value.spDefence * selectSpDefenceEnhancement.value
        )
      );
    });

    // めざめるパワーのタイプを求める
    const hiddenPower = computed(() => {
      let hiddenPowerCalc = 0;
      for (let i = 0, len = props.stats.length; i < len; i++) {
        if (props.stats[i].individualValue % 2 == 1) {
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
    });

    // 努力値の更新
    const updateEffortValue = (
      value: number,
      statsName: string,
      index: number
    ): void => {
      const formatValue = valueVerification(value, MAX_EV);
      effortValueRefs.value[index].lazyValue = formatValue;
      props.stats[index].effortValue = formatValue;
    };

    // 個体値の更新
    const updateIndividualValue = (
      value: number,
      statsName: string,
      index: number
    ): void => {
      const formatValue = valueVerification(value, MAX_IV);
      individualValueRefs.value[index].lazyValue = formatValue;
      props.stats[index].individualValue = formatValue;
    };

    // 実数値を+1するボタンを設置
    const statPlus = (statsName: string, index: number): void => {
      setStat(realNumbers.value[statsName] + 1, statsName, index);
    };

    // 実数値を-1するボタンを設置
    const statMinus = (statsName: string, index: number): void => {
      setStat(realNumbers.value[statsName] - 1, statsName, index);
    };

    // 実数値を計算して返す
    const getStat = (statsName: string, index: number, tmpEV = 0): number => {
      const formatLv = numberToInt(Number(props.lv), 1);
      const formatIndividualValue = numberToInt(
        props.stats[index].individualValue
      );
      let formatEffortValue = 0;
      // 耐久調整ボタンから呼び出した場合は、仮の努力値を代入する
      if (tmpEV) {
        formatEffortValue = tmpEV;
      } else {
        formatEffortValue = numberToInt(props.stats[index].effortValue);
      }
      if (statsName == "hp") {
        if (props.currentPokemon.name == "ヌケニン") return 1;
        return (
          Math.floor(
            ((props.currentPokemon.stats[statsName] * 2 +
              formatIndividualValue +
              Math.floor(formatEffortValue / 4)) *
              formatLv) /
              100
          ) +
          10 +
          formatLv
        );
      } else {
        return Math.floor(
          (Math.floor(
            ((props.currentPokemon.stats[statsName] * 2 +
              formatIndividualValue +
              Math.floor(formatEffortValue / 4)) *
              formatLv) /
              100
          ) +
            5) *
            props.currentNature.stats[statsName]
        );
      }
    };

    // 実数値から努力値の逆算を行う
    const setStat = (event: number, statsName: string, index: number): void => {
      let setValue = Number(event); // eventで取ってきたものはstring型になってしまうため、明示的にキャストの処理を記載している
      const formatLv = numberToInt(Number(props.lv), 1);
      const formatIndividualValue = numberToInt(
        props.stats[index].individualValue
      );
      // HPのみ計算式が異なる
      if (statsName == "hp") {
        setValue =
          (Math.ceil(((setValue - formatLv - 10) * 100) / formatLv) -
            props.currentPokemon.stats.hp * 2 -
            formatIndividualValue) *
          4;
        // HP以外の計算では、性格補正を修正してから努力値の逆算を行う必要がある
      } else {
        const effortValue = numberToInt(props.stats[index].effortValue);
        const currentNatureStat = props.currentNature.stats[statsName];
        if (setValue % 11 === 10 && currentNatureStat === UPPER_NATURE) {
          if (
            setValue >=
            Math.floor(
              (Math.floor(
                ((props.currentPokemon.stats[statsName] * 2 +
                  formatIndividualValue +
                  Math.floor(effortValue / 4)) *
                  formatLv) /
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
        if (currentNatureStat === UPPER_NATURE) {
          setValue = Math.ceil(setValue / UPPER_NATURE);
        } else if (currentNatureStat === LOWER_NATURE) {
          setValue = Math.ceil(setValue / LOWER_NATURE);
        }
        setValue =
          (Math.ceil(((setValue - 5) * 100) / formatLv) -
            props.currentPokemon.stats[statsName] * 2 -
            formatIndividualValue) *
          4;
      }
      // 【共通の処理】計算した値を代入する
      setValue = valueVerification(setValue, MAX_EV);
      props.stats[index].effortValue = setValue;

      realNumberRefs.value[index].lazyValue = getStat(statsName, index);
    };

    // 努力値をリセットする
    const resetEffortValue = (): void => {
      props.stats.forEach((stat) => {
        stat.effortValue = null;
      });
    };

    // 理想の耐久調整を自動で計算する関数
    const durabilityAdjustment = (): void => {
      // 攻撃、特攻、素早さの努力値を除いた値を求める
      const remainderEffortValue =
        MAX_TOTAL_EV -
        props.stats[1].effortValue -
        props.stats[3].effortValue -
        props.stats[5].effortValue;

      // 計算に使う努力値を一時的に格納しておくための変数
      let tmpHpEV = remainderEffortValue; // HPから順に計算していくので、最初に余りの努力値をそのまま代入している
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

      // HBDの努力値を一度リセットする(不要な処理のような気もするが、これを記載しないと努力値の合計が最大値を超えてしまうことがある)
      props.stats[0].effortValue = 0;
      props.stats[2].effortValue = 0;
      props.stats[4].effortValue = 0;

      // 努力値の余りが最大値より大きかった場合、スタートであるHPの仮努力値を最大値とする
      if (tmpHpEV > MAX_EV) tmpHpEV = MAX_EV;

      // HP→特防→防御の順に総当たりで計算していく
      while (tmpHpEV >= 0) {
        tmpHp = getStat("hp", 0, tmpHpEV); // HPの努力値からHPの実数値を計算
        tmpSpDefenceEV = remainderEffortValue - tmpHpEV;
        if (tmpSpDefenceEV > MAX_EV) {
          tmpSpDefenceEV = MAX_EV;
        }
        // 防御より先に特防を計算することで、端数が出た場合に特防に割り振られるようになる(ダウンロード対策でB<Dのほうが好まれることから、このような仕様にしている)
        while (tmpSpDefenceEV >= 0) {
          tmpSpDefence = getStat("spDefence", 4, tmpSpDefenceEV); // 特防の努力値から特防の実数値を計算
          tmpDefenceEV = remainderEffortValue - tmpHpEV - tmpSpDefenceEV;
          // 防御の仮努力値が最大値を超えてしまう場合には値を更新しない
          if (tmpDefenceEV > MAX_EV) break;

          tmpDefence = getStat("defence", 2, tmpDefenceEV); // 防御の努力値から防御の実数値を計算

          // 耐久補正込での耐久値を求める
          tmpDefenceEnhancement = Math.floor(
            tmpDefence * selectDefenceEnhancement.value
          );
          tmpSpDefenceEnhancement = Math.floor(
            tmpSpDefence * selectSpDefenceEnhancement.value
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
      setStat(resultHp, "hp", 0);
      setStat(resultDefence, "defence", 2);
      setStat(resultSpDefence, "spDefence", 4);
    };

    // ポケモンのデータを親に渡す
    const emitPokemon = (): void => {
      const params = {
        name: props.currentPokemon.name,
        nature: props.currentNature.name,
        lv: props.lv,
        hp_iv: props.stats[0].individualValue,
        hp_ev: props.stats[0].effortValue,
        hp: realNumbers.value.hp,
        attack_iv: props.stats[1].individualValue,
        attack_ev: props.stats[1].effortValue,
        attack: realNumbers.value.attack,
        defence_iv: props.stats[2].individualValue,
        defence_ev: props.stats[2].effortValue,
        defence: realNumbers.value.defence,
        sp_attack_iv: props.stats[3].individualValue,
        sp_attack_ev: props.stats[3].effortValue,
        sp_attack: realNumbers.value.spAttack,
        sp_defence_iv: props.stats[4].individualValue,
        sp_defence_ev: props.stats[4].effortValue,
        sp_defence: realNumbers.value.spDefence,
        speed_iv: props.stats[5].individualValue,
        speed_ev: props.stats[5].effortValue,
        speed: realNumbers.value.speed,
        description: description.value,
        is_public: 1,
      };
      emit("submit", params);
    };

    /**
     * 実数値は努力値の更新による自動計算によって求めるため、直接代入してはいけない。
     */
    const realNumbers = computed(() => {
      return {
        hp: getStat("hp", 0),
        attack: getStat("attack", 1),
        defence: getStat("defence", 2),
        spAttack: getStat("spAttack", 3),
        spDefence: getStat("spDefence", 4),
        speed: getStat("speed", 5),
      };
    });

    return {
      DEFENCE_ENHANCEMENTS,
      LOWER_NATURE,
      MAX_EV,
      MAX_IV,
      MAX_TOTAL_EV,
      SP_DEFENCE_ENHANCEMENTS,
      UPPER_NATURE,
      calcStyle,
      description,
      effortValueRefs,
      hiddenPower,
      individualValueRefs,
      physicalDurability,
      realNumberRefs,
      realNumbers,
      selectDefenceEnhancement,
      selectSpDefenceEnhancement,
      specialDurability,
      totalBaseStats,
      totalEvCheck,
      totalEv,
      totalIv,
      totalStats,
      durabilityAdjustment,
      emitPokemon,
      setStat,
      statMinus,
      statPlus,
      resetEffortValue,
      updateEffortValue,
      updateIndividualValue,
    };
  },
});
</script>
