<template>
  <div>
    <h1 class="title font-weight-bold my-2" id="title">
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
