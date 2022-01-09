<template>
  <div>メール認証中...</div>
</template>

<script lang="ts">
import router from "@/router";
import { Signature } from "@/types";
import { notice, updateAuthUser } from "@/utils/store";
import { defineComponent, PropType } from "@vue/composition-api";
import axios from "axios";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    query: {
      type: Object as PropType<Signature>,
      required: true,
    },
  },
  setup(props) {
    const verify = async () => {
      try {
        const response = await axios.get(
          `/email/verify/${props.id}?expires=${props.query.expires}&signature=${props.query.signature}`
        );
        updateAuthUser(response.data.data);
        notice();
      } catch (error) {
        console.log(error);
      }
      router.push("/");
    };
    verify();
  },
});
</script>
