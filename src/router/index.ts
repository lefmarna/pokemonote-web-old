import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      desc: "ポケモンのステータスを計算・管理するためのWebアプリ『Pokemonote』へようこそ！ 素早さ計算機や剣盾に対応した種族値ランキングといったツールも公開しています。「シンプルで高機能」なツールにこだわって制作していますので、是非お試しください。",
    },
  },
  {
    path: "/calc-stats",
    name: "ステータス計算機",
    component: () => import("../views/CalcStats.vue"),
    meta: {
      title: "ステータス計算機（ポケモン剣盾、DPリメイク（BDSP）に対応）",
      desc: "ポケモン剣盾、DPリメイク（BDSP）に対応したステータス計算機です。リアルタイムで計算が行われるため、個体値や努力値の変更を確認しながら計算できます。実数値から努力値の逆算にも対応、耐久調整を自動で行ってくれる機能も搭載しています。計算結果を投稿することで、あとから見返したり友達とシェアすることもできます！",
    },
  },
  {
    path: "/calc-speed",
    name: "素早さ計算機",
    component: () => import("../views/CalcSpeed.vue"),
    meta: {
      title: "素早さ計算機（ポケモン剣盾、DPリメイク（BDSP）に対応）",
      desc: "ポケモン剣盾、DPリメイク（BDSP）に対応している素早さ計算機です。実数値を入力することで、追い風や麻痺、湿原といったあらゆる状態の素早さをリアルタイムに表示します。すいすいや葉緑素などの特性、スカーフや鉄球といった持ち物を含んだ計算にも対応している、高機能な素早さ計算ツールとなっています。",
    },
  },
  {
    path: "/base-stats-ranking",
    name: "種族値ランキング",
    component: () => import("../views/BaseStatsRanking.vue"),
    meta: {
      title: "種族値ランキング（ポケモン剣盾『鎧の孤島』『冠の雪原』に対応）",
      desc: "ポケモン剣盾の種族値ランキングです。攻撃や特攻、素早さを除いた実質種族値でのリストアップも可能です。伝説や幻のポケモンを表示するオプション、各種ステータスでソートする機能にも対応しています。準伝や600属の暴れる環境で、採用するポケモンに迷った際には、きっとこのツールが役立つことでしょう。",
    },
  },
  {
    path: "/privacy-policy",
    name: "利用規約",
    component: () => import("../views/PrivacyPolicy.vue"),
    meta: {
      title: "利用規約",
    },
  },
  {
    path: "/sitemap.xml",
    name: "XMLサイトマップ",
    meta: {
      title: "サイトマップ",
    },
  },
  {
    path: "/login",
    name: "ログイン",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "ログイン",
    },
    beforeEnter(to, from, next) {
      if (store.getters.authUser.username && store.getters.authUser.nickname) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    name: "アカウント作成",
    component: () => import("../views/Register.vue"),
    meta: {
      title: "アカウント作成",
    },
    beforeEnter(to, from, next) {
      if (store.getters.authUser.username && store.getters.authUser.nickname) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/email/resend",
    name: "メール確認",
    component: () => import("../views/email/Resend.vue"),
    beforeEnter: (to, from, next) => {
      // ログイン済の場合はアクセスさせない
      if (store.getters.authUser.username || store.getters.authUser.nickname) {
        next("/");
      } else {
        next();
      }
    },
    meta: {
      title: "メール確認",
    },
  },
  {
    path: "/email/verify/:id",
    name: "メール認証",
    component: () => import("../views/email/Verify.vue"),
    props: (route) => ({ id: route.params.id, query: route.query }),
    beforeEnter: (to, from, next) => {
      // ログイン済の場合はアクセスさせない
      if (store.getters.authUser.username || store.getters.authUser.nickname) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/users/:id",
    name: "ユーザ詳細",
    component: () => import("../views/users/Show.vue"),
    props: (route) => ({ id: route.params.id }),
  },
  {
    path: "/pokemons/:id(\\d+)", // IDは数値のみを許可
    name: "ポケモン詳細",
    component: () => import("../views/pokemons/Show.vue"),
    props: (route) => ({ id: Number(route.params.id) }),
  },
  {
    path: "/pokemons/:id(\\d+)/edit", // IDは数値のみを許可
    name: "ポケモン編集",
    component: () => import("../views/pokemons/Edit.vue"),
    props: (route) => ({ id: Number(route.params.id) }),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/pokemons",
    name: "ポケモン",
    component: () => import("../views/pokemons/Index.vue"),
    meta: {
      title: "みんなの投稿",
    },
  },
  {
    path: "/lefmarna_otoiawase",
    name: "お問い合わせ",
    component: () => import("../views/lefmarna_otoiawase/Index.vue"),
    meta: {
      title: "お問い合わせ",
    },
  },
  {
    path: "/lefmarna_otoiawase/thanks",
    name: "送信成功",
    component: () => import("../views/lefmarna_otoiawase/Thanks.vue"),
  },
  {
    path: "/give-tip",
    name: "チップを贈る",
    component: () => import("../views/giveTip/Index.vue"),
    meta: {
      title: "チップを贈る",
      requireAuth: true,
    },
  },
  {
    path: "/give-tip/thanks",
    name: "応援ありがとう",
    component: () => import("../views/giveTip/Thanks.vue"),
    meta: {
      title: "応援ありがとう",
      requireAuth: true,
    },
  },
  {
    path: "/settings",
    name: "設定",
    component: () => import("../views/Settings.vue"),
    meta: {
      title: "設定",
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // ログイン認証が必要なルートがあるかを確認
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!(store.getters.authUser.username || store.getters.authUser.nickname)) {
      // 認証していなければログインページにリダイレクト
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // 認証の必要がないルートであればnext()で遷移
  }
});

export default router;
