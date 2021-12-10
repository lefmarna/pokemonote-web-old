<template>
  <v-container>
    <Title text="素早さ計算機（ポケモン剣盾）" />
    <v-row>
      <v-col cols="12" md="6" class="d-flex">
        <v-container :class="$vuetify.breakpoint.xs ? 'px-0' : ''">
          <PokemonParams
            :currentPokemon="currentPokemon"
            :currentNature="currentNature"
            :lv="lv"
            @updatePokemon="currentPokemon = $event"
            @updateNature="currentNature = $event"
            @updateLv="lv = $event"
          />
          <!-- ステータス -->
          <div class="statsTable">
            <v-row>
              <!-- 種族値 -->
              <v-col
                cols="2"
                :class="[
                  'justify-center',
                  {
                    'text-danger': currentNature.stats['speed'] === 1.1,
                    'text-primary': currentNature.stats['speed'] === 0.9,
                  },
                ]"
              >
                <v-text-field
                  label="種族値"
                  placeholder="0"
                  :value="`${stats[5].abbreviation}${currentPokemon.stats['speed']}`"
                  disabled
                  persistent-placeholder
                />
              </v-col>
              <!-- 個体値 -->
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    ref="speedIndividualValue"
                    type="number"
                    label="個体値"
                    placeholder="0"
                    :value="stats[5].individualValue"
                    @input="updateSpeedIndividualValue($event)"
                    persistent-placeholder
                  />
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
              <!-- 努力値 -->
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    ref="speedEffortValue"
                    type="number"
                    label="努力値"
                    placeholder="0"
                    :value="stats[5].effortValue"
                    @input="updateSpeedEffortValue($event)"
                    persistent-placeholder
                  />
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
              <!-- 実数値 -->
              <v-col class="d-flex justify-center">
                <div>
                  <v-text-field
                    ref="speedRef"
                    type="number"
                    :label="stats[5].ja"
                    :value="speed"
                    @change="setSpeed($event)"
                    persistent-placeholder
                  />
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
          <!-- 道具 -->
          <div class="px-0 pt-3">
            <div>
              <div>
                <v-select
                  v-model="selectItem"
                  :items="SPEED_ITEMS"
                  item-text="name"
                  item-value="value"
                  label="道具"
                ></v-select>
              </div>
              <!-- 特性 -->
              <div>
                <v-select
                  v-model="selectAbility"
                  :items="SPEED_ABILITIES"
                  item-text="name"
                  item-value="value"
                  label="特性"
                ></v-select>
              </div>
            </div>
            <!-- 状態 -->
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
            <v-switch label="±4以上も表示する" v-model="option" dense />
            <v-divider v-if="$vuetify.breakpoint.sm" />
          </div>
        </v-container>
      </v-col>
      <v-col cols="12" md="6" class="d-flex pb-0">
        <v-divider
          v-if="!$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
          vertical
        />
        <!-- 素早さのリスト -->
        <v-simple-table style="width: 100%">
          <thead>
            <tr>
              <th class="thead-align-center">ランク</th>
              <th class="thead-align-center">素早さ</th>
            </tr>
          </thead>
          <!-- 浮動小数点数により誤差が生じるのを防ぐため、あらかじめ100倍した数値を引数に渡し、計算後の結果を1/100にして返すようにしている -->
          <tbody align="center">
            <tr v-for="rank in filteredRanks" :key="rank.id">
              <td>{{ formatRank(rank.magnification) }}</td>
              <td>
                {{ calcBaseSpeed(rank.percent) }} ({{
                  calcSpeed(rank.percent)
                }})
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";
import CalcButton from "@/components/molecules/CalcButton.vue";
import PokemonParams from "@/components/organisms/PokemonParams.vue";
import { numberToInt, valueVerification } from "@/utils/calc";
import { RANKS, SPEED_ABILITIES, SPEED_ITEMS } from "@/utils/constants";
import { currentNature, currentPokemon, lv, stats } from "@/utils/store";

