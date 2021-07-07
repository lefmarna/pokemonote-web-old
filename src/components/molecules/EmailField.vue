<template>
  <v-text-field
    :name="name"
    :label="label"
    prepend-icon="mdi-email"
    type="email"
    :rules="[rules.required, rules.email]"
    :value="email"
    @input="$emit('update:email', $event)"
    persistent-placeholder
  />
</template>

<script lang="ts">
export interface DataType {
  rules: any;
}

export default {
  data: (): DataType => ({
    rules: {
      required: (value: any) => !!value || "この項目は必須です",
      email: (value: string) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "メールアドレスは有効ではありません";
      },
    },
  }),
  props: {
    email: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "メールアドレス",
    },
    name: String,
  },
};
</script>
