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

<script>
export default {
  props: {
    buttonText: String,
  },
};
</script>
