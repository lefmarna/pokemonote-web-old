<template>
  <FormTemplate
    name="form"
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
  </FormTemplate>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/composition-api";
import FormTemplate from "@/components/templates/FormTemplate.vue";
import EmailField from "@/components/molecules/EmailField.vue";
import PasswordField from "@/components/molecules/PasswordField.vue";
import { login } from "@/utils/auth";
import { exceptionErrorToArray } from "@/utils/error";

export default defineComponent({
  components: {
    FormTemplate,
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
    const errors = ref<string[]>();

    const rules = computed(() => {
      return {
        required: (value: string) => !!value || "この項目は必須です",
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

    const register = async (): Promise<void> => {
      // 画像のデータはformDataを介さないと送れない
      const form = document.forms.namedItem("form");
      const formData = new FormData(form);

      try {
        await login(formData, "post", "/register");
      } catch (error) {
        errors.value = exceptionErrorToArray(error);
      }
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
