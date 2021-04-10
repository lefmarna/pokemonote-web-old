<template>
  <div>
    <p>ID：{{ user.id }}</p>
    <p>名前：{{ user.name }}</p>
    <router-link :to="`/users/${this.$store.getters.userId}`"
      >マイページ</router-link
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  data: () => ({
    user: {},
  }),
  props: { id: Number },
  created() {
    // console.log(this.$route.params.id);
    axios
      .get(`/users/${this.$route.params.id}`)
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
</script>
