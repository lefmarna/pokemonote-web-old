<template>
  <v-text-field
    :name="name"
    :label="label"
    prepend-icon="mdi-lock"
    :append-icon="togglePassword.icon"
    :type="togglePassword.type"
    @click:append="isShow = !isShow"
    :rules="[rules.required, rules.password]"
    :value="password"
    @input="$emit('update:password', $event)"
  />
</template>

<script lang="ts">
export interface DataType {
  isShow: boolean;
  rules: any;
}

export default {
  data: (): DataType => ({
    isShow: false,
    rules: {
      required: (value: any) => !!value || "この項目は必須です",
      password: (value: string) => {
        const pattern = /^(?=.*?[a-z])(?=.*?\d)[a-z\d!@#$%^&*]{8,64}$/i;
        return (
          pattern.test(value) ||
          "パスワードは、英数それぞれ1種類以上含む、8〜64文字で入力してください"
        );
      },
    },
  }),
  props: {
    password: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "パスワード",
    },
    name: String,
  },
  computed: {
    togglePassword(): any {
      const icon = this.isShow ? "mdi-eye" : "mdi-eye-off";
      const type = this.isShow ? "text" : "password";
      return { icon, type };
    },
  },
};
</script>
