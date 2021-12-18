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
        <v-col
          cols="2"
          :class="[
            'justify-center',
            {
              'text-danger': currentNature.stats[index] === UPPER_NATURE,
              'text-primary': currentNature.stats[index] === LOWER_NATURE,
            },
          ]"
        >
          <v-text-field
            label="種族値"
            placeholder="0"
            :value="`${stat.initial}${currentPokemon.stats[index]}`"
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
              @input="updateIndividualValue($event, index)"
              persistent-placeholder
            />
          </div>
          <div>
            <CalcButton
              :buttonText="String(MAX_IV)"
              class="mb-1 btn-min-xs"
              @click.native="updateIndividualValue(MAX_IV, index)"
            />
            <br />
            <CalcButton
              buttonText="0"
              class="btn-min-xs"
              @click.native="updateIndividualValue(null, index)"
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
              @input="updateEffortValue($event, index)"
              persistent-placeholder
            />
          </div>
          <div>
            <CalcButton
              :buttonText="String(MAX_EV)"
              class="mb-1 btn-min-sm"
              @click.native="updateEffortValue(MAX_EV, index)"
            />
            <br />
            <CalcButton
              buttonText="0"
              class="btn-min-sm"
              @click.native="updateEffortValue(null, index)"
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
              :label="stats[index].name"
              :value="realNumbers[index]"
              @change="updateRealNumber($event, index)"
              persistent-placeholder
            />
          </div>
          <div>
            <CalcButton
              buttonText="▲"
              class="mb-1 btn-min-xs"
              @click.native="updateRealNumber(realNumbers[index] + 1, index)"
            />
            <br />
            <CalcButton
              buttonText="▼"
              class="btn-min-xs"
              @click.native="updateRealNumber(realNumbers[index] - 1, index)"
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
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "@vue/composition-api";
import CalcButton from "@/components/molecules/CalcButton.vue";
import SearchField from "@/components/molecules/SearchField.vue";
import LvField from "@/components/organisms/LvField.vue";
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
    CalcButton,
    LvField,
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
