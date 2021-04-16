<template>
  <div>
    <p v-if="user.image">{{ user.image }}</p>
    <p>ID：{{ user.id }}</p>
    <p>ユーザー名：{{ user.username }}</p>
    <p>表示名：{{ user.nickname }}</p>
    <!-- <router-link :to="`/users/${this.$store.getters.userId}`"
      >マイページ</router-link
    > -->
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
