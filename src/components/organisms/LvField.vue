<template>
  <div class="d-flex">
    <div>
      <v-text-field
        ref="lvRef"
        type="tel"
        label="レベル"
        :placeholder="String(MIN_LEVEL)"
        :value="lv"
        @input="updateLv($event)"
        persistent-placeholder
      />
    </div>
    <div>
      <CalcButton
        :buttonText="String(MAX_LEVEL)"
        class="mb-1 btn-min-sm"
        @click.native="$emit('update', MAX_LEVEL)"
      />
      <br />
      <CalcButton
        :buttonText="String(DEFAULT_LEVEL)"
        class="btn-min-sm"
        @click.native="$emit('update', DEFAULT_LEVEL)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { CalcButton } from "@/components/molecules";
import { defineComponent, ref } from "@vue/composition-api";
import { convertToHalfWidthInteger } from "@/utils/calc";
import { DEFAULT_LEVEL, MAX_LEVEL, MIN_LEVEL } from "@/utils/constants";
import { LazyValue } from "@/types";

export default defineComponent({
  components: {
    CalcButton,
  },
  props: {
    lv: {
      type: Number,
      required: false,
      default: null,
    },
  },
  setup(_, { emit }) {
    const lvRef = ref<LazyValue>();

    const updateLv = (value: string) => {
      const formatValue = convertToHalfWidthInteger(value, MAX_LEVEL, false);

      // lazyValueはVuetifyでinputタグの中身の値を示す、ここに直接代入することでリアクティブに入力を更新することができる
      lvRef.value.lazyValue = formatValue;
      emit("update", formatValue);
    };

    return {
      lvRef,
      updateLv,
      DEFAULT_LEVEL,
      MAX_LEVEL,
      MIN_LEVEL,
    };
  },
});
</script>
