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
      desc:
        "ポケモンのステータスを計算・管理するためのWebアプリ『Pokemonote』へようこそ！ 素早さ計算機や剣盾に対応した種族値ランキングといったツールも公開しています。「シンプルで高機能」なツールにこだわって制作していますので、是非お試しください。",
    },
  },
  {
    path: "/pokemons/new",
    name: "新規ポケモン投稿",
    component: () => import("../views/pokemons/New.vue"),
    meta: {
      title: "新規ポケモン投稿（ポケモン剣盾『鎧の孤島』『冠の雪原』に対応）",
      desc:
        "ポケモンのステータスを計算して投稿できるアプリです。リアルタイムで計算が行われるため、個体値や努力値の変更を確認しながら計算できます。実数値から努力値の逆算にも対応、耐久調整を自動で行ってくれる機能も搭載しています。計算結果は投稿して、他の人とシェアしましょう！",
    },
  },
  {
    path: "/calc-speed",
    name: "素早さ計算機",
    component: () => import("../views/CalcSpeed.vue"),
    meta: {
      title: "素早さ計算機（ポケモン剣盾）",
      desc:
        "ポケモン剣盾（『鎧の孤島』『冠の雪原』）に対応している素早さ計算機です。実数値を入力することで、追い風や麻痺、湿原といったあらゆる状態の素早さをリアルタイムに表示します。すいすいや葉緑素などの特性、スカーフや鉄球といった持ち物を含んだ計算にも対応している、高機能な素早さ計算ツールとなっています。",
    },
  },
  {
    path: "/base-stats-ranking",
    name: "種族値ランキング",
    component: () => import("../views/BaseStatsRanking.vue"),
    meta: {
      title: "種族値ランキング（ポケモン剣盾）",
      desc:
        "ポケモン剣盾の種族値ランキングです。攻撃や特攻、素早さを除いた実質種族値でのリストアップも可能です。伝説や幻のポケモンを表示するオプション、各種ステータスでソートする機能にも対応しています。準伝や600属の暴れる環境で、採用するポケモンに迷った際には、きっとこのツールが役立つことでしょう。",
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
    beforeEnter(to, from, next) {
      if (store.getters.accessToken) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/registration",
    name: "新規登録",
    component: () => import("../views/Registration.vue"),
    beforeEnter(to, from, next) {
      if (store.getters.accessToken) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/users",
    name: "ユーザ一覧",
    component: () => import("../views/users/Index.vue"),
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
    path: "/pokemons",
    name: "ポケモン一覧",
    component: () => import("../views/pokemons/Index.vue"),
  },
  {
    path: "/test",
    name: "テスト",
    component: () => import("../views/Test.vue"),
    meta: {
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
    if (!store.getters.accessToken) {
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
