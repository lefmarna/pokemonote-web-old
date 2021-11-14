<template>
  <v-btn
    @click="submit"
    :disabled="!$store.getters.isLogin || isLoading"
    large
    >{{ buttonText }}</v-btn
  >
</template>

<script lang="ts">
import Vue from "vue";

export interface DataType {
  isLoading: boolean;
}

export default Vue.extend({
  props: {
    buttonText: {
      type: String,
      required: false,
      default: "送信",
    },
  },
  data: (): DataType => ({
    isLoading: false,
  }),
  methods: {
    async submit() {
      this.isLoading = true;
      await this.$emit("submit");
      this.isLoading = false;
    },
  },
});
</script>
