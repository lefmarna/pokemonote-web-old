<template>
  <div>
    <h1 class="title font-weight-bold my-2" id="title">
      {{ text }}
    </h1>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    text: String,
    required: true,
  },
});
</script>
