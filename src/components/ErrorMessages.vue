<template>
  <v-list>
    <v-list-item v-for="(error, index) in errors" :key="index">
      <v-list-item-icon>
        <v-icon class="error-message">mdi-alert-circle</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="error-message">{{ error }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    errors: Array,
  },
});
</script>

<style lang="scss" scoped>
.error-message {
  color: #d32f2f;
}
</style>
