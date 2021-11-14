<template>
  <v-container>
    <form @submit.prevent="handleSubmit">
      <v-card max-width="540px" class="mx-auto mt-5">
        <v-card-title>
          <v-card-title class="mx-auto">Pokemonote - お問い合わせ</v-card-title>
        </v-card-title>
        <v-card-text>
          <v-text-field
            type="text"
            name="name"
            v-model="name"
            prepend-icon="mdi-account"
            label="お名前"
          />
          <v-text-field
            type="email"
            name="email"
            v-model="email"
            prepend-icon="mdi-email"
            label="メールアドレス"
          />
          <v-textarea
            name="message"
            outlined
            v-model="message"
            prepend-icon="mdi-card-text"
            label="お問い合わせ内容"
          ></v-textarea>
          <v-card-actions>
            <v-btn type="submit" class="mx-auto px-5" color="info" large
              >送信する</v-btn
            >
          </v-card-actions>
        </v-card-text>
      </v-card>
    </form>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import router from "@/router";

export default Vue.extend({
  data: () => ({
    name: "",
    email: "",
    message: "",
  }),
  methods: {
    handleSubmit() {
      axios
        .post("/lefmarna_otoiawase", {
          name: this.name,
          email: this.email,
          message: this.message,
        })
        .then(() => {
          router.push("/lefmarna_otoiawase/thanks");
        })
        .catch(() => {
          router.push("/");
        });
    },
  },
});
</script>
