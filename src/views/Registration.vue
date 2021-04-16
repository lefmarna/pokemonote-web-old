<template>
  <v-container>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">新規登録</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" id="form" lazy-validation>
          <v-file-input
            accept="image/jpeg, image/png"
            name="image"
            label="アイコン"
          ></v-file-input>
          <v-text-field
            v-model="username"
            name="username"
            prepend-icon="mdi-account"
            label="ユーザー名"
          />
          <v-text-field
            v-model="nickname"
            name="nickname"
            prepend-icon="mdi-account"
            label="表示名"
          />
          <v-text-field
            v-model="email"
            name="email"
            prepend-icon="mdi-email"
            label="メールアドレス"
          />
          <v-text-field
            v-model="password"
            name="password"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
            label="パスワード"
            type="password"
          />
          <v-text-field
            v-model="password_confirmation"
            name="password_confirmation"
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
          <ErrorMeessages :errors="errors" />
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import axios from "axios";
import router from "@/router";
import ErrorMeessages from "@/components/ErrorMessages.vue";

export type DataType = {
  image: any;
  username: string;
  nickname: string;
  email: string;
  password: string;
  password_confirmation: string;
  errors: string[];
};

export default {
  name: "register",
  components: {
    ErrorMeessages,
  },
  data: (): DataType => ({
    image: "",
    username: "",
    nickname: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: [],
  }),
  methods: {
    register(): void {
      // 画像のデータはformDataを介さないと送れない
      const form: any = document.getElementById("form");
      const formData = new FormData(form);
      axios
        .post("/auth", formData)
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
          this.errors = error.response.data.errors.full_messages;
        });
    },
  },
};
</script>
