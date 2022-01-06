<template>
  <FormTemplate
    title="メール確認"
    buttonText="確認メールを再送信する"
    @submit="resend"
  >
    <p>
      登録はまだ完了していません。<br />
      メールに記載されたリンクをクリックして本登録を完了してください。
    </p>
    <p>
      メールが届いていない場合、メールアドレスをご確認の上、「確認メールを再送信する」のボタンを押してください。
    </p>
    <EmailField :email.sync="email" name="email" />
  </FormTemplate>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import router from "@/router";
import { RawLocation } from "vue-router";
import axios from "axios";
import { EmailField } from "@/components/molecules";
import { FormTemplate } from "@/components/templates";
import { authUser } from "@/utils/store";

export default defineComponent({
  components: {
    EmailField,
    FormTemplate,
  },
  setup(_, context) {
    const route = context.root.$route;

    const email = ref<string>(authUser.value.email);

    // FIXME Vue3に移行したらtsファイルでもroute.query.redirectがかけるようになるので、その際にまとめよう
    if (route.query.redirect) {
      router.push(route.query.redirect as RawLocation);
      // そうでない場合はトップページへ
    } else {
      router.push("/");
    }

    const resend = async (): Promise<void> => {
      try {
        await axios.post("/email/resend", {
          email: email.value,
        });
        alert("メールを再送信しました。");
      } catch (error) {
        console.log(error);
      }
    };
    return {
      email,
      resend,
    };
  },
});
</script>
