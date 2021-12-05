<template>
  <v-btn color="error" elevation="2" @click="unsubscribe">退会</v-btn>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { logout } from "@/utils/auth";
import { authUserName } from "@/utils/store";

export default defineComponent({
  setup() {
    const unsubscribe = () => {
      logout("delete", `/users/${authUserName.value}`);
    };
    return {
      authUserName,
      unsubscribe,
    };
  },
});
</script>
