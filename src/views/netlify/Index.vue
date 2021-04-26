<template>
  <form name="contact" method="POST" @submit.prevent="handleSubmit" netlify>
    <p>
      <input type="hidden" name="form-name" value="contact" />
      <label>Your Name: <input type="text" name="name" /></label>
    </p>
    <p>
      <label>Your Email: <input type="email" name="email" /></label>
    </p>
    <p>
      <label>Message: <textarea name="message"></textarea></label>
    </p>
    <p>
      <button type="submit">Send</button>
    </p>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    handleSubmit() {
      const axiosConfig: any = {
        header: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      axios.post(
        "/",
        this.encode({
          "form-name": "contact",
          ...this.form,
        }),
        axiosConfig
      );
    },
  },
});
</script>
