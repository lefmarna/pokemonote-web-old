<template>
  <v-container>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">
          ログイン
        </h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
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
          <v-card-actions>
            <v-btn
              @click="login"
              color="light-green darken-1"
              class="white--text"
            >
              ログイン
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
  email: string;
  password: string;
};

export default {
  name: "login",
  data: (): DataType => ({
    email: "",
    password: "",
  }),
  methods: {
    login(): void {
      axios
        .post("/auth/sign_in", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$store.dispatch("setAuthData", {
            userId: response.data.data["id"],
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
