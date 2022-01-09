<template>
  <FormTemplate
    title="チップを贈る"
    buttonText="チップを贈る"
    :errors="errors"
    @submit="giveTip"
  >
    <v-card-subtitle>
      この機能は、現在テストモードで動作しています。<br />挙動は確認できますが、お金が引き落とされることはありません。
    </v-card-subtitle>
    <v-select
      v-model="tip.price"
      :items="GIFTS"
      item-text="name"
      item-value="value"
      prepend-icon="mdi-gift"
      label="金額"
      type="number"
    ></v-select>
    <v-text-field
      v-model="card.number"
      prepend-icon="mdi-credit-card"
      label="カード番号"
      type="text"
    />
    <v-row>
      <v-col>
        <v-text-field
          v-model="card.exp_month"
          prepend-icon="mdi-calendar-month"
          label="月"
          type="text"
          placeholder="例)3"
          persistent-placeholder
        />
      </v-col>
      <v-col>
        <v-text-field
          :value="card.exp_year.substr(2)"
          @input="card.exp_year = `20${$event}`"
          prepend-icon="mdi-calendar"
          label="年"
          type="text"
          placeholder="例)24"
          persistent-placeholder
        />
      </v-col>
    </v-row>
    <v-text-field
      v-model="card.cvc"
      prepend-icon="mdi-lock"
      label="セキュリティコード"
      type="text"
    />
  </FormTemplate>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from "@vue/composition-api";
import axios from "axios";
import router from "@/router";
import { FormTemplate } from "@/components/templates";
import {
  GIFTS,
  HTTP_OK,
  HTTP_PAYMENT_REQUIRED,
  HTTP_UNPROCESSABLE_ENTITY,
} from "@/utils/constants";
import { exceptionErrorToArray } from "@/utils/error";
import { Card, Tip } from "@/types";

// Payjpに型を指定しないとエラーになる
declare global {
  interface Window {
    Payjp: {
      setPublicKey: (key: string) => void;
      createToken: (
        card: Card,
        callback: (status: number, response: { id: string }) => void
      ) => void;
    };
  }
}

export default defineComponent({
  components: {
    FormTemplate,
  },
  setup() {
    const errors = ref<string[]>();

    // カード情報はString型で渡す必要がある
    const card = reactive<Card>({
      number: "",
      cvc: "",
      exp_month: "",
      exp_year: "20",
    });

    const tip = reactive<Tip>({
      price: 0,
      token: "",
    });

    /**
     * 公開鍵を読み込む
     */
    onMounted(() => {
      window.Payjp.setPublicKey(process.env.VUE_APP_PAYJP_PUBLIC_KEY);
    });

    const giveTip = (): void => {
      window.Payjp.createToken(card, (status, response) => {
        if (status === HTTP_OK) {
          tip.token = response.id;
        }

        try {
          axios.post("/tips", tip);
          router.push("/give-tip/thanks");
        } catch (error) {
          errors.value = exceptionErrorToArray(error, [
            HTTP_PAYMENT_REQUIRED,
            HTTP_UNPROCESSABLE_ENTITY,
          ]);
          tip.token = "";
        }
      });
    };
    return {
      GIFTS,
      card,
      errors,
      tip,
      giveTip,
    };
  },
});
</script>
