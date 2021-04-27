<template>
  <Form
    id="form"
    title="アカウント作成"
    buttonText="新規登録"
    :errors="errors"
    @submit="register"
  >
    <v-file-input
      accept="image/jpeg, image/png"
      name="image"
      label="アイコン"
    ></v-file-input>
    <v-text-field
      v-model="username"
      name="username"
      prepend-icon="mdi-account"
      label="ユーザー名（URLに使用されます）"
    />
    <v-text-field
      v-model="nickname"
      name="nickname"
      prepend-icon="mdi-account-outline"
      label="表示名"
    />
    <v-text-field
      v-model="email"
      name="email"
      type="email"
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
  </Form>
</template>

<script lang="ts">
import axios from "axios";
import router from "@/router";
import Form from "@/components/Form.vue";

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
    Form,
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
            userName: response.data.data["username"],
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
