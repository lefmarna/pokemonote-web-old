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
import Vue from "vue";
import axios from "axios";
import router from "@/router";
import Form from "@/components/templates/Form.vue";

// カード情報はString型で渡す必要がある
export interface DataType {
  price: number | null;
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  token: string;
  errors: string[];
}

// Payjpに型を指定しないとエラーになる
declare global {
  interface Window {
    Payjp: any;
  }
}

export default Vue.extend({
  components: {
    Form,
  },
  data: (): DataType => ({
    price: 0,
    number: "",
    cvc: "",
    exp_month: "",
    exp_year: "",
    token: "",
    errors: [],
  }),
  computed: {
    gifts(): {
      name: string;
      value: number;
    }[] {
      return this.$store.getters.gifts;
    },
  },
  methods: {
    giveTip(): void {
      // カード情報を格納する
      const card = {
        number: this.number,
        cvc: this.cvc,
        exp_month: this.exp_month,
        exp_year: `20${this.exp_year}`,
      };

      // カード情報からトークンを作成する
      window.Payjp.createToken(card, (status: number, response: any) => {
        if (status == 200) {
          this.token = response.id;
        }
        // 金額とトークン情報を送信する
        axios
          .post("/tips", {
            tip: {
              price: this.price,
            },
            token: this.token,
          })
          .then(() => {
            router.push("/give-tip/thanks");
          })
          .catch((error) => {
            const errors: string[] = Object.keys(error.response.data);
            this.errors = [];
            if (errors.some((error) => error == "price")) {
              this.errors.push("金額を入力してください");
            }
            if (errors.some((error) => error == "token")) {
              this.errors.push("正しいカード情報を入力してください");
            }
          });
      });
    },
  },
  // 公開鍵を読み込む
  mounted(): void {
    window.Payjp.setPublicKey(process.env.VUE_APP_PAYJP_PUBLIC_KEY);
  },
});
</script>
