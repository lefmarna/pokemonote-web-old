<template>
  <Form
    id="form"
    title="アカウント作成"
    buttonText="新規登録"
    :errors="errors"
    @submit="register"
  >
    <!-- <v-file-input
      accept="image/jpeg, image/png"
      name="icon"
      label="アイコン"
    ></v-file-input> -->
    <v-text-field
      v-model="username"
      name="username"
      prepend-icon="mdi-account"
      label="ユーザー名（URLに使用されます）"
      placeholder="英数3〜25文字で入力してください"
      :rules="[rules.required, rules.username]"
      counter
    />
    <v-text-field
      v-model="nickname"
      name="nickname"
      prepend-icon="mdi-account-outline"
      label="表示名"
      :rules="[rules.required]"
    />
    <v-text-field
      v-model="email"
      name="email"
      type="email"
      prepend-icon="mdi-email"
      label="メールアドレス"
      :rules="[rules.required, rules.email]"
    />
    <PasswordField v-model="password" name="password" />
    <PasswordField
      v-model="password_confirmation"
      name="password_confirmation"
      label="パスワード確認"
    />
  </Form>
</template>

<script lang="ts">
import axios from "axios";
import router from "@/router";
import Form from "@/components/templates/Form.vue";
import PasswordField from "@/components/molecules/PasswordField.vue";

export type DataType = {
  image: any;
  username: string;
  nickname: string;
  email: string;
  password: string;
  password_confirmation: string;
  errors: string[];
  rules: any;
};

export default {
  name: "register",
  components: {
    Form,
    PasswordField,
  },
  data: (): DataType => ({
    image: "",
    username: "",
    nickname: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: [],
    rules: {
      required: (value: any) => !!value || "この項目は必須です",
      username: (value: string) => {
        const pattern = /^[a-z\d]{3,25}$/i;
        return (
          pattern.test(value) || "ユーザー名は、英数3〜25文字で入力してください"
        );
      },
      email: (value: string) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "メールアドレスは有効ではありません";
      },
    },
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
          this.$store.dispatch("notice");
        })
        .catch((error) => {
          this.errors = error.response.data.errors.full_messages;
        });
    },
  },
};
</script>
