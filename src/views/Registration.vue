<template>
  <v-container>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">
          新規登録
        </h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="name"
            prepend-icon="mdi-account"
            label="ユーザー名"
          />
          <v-text-field
            v-model="email"
            prepend-icon="mdi-email"
            label="メールアドレス"
          />
          <v-text-field
            v-model="password"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
            label="パスワード"
            type="password"
          />
          <v-text-field
            v-model="password_confirmation"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
            label="パスワード確認"
            type="password"
          />
          <v-card-actions>
            <v-btn
              @click="register"
              color="light-green darken-1"
              class="white--text"
            >
              新規登録
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import axios from "axios";
import router from "@/router";

export type DataType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default {
  name: "register",
  data: (): DataType => ({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  }),
  methods: {
    register(): void {
      axios
        .post("/auth", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then((response) => {
          this.$store.dispatch("setAuthData", {
            accessToken: response.headers["access-token"],
            client: response.headers["client"],
            uid: response.headers["uid"],
          });
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
