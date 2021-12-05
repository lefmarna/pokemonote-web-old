<template>
  <v-btn
    @click="submit"
    :disabled="!$store.getters.isLogin || isLoading"
    large
    >{{ buttonText }}</v-btn
  >
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  props: {
    buttonText: {
      type: String,
      required: false,
      default: "送信",
    },
  },
  setup(_, { emit }) {
    const isLoading = ref(false);
    const submit = () => {
      isLoading.value = true;
      emit("submit");
      isLoading.value = false;
    };
    return {
      isLoading,
      submit,
    };
  },
});
</script>
