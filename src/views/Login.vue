<template>
  <FormTemplate
    title="ログイン"
    buttonText="ログイン"
    :errors="errors"
    @submit="login"
  >
    <EmailField :email.sync="email" />
    <PasswordField :password.sync="password" />
    <router-link to="/register"> 新規会員登録はこちら</router-link>
  </FormTemplate>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import axios from "axios";
import router from "@/router";
import { FormTemplate } from "@/components/templates";
import { EmailField, PasswordField } from "@/components/molecules";
import { RawLocation } from "vue-router";
import { notice, updateAuthUser } from "@/utils/store";

export default defineComponent({
  components: {
    FormTemplate,
    EmailField,
    PasswordField,
  },
  setup(_, context) {
    // FIXME 非推奨の書き方なので、Vue3に移行したらuseRouteを使う形で書き直したい
    const route = context.root.$route;

    const email = ref("");
    const password = ref("");
    const errors = ref<string[]>();

    const login = async (
      params = { email: email.value, password: password.value },
      method = "post",
      path = "/login"
    ): Promise<void | string[]> => {
      // FIXME @/utils/auth.tsにまとめたい、Vue3に移行したらtsファイルでもroute.query.redirectがかけるようになるので、その際にまとめよう
      try {
        const response = await axios[method](path, params);
        updateAuthUser(response.data.data);
        if (route.query.redirect) {
          router.push(route.query.redirect as RawLocation);
          // そうでない場合はトップページへ
        } else {
          router.push("/");
        }
        notice();
      } catch (error) {
        if (!axios.isAxiosError(error)) return;
        const errorMessages: string[] = [];
        const errorsResponse: string[] = error.response.data.errors;
        Object.values(errorsResponse).forEach((errorResponse) => {
          errorMessages.push(errorResponse[0]);
        });
        return errorMessages;
      }
    };
    return {
      email,
      errors,
      password,
      login,
    };
  },
});
</script>
