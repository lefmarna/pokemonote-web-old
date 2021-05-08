<template>
  <v-text-field
    v-model="email"
    :name="name"
    :label="label"
    prepend-icon="mdi-email"
    type="email"
    :rules="[rules.required, rules.email]"
  />
</template>

<script lang="ts">
export type DataType = {
  rules: any;
};

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
    name: String,
    label: {
      type: String,
      default: "メールアドレス",
    },
  },
  computed: {
    email: {
      get(): string {
        return this.value;
      },
      // 'input'にすることで、v-modelで発火させる
      set(value: string): void {
        this.$emit("input", value);
      },
    },
  },
};
</script>
