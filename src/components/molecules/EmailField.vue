<template>
  <v-text-field
    :name="name"
    :label="label"
    prepend-icon="mdi-email"
    type="email"
    :rules="[rules.required, rules.email]"
    :value="email"
    @input="$emit('update:email', $event)"
  />
</template>

<script lang="ts">
import { EMAIL_VAlIDATION } from "@/utils/constants";
import { computed, defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    email: {
      type: String,
      required: false,
      default: "",
    },
    label: {
      type: String,
      required: false,
      default: "メールアドレス",
    },
    name: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup() {
    const rules = computed(() => {
      return {
        required: (value: string) => !!value || "この項目は必須です",
        email: (value: string) => {
          return (
            EMAIL_VAlIDATION.test(value) || "メールアドレスは有効ではありません"
          );
        },
      };
    });
    return {
      rules,
    };
  },
});
</script>
