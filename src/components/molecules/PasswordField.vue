<template>
  <v-text-field
    v-model="password"
    :name="name"
    :label="label"
    prepend-icon="mdi-lock"
    :append-icon="togglePassword.icon"
    :type="togglePassword.type"
    @click:append="isShow = !isShow"
    :rules="[rules.required, rules.password]"
  />
</template>

<script lang="ts">
export type DataType = {
  isShow: boolean;
  rules: any;
};

export default {
  data: (): DataType => ({
    isShow: false,
    rules: {
      required: (value: any) => !!value || "この項目は必須です",
      password: (value: string) => {
        const pattern = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,128}$/i;
        return (
          pattern.test(value) ||
          "パスワードは、英数それぞれ1種類以上含む、6〜128文字で入力してください"
        );
      },
    },
  }),
  props: {
    name: String,
    label: {
      type: String,
      default: "パスワード",
    },
  },
  computed: {
    togglePassword(): any {
      const icon = this.isShow ? "mdi-eye" : "mdi-eye-off";
      const type = this.isShow ? "text" : "password";
      return { icon, type };
    },
    password: {
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
