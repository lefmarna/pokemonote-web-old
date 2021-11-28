<template>
  <Form title="メール確認" buttonText="メールを再送信する" @submit="resend">
    メールをご確認ください。
    もし確認用メールが送信されていない場合は、下記をクリックしてください。
  </Form>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import Form from "@/components/templates/Form.vue";

export default Vue.extend({
  components: {
    Form,
  },
  methods: {
    resend(): void {
      axios
        .post("/email/resend")
        .then(() => {
          alert("メールを再送信しました。");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
  },
});
</script>
