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
import Vue from "vue";

export default Vue.extend({
  props: {
    buttonText: String,
  },
});
</script>
