<template>
  <v-container :class="$vuetify.breakpoint.xs ? 'px-0' : ''">
    <div>
      <!-- ポケモン名 -->
      <SearchField
        :items="pokemonData"
        label="ポケモン名"
        itemName="ポケモン"
        :clearable="true"
        :selectItem="currentPokemon"
        @update="$emit('updatePokemon', $event)"
      />
      <v-row>
        <!-- レベル -->
        <v-col cols="4">
          <LvField :lv="lv" @update="$emit('updateLv', $event)" />
        </v-col>
        <!-- 性格 -->
        <v-col cols="8">
          <SearchField
            :items="natureData"
            label="性格"
            itemName="性格"
            :selectItem="currentNature"
            @update="$emit('updateNature', $event)"
          />
        </v-col>
      </v-row>
    </div>
    <!-- ステータス一覧 -->
    <div class="statsTable">
      <v-row v-for="(stat, index) in stats" :key="stat.en">
        <!-- 種族値 -->
        <BaseStatsField
          :baseStat="currentPokemon.stats[index]"
          :statsInitial="stat.initial"
          :natureStat="currentNature.stats[index]"
        />
        <!-- 個体値 -->
        <IndividualValueField :stats="stats" :statsIndex="index" />
        <!-- 努力値 -->
        <EffortValueField :stats="stats" :statsIndex="index" />
        <!-- 実数値 -->
        <RealNumberField
          :realNumbers="realNumbers"
          :stats="stats"
          :statsIndex="index"
          @updateRealNumber="$emit('updateRealNumber', $event, index)"
        />
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
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "@vue/composition-api";
import CalcButton from "@/components/molecules/CalcButton.vue";
import BaseStatsField from "@/components/organisms/BaseStatsField.vue";
import EffortValueField from "@/components/organisms/EffortValueField.vue";
import IndividualValueField from "@/components/organisms/IndividualValueField.vue";
import RealNumberField from "@/components/organisms/RealNumberField.vue";
import LvField from "@/components/organisms/LvField.vue";
import SearchField from "@/components/molecules/SearchField.vue";
import { LazyValue, Nature, PokemonData, Stat } from "@/types/index";
import { natureData, pokemonData } from "@/utils/store";
import {
  ATTACK_INDEX,
  DEFENCE_INDEX,
  HP_INDEX,
  LOWER_NATURE,
  MAX_EV,
  MAX_IV,
  MAX_TOTAL_EV,
  SPEED_INDEX,
  SP_ATTACK_INDEX,
  SP_DEFENCE_INDEX,
  UPPER_NATURE,
} from "@/utils/constants";
import { numberToInt, valueVerification } from "@/utils/calc";

export default defineComponent({
  components: {
    BaseStatsField,
    CalcButton,
    EffortValueField,
    IndividualValueField,
    LvField,
    RealNumberField,
    SearchField,
  },
  props: {
    currentPokemon: {
      type: Object as PropType<PokemonData>,
      required: false,
      default: () => Object,
    },
    currentNature: {
      type: Object as PropType<Nature>,
      required: false,
      default: () => Object,
    },
    lv: {
      type: Number,
      required: false,
      default: null,
    },
    realNumbers: {
      type: Array as PropType<number[]>,
      required: true,
    },
    stats: {
      type: [] as PropType<Stat[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const effortValueRefs = ref<LazyValue[]>();
    const individualValueRefs = ref<LazyValue[]>();
    const realNumberRefs = ref<LazyValue[]>();

    const updateRealNumber = (event: number, index: number): void => {
      emit("updateRealNumber", event, index);
      realNumberRefs.value[index].lazyValue = props.realNumbers[index];
    };

    const totalStats = computed(() => {
      return (
        props.realNumbers[HP_INDEX] +
        props.realNumbers[ATTACK_INDEX] +
        props.realNumbers[DEFENCE_INDEX] +
        props.realNumbers[SP_ATTACK_INDEX] +
        props.realNumbers[SP_DEFENCE_INDEX] +
        props.realNumbers[SPEED_INDEX]
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

    // 努力値の更新
    const updateEffortValue = (value: number, index: number): void => {
      const formatValue = valueVerification(value, MAX_EV);
      effortValueRefs.value[index].lazyValue = formatValue;
      props.stats[index].effortValue = formatValue;
    };

    // 個体値の更新
    const updateIndividualValue = (value: number, index: number): void => {
      const formatValue = valueVerification(value, MAX_IV);
      individualValueRefs.value[index].lazyValue = formatValue;
      props.stats[index].individualValue = formatValue;
    };

    return {
      LOWER_NATURE,
      MAX_EV,
      MAX_IV,
      MAX_TOTAL_EV,
      UPPER_NATURE,
      effortValueRefs,
      individualValueRefs,
      natureData,
      pokemonData,
      realNumberRefs,
      totalBaseStats,
      totalEv,
      totalEvCheck,
      totalIv,
      totalStats,
      updateEffortValue,
      updateIndividualValue,
      updateRealNumber,
    };
  },
});
</script>
