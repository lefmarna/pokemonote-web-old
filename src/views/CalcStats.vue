<template>
  <div class="about">
    <h1>This is an about page</h1>
    <b-button size="lg" variant="outline-primary">Bootstrap Button</b-button>
    <h1>{{ lv }}</h1>
    <div>
      レベル：
      <input type="number" id="lv" min="1" max="100" v-model.number="lv" />
      <button class="btn btn-outline-secondary btn-sm" v-on:click="lv=50">50</button>
      <button class="btn btn-outline-secondary btn-sm" v-on:click="lv=100">100</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalcStats",
  data() {
    return {
      lv: 50,
      nature: "いじっぱり"
    };
  }
};
</script>