export default defineComponent({
  components: {
    CalcButton,
    PokemonParams,
  },
  setup() {
    const speedRef = ref<{ lazyValue: number | string }>();
    const speedIndividualValue = ref<{ lazyValue: number | string }>();
    const speedEffortValue = ref<{ lazyValue: number | string }>();
    const tailwind = ref(1);
    const paralysis = ref(10);
    const swamp = ref(100);
    const option = ref(false);
    const selectItem = ref(10);
    const selectAbility = ref(10);

    const speed = computed({
      get: () => getSpeed(),
      set: (value: number) => setSpeed(value),
    });

    const filteredRanks = computed(() => {
      if (option.value) return RANKS;
      return RANKS.filter((rank) => Math.abs(rank.magnification) <= 3);
    });

    const formatRank = (magnification: number): string => {
      if (magnification > 0) return `+${magnification}`;
      if (magnification === 0) return `±${magnification}`;
      return String(magnification);
    };

    /**
     * 努力値の更新
     */
    const updateSpeedEffortValue = (value: number): void => {
      value = valueVerification(value, 252);
      speedEffortValue.value.lazyValue = value;
      stats.value[5].effortValue = value;
    };

    /**
     * 個体値の更新
     */
    const updateSpeedIndividualValue = (value: number): void => {
      value = valueVerification(value, 31);
      speedIndividualValue.value.lazyValue = value;
      stats.value[5].individualValue = value;
    };

    /**
     * 実数値を計算して返す
     */
    const getSpeed = (): number => {
      const formatLv = numberToInt(lv.value, 1);
      const individualValue = numberToInt(stats.value[5].individualValue);
      const effortValue = numberToInt(stats.value[5].effortValue);
      return Math.floor(
        (Math.floor(
          ((currentPokemon.value.stats["speed"] * 2 +
            individualValue +
            Math.floor(effortValue / 4)) *
            formatLv) /
            100
        ) +
          5) *
          currentNature.value.stats["speed"]
      );
    };

    /**
     * 実数値から努力値の逆算を行う
     */
    const setSpeed = (event: number) => {
      let setValue = Number(event); // eventで取ってきたものはstring型になってしまうため、明示的にキャストの処理を記載している
      const formatLv = numberToInt(lv.value, 1);
      const individualValue = numberToInt(stats.value[5].individualValue);
      const effortValue = numberToInt(stats.value[5].effortValue);
      const currentNatureStat = currentNature.value.stats["speed"];
      if (setValue % 11 === 10 && currentNatureStat === 1.1) {
        if (
          setValue >=
          Math.floor(
            (Math.floor(
              ((currentPokemon.value.stats["speed"] * 2 +
                individualValue +
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
      if (currentNatureStat === 1.1) {
        setValue = Math.ceil(setValue / 1.1);
      } else if (currentNatureStat === 0.9) {
        setValue = Math.ceil(setValue / 0.9);
      }
      setValue =
        (Math.ceil(((setValue - 5) * 100) / formatLv) -
          currentPokemon.value.stats["speed"] * 2 -
          individualValue) *
        4;
      // 計算した値を代入する
      setValue = valueVerification(setValue, 252);
      stats.value[5].effortValue = setValue;
      speedRef.value.lazyValue = getSpeed();
    };

    /**
     * 素早さリストに表示する値を計算する
     */
    const calcSpeed = (percent: number) => {
      // 特性が「はやあし・かるわざ」のときは計算の順番を変える
      if (selectAbility.value === 2) {
        return Math.floor(
          (Math.floor(
            (Math.floor((calcBaseSpeed(percent) * selectItem.value) / 10) *
              paralysis.value) /
              10
          ) *
            2 *
            tailwind.value *
            swamp.value) /
            100
        );
        // 特性がその他であれば通常通り計算する
      } else {
        return Math.floor(
          (Math.floor(
            (Math.floor(
              (Math.floor((calcBaseSpeed(percent) * selectAbility.value) / 10) *
                selectItem.value) /
                10
            ) *
              paralysis.value) /
              10
          ) *
            tailwind.value *
            swamp.value) /
            100
        );
      }
    };

    const calcBaseSpeed = (percent: number) => {
      return Math.floor((speed.value * percent) / 100);
    };

    return {
      SPEED_ABILITIES,
      SPEED_ITEMS,
      currentPokemon,
      currentNature,
      lv,
      option,
      paralysis,
      selectAbility,
      selectItem,
      speed,
      speedEffortValue,
      speedIndividualValue,
      filteredRanks,
      speedRef,
      stats,
      swamp,
      tailwind,
      calcBaseSpeed,
      calcSpeed,
      formatRank,
      setSpeed,
      updateSpeedIndividualValue,
      updateSpeedEffortValue,
    };
  },
});
</script>

<style lang="scss" scoped>
// Tableのヘッダー部分は、importantで強行しないと左揃えになってしまう
.thead-align-center {
  text-align: center !important;
}
</style>
