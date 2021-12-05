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
import { computed, defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  props: {
    password: {
      type: String,
      required: false,
      default: "",
    },
    label: {
      type: String,
      required: false,
      default: "パスワード",
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
        password: (value: string) => {
          const pattern = /^(?=.*?[a-z])(?=.*?\d)[a-z\d!@#$%^&*]{8,64}$/i;
          return (
            pattern.test(value) ||
            "パスワードは、英数それぞれ1種類以上含む、8〜64文字で入力してください"
          );
        },
      };
    });
    // パスワードの表示・非表示切り替え
    const isShow = ref(false);
    const togglePassword = computed(() => {
      const icon = isShow.value ? "mdi-eye" : "mdi-eye-off";
      const type = isShow.value ? "text" : "password";
      return { icon, type };
    });
    return {
      rules,
      isShow,
      togglePassword,
    };
  },
});
</script>
