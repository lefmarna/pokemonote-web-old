<template>
  <div>
    <h3 class="h4">{{ day }}</h3>
    <p class="text-left">{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: "updatesTemplate",
  props: {
    day: Date,
    content: String
  }
};
</script>
