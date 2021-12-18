<template>
  <v-col class="d-flex justify-center">
    <div>
      <!-- 努力値が自動更新されることによって実数値の入力を妨げてしまうため、実数値はinputではなくchangeで発火させている
                  なお、Vuetifyではv-modelのlazy修飾子をサポートしていないため、:valueと@changeで分けて書く必要がある -->
      <v-text-field
        ref="realNumberRef"
        type="number"
        :label="stats[statsIndex].name"
        :value="realNumber"
        @change="updateRealNumber($event, statsIndex)"
        persistent-placeholder
      />
    </div>
    <div>
      <CalcButton
        buttonText="▲"
        class="mb-1 btn-min-xs"
        @click.native="updateRealNumber(realNumber + 1, statsIndex)"
      />
      <br />
      <CalcButton
        buttonText="▼"
        class="btn-min-xs"
        @click.native="updateRealNumber(realNumber - 1, statsIndex)"
      />
    </div>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "@vue/composition-api";
import CalcButton from "@/components/molecules/CalcButton.vue";
import { LazyValue, Stat } from "@/types";

export default defineComponent({
  components: {
    CalcButton,
  },
  props: {
    realNumber: {
      type: Number,
      required: true,
    },
    stats: {
      type: [] as PropType<Stat[]>,
      required: true,
    },
    statsIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const realNumberRef = ref<LazyValue>();

    const updateRealNumber = (event: number, index: number): void => {
      emit("updateRealNumber", event, index);
      realNumberRef.value.lazyValue = props.realNumber;
    };

    return {
      realNumberRef,
      updateRealNumber,
    };
  },
});
</script>
