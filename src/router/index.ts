import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      desc:
        "ポケモンの攻略ブログ『ポケモニット』の管理人である『レフマーナ』の自作アプリ集です。ポケモン剣盾に対応した、ステータス計算機や素早さ計算機、種族値ランキングといったWebアプリを公開しています。『シンプルで高機能』なツールにこだわって制作していますので、是非お試しください。",
    },
  },
  {
    path: "/calc-stats",
    name: "ステータス計算機",
    component: () => import("../views/CalcStats.vue"),
    meta: {
      title: "ステータス計算機（ポケモン剣盾）",
      desc:
        "ポケモン剣盾（『鎧の孤島』『冠の雪原』）に対応しているステータスの計算機です。リアルタイムで計算が行われるため、計算ボタンを押す必要がないのが特徴です。個体値と努力値から実数値を求められるだけでなく、実数値から努力値の逆算にも対応している多機能な計算ツールとなっています。",
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;