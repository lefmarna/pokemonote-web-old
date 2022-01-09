<template>
  <v-col
    cols="2"
    :class="[
      'justify-center',
      {
        'text-danger': natureStat === UPPER_NATURE,
        'text-primary': natureStat === LOWER_NATURE,
      },
    ]"
  >
    <v-text-field
      label="種族値"
      placeholder="0"
      :value="`${statsInitial}${baseStat}`"
      disabled
      persistent-placeholder
    />
  </v-col>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { CalcButton } from "@/components/molecules";
import { LOWER_NATURE, UPPER_NATURE } from "@/utils/constants";

export default defineComponent({
  components: {
    CalcButton,
  },
  props: {
    baseStat: {
      type: Number,
      required: true,
    },
    statsInitial: {
      type: String,
      required: true,
    },
    natureStat: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {
      LOWER_NATURE,
      UPPER_NATURE,
    };
  },
});
</script>
