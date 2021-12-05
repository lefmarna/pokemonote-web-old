<template>
  <Form
    title="チップを贈る"
    buttonText="チップを贈る"
    :errors="errors"
    @submit="giveTip"
  >
    <v-card-subtitle>
      この機能は、現在テストモードで動作しています。<br />挙動は確認できますが、お金が引き落とされることはありません。
    </v-card-subtitle>
    <v-select
      v-model="price"
      :items="gifts"
      item-text="name"
      item-value="value"
      prepend-icon="mdi-gift"
      label="金額"
      type="number"
    ></v-select>
    <v-text-field
      v-model="number"
      prepend-icon="mdi-credit-card"
      label="カード番号"
      type="text"
    />
    <v-row>
      <v-col>
        <v-text-field
          v-model="exp_month"
          prepend-icon="mdi-calendar-month"
          label="月"
          type="text"
          placeholder="例)3"
          persistent-placeholder
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="exp_year"
          prepend-icon="mdi-calendar"
          label="年"
          type="text"
          placeholder="例)24"
          persistent-placeholder
        />
      </v-col>
    </v-row>
    <v-text-field
      v-model="cvc"
      prepend-icon="mdi-lock"
      label="セキュリティコード"
      type="text"
    />
  </Form>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from "@vue/composition-api";
import axios from "axios";
import router from "@/router";
import Form from "@/components/templates/Form.vue";
import store from "@/store";

interface Gift {
  name: string;
  value: number;
}
[];

// Payjpに型を指定しないとエラーになる
declare global {
  interface Window {
    Payjp: any;
  }
}

export default defineComponent({
  components: {
    Form,
  },
  setup() {
    // カード情報はString型で渡す必要がある
    const price = ref<number | null>(0);
    const number = ref<string>();
    const cvc = ref<string>();
    const exp_month = ref<string>();
    const exp_year = ref<string>();
    const token = ref<string>();
    const errors = ref<string[]>();

    const gifts = computed((): Gift => {
      return store.getters.gifts;
    });

    const giveTip = (): void => {
      /**
       * 公開鍵を読み込む
       */
      onMounted(() => {
        window.Payjp.setPublicKey(process.env.VUE_APP_PAYJP_PUBLIC_KEY);
      });

      const card = {
        number: number.value,
        cvc: cvc.value,
        exp_month: exp_month.value,
        exp_year: `20${exp_year.value}`,
      };

      window.Payjp.createToken(card, (status: number, response: any) => {
        if (status === 200) {
          token.value = response.id;
        }
        // 金額とトークン情報を送信する
        axios.get("/csrf-cookie").then(() => {
          axios
            .post("/tips", {
              price: price.value,
              token: token.value,
            })
            .then(() => {
              router.push("/give-tip/thanks");
            })
            .catch((error) => {
              errors.value = [];
              const errorsMessages: string[] = error.response.data.errors;
              Object.values(errorsMessages).forEach((errorMessages) => {
                errors.value.push(errorMessages[0]);
                token.value = "";
              });
            });
        });
      });
    };
    return {
      gifts,
      errors,
      price,
      number,
      exp_month,
      exp_year,
      cvc,
      giveTip,
    };
  },
});
</script>
