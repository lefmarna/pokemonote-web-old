<template>
  <Form title="ログイン" buttonText="ログイン" :errors="errors" @submit="login">
    <EmailField :email.sync="email" />
    <PasswordField :password.sync="password" />
  </Form>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import axios from "axios";
import router from "@/router";
import Form from "@/components/templates/Form.vue";
import EmailField from "@/components/molecules/EmailField.vue";
import PasswordField from "@/components/molecules/PasswordField.vue";
import store from "@/store";
import { RawLocation } from "vue-router";

export default defineComponent({
  components: {
    Form,
    EmailField,
    PasswordField,
  },
  setup(_, context) {
    const route = context.root.$route;

    const email = ref("");
    const password = ref("");
    const errors = ref<string[]>();

    const login = () => {
      axios.get("/csrf-cookie").then(() => {
        axios
          .post("/login", {
            email: email.value,
            password: password.value,
          })
          .then((response) => {
            // Vuexに認証情報を保存する
            store.commit("updateAuthUser", response.data.data);
            // 認証を求められてきた場合は元々の遷移先へ
            if (route.query.redirect) {
              router.push(route.query.redirect as RawLocation);
              // そうでない場合はトップページへ
            } else {
              router.push("/");
            }
            store.dispatch("notice");
          })
          .catch((error) => {
            console.log(error.response.data.errors);
          });
      });
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
