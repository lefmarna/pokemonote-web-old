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
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "メールアドレスは有効ではありません";
        },
      };
    });
    return {
      rules,
    };
  },
});
</script>
