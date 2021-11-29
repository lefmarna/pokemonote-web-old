<template>
  <v-btn
    color="secondary"
    elevation="2"
    class="px-0 centered-input"
    outlined
    small
    >{{ buttonText }}</v-btn
  >
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    buttonText: {
      type: String,
      required: true,
    },
  },
});
</script>
