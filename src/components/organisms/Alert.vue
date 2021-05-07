<template>
  <transition name="notice">
    <v-alert
      type="success"
      class="alert mb-0"
      width="100%"
      v-if="$store.getters.notice"
      >ログインしました</v-alert
    >
  </transition>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    notice() {
      return this.$store.getters.notice;
    },
  },
});
</script>

<style lang="scss" scoped>
.notice-enter {
  transform: translateX(-100%) !important;
}

.notice-enter-active {
  transition: transform 250ms !important;
}

.notice-enter-to {
  transform: translateX(0) !important;
}

.notice-leave {
  opacity: 1 !important;
}

.notice-leave-active {
  transition: opacity 1s !important;
}

.notice-leave-to {
  opacity: 0 !important;
}
</style>
