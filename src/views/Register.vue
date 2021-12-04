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
      label="ユーザー名"
      placeholder="英数5〜15文字で入力してください。"
      :rules="[rules.required, rules.username]"
      counter
      persistent-placeholder
    />
    <v-text-field
      v-model="nickname"
      name="nickname"
      prepend-icon="mdi-account-outline"
      label="ニックネーム"
      placeholder="4〜50文字で入力してください。"
      :rules="[rules.required, rules.nickname]"
      counter
      persistent-placeholder
    />
    <EmailField :email.sync="email" name="email" />
    <PasswordField :password.sync="password" name="password" />
    <PasswordField
      :password.sync="password_confirmation"
      name="password_confirmation"
      label="パスワード確認"
    />
  </Form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";
import axios from "axios";
import router from "@/router";
import Form from "@/components/templates/Form.vue";
import EmailField from "@/components/molecules/EmailField.vue";
import PasswordField from "@/components/molecules/PasswordField.vue";
import store from "@/store";

export default defineComponent({
  components: {
    Form,
    EmailField,
    PasswordField,
  },
  setup() {
    // const image = ref();
    const username = ref<string>("");
    const nickname = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");
    const password_confirmation = ref<string>("");
    const errors = ref<string[]>([]);

    const rules = computed(() => {
      return {
        required: (value: any) => !!value || "この項目は必須です",
        username: (value: string) => {
          const pattern = /^[a-z\d]{5,15}$/i;
          return pattern.test(value) || "英数5〜15文字で入力してください。";
        },
        nickname: (value: string) => {
          const length = value.length;
          return (
            (4 <= length && length <= 50) || "4〜50文字で入力してください。"
          );
        },
      };
    });

    const register = (): void => {
      // 画像のデータはformDataを介さないと送れない
      const form = document.getElementById("form") as HTMLFormElement;
      const formData = new FormData(form);
      axios
        .post("/register", formData)
        .then((response) => {
          // Vuexに認証情報を保存する
          store.commit("updateAuthUser", response.data.data);
          router.push("/");
          store.dispatch("notice");
        })
        .catch((error) => {
          errors.value = [];
          const errorsMessages: string[] = error.response.data.errors;
          Object.values(errorsMessages).forEach((errorMessages) => {
            errors.value.push(errorMessages[0]);
          });
        });
    };

    return {
      username,
      nickname,
      email,
      password,
      password_confirmation,
      rules,
      errors,
      register,
    };
  },
});
</script>
