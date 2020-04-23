<template>
  <div>
    <div class="text-center">
      <h3 class="h4">{{ day }}</h3>
    </div>
    <p>{{ content }}</p>
    <p>{{ content2 }}</p>
  </div>
</template>

<script>
export default {
  name: "updatesTemplate",
  props: {
    day: Date,
    content: String,
    content2: String
  }
};
</script>

<style lang="scss" scoped>
h3 {
  position: relative;
  display: inline-block;
  padding: 0 55px;
}
h3:before,
h3:after {
  content: "";
  position: absolute;
  top: 50%;
  display: inline-block;
  width: 45px;
  height: 1px;
  background-color: black;
}
h3:before {
  left: 0;
}
h3:after {
  right: 0;
}
</style>
