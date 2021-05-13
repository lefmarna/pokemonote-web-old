<template>
  <Form title="ログイン" buttonText="ログイン" :errors="errors" @submit="login">
    <EmailField :email.sync="email" />
    <PasswordField :password.sync="password" />
  </Form>
</template>

<script lang="ts">
import axios from "axios";
import router from "@/router";
import Form from "@/components/templates/Form.vue";
import EmailField from "@/components/molecules/EmailField.vue";
import PasswordField from "@/components/molecules/PasswordField.vue";

export type DataType = {
  email: string;
  password: string;
  errors: string[];
};

export default {
  name: "login",
  components: {
    Form,
    EmailField,
    PasswordField,
  },
  data: (): DataType => ({
    email: "",
    password: "",
    errors: [],
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
            userName: response.data.data["username"],
            accessToken: response.headers["access-token"],
            client: response.headers["client"],
            uid: response.headers["uid"],
          });
          // 認証を求められてきた場合は元々の遷移先へ
          if (this.$route.query.redirect) {
            router.push(this.$route.query.redirect);
            // そうでない場合はトップページへ
          } else {
            router.push("/");
          }
          this.$store.dispatch("notice");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
