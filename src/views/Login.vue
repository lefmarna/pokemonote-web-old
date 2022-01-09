<template>
  <FormTemplate
    title="ログイン"
    buttonText="ログイン"
    :errors="errors"
    @submit="login"
  >
    <EmailField :email.sync="loginParams.email" />
    <PasswordField :password.sync="loginParams.password" />
    <router-link to="/register"> 新規会員登録はこちら</router-link>
  </FormTemplate>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import axios from "axios";
import router from "@/router";
import { FormTemplate } from "@/components/templates";
import { EmailField, PasswordField } from "@/components/molecules";
import { RawLocation } from "vue-router";
import { notice, updateAuthUser } from "@/utils/store";
import { exceptionErrorToArray } from "@/utils/error";
import { AuthUser } from "@/types";

export default defineComponent({
  components: {
    FormTemplate,
    EmailField,
    PasswordField,
  },
  setup(_, context) {
    // FIXME 非推奨の書き方なので、Vue3に移行したらuseRouteを使う形で書き直したい
    const route = context.root.$route;

    const loginParams = reactive({
      email: "",
      password: "",
    });
    const errors = ref<string[]>();

    const login = async (): Promise<void | string[]> => {
      try {
        const response = await axios.post<{ data: AuthUser }>(
          "/login",
          loginParams
        );

        // メール認証済でない場合は、メール確認ページへ
        if (!response.data.data.email_verified_at) {
          localStorage.setItem("email", response.data.data.email);
          router.push("/email/resend");
          return;
        }

        updateAuthUser(response.data.data);
        if (route.query.redirect) {
          router.push(route.query.redirect as RawLocation);
          // そうでない場合はトップページへ
        } else {
          router.push("/");
        }
        notice();
      } catch (error) {
        errors.value = exceptionErrorToArray(error);
      }
    };
    return {
      errors,
      loginParams,
      login,
    };
  },
});
</script>
