<template>
  <v-col class="d-flex justify-center">
    <div>
      <v-text-field
        ref="effortValueRef"
        type="tel"
        label="努力値"
        placeholder="0"
        :value="stats[statsIndex].effortValue"
        @input="updateEffortValue($event, statsIndex)"
        persistent-placeholder
      />
    </div>
    <div>
      <CalcButton
        :buttonText="String(MAX_EV)"
        class="mb-1 btn-min-sm"
        @click.native="updateEffortValue(MAX_EV, statsIndex)"
      />
      <br />
      <CalcButton
        buttonText="0"
        class="btn-min-sm"
        @click.native="updateEffortValue(null, statsIndex)"
      />
    </div>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "@vue/composition-api";
import { CalcButton } from "@/components/molecules";
import { LazyValue, Stat } from "@/types";
import { convertToHalfWidthInteger } from "@/utils/calc";
import { MAX_EV } from "@/utils/constants";

export default defineComponent({
  components: {
    CalcButton,
  },
  props: {
    stats: {
      type: [] as PropType<Stat[]>,
      required: true,
    },
    statsIndex: {
      type: Number,
      required: true,
    },
  },
  setup(_, { emit }) {
    const effortValueRef = ref<LazyValue>();

    const updateEffortValue = (value: string | number, index: number): void => {
      const formatValue = convertToHalfWidthInteger(value, MAX_EV);

      effortValueRef.value.lazyValue = formatValue;
      emit("updateEffortValue", formatValue, index);
    };

    return {
      MAX_EV,
      effortValueRef,
      updateEffortValue,
    };
  },
});
</script>
