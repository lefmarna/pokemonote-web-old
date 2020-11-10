<template>
  <div>
    <h1 class="title font-weight-bold my-2">
      {{ text }}
    </h1>
    <v-divider />
  </div>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>
