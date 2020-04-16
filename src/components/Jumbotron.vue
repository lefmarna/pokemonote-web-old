<template>
  <div>
    <h1 class="mt-3 text-white font-weight-bold">{{ msg }}</h1>
    <p class="text-white">ポケモンをより楽しむためのWebアプリ</p>
  </div>
</template>

<script>
export default {
  name: "Jumbotron",
  props: {
    msg: String
  }
};
</script>
