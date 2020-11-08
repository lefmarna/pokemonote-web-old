<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-container>
        <v-list-item>
          ポケモニット アプリ
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item
            v-for="siteMenuList in siteMenuLists"
            :to="siteMenuList.link"
            :key="siteMenuList.name"
          >
            <v-list-item-icon>
              <v-icon>{{ siteMenuList.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ siteMenuList.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list-item>
          その他
        </v-list-item>
        <v-divider />
        <v-list dense nav>
          <v-list-item
            v-for="otherMenuList in otherMenuLists"
            :href="otherMenuList.link"
            :key="otherMenuList.name"
          >
            <v-list-item-icon>
              <v-icon>{{ otherMenuList.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ otherMenuList.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list class="bottomFooter__copyright">
          © Copyright 2020 ポケモニット.
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <div class="d-flex align-center">
        <v-img
          alt="ポケモニット アプリ"
          class="shrink mr-2"
          contain
          src="./assets/lefmarna.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-toolbar-title>ポケモニット アプリ</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: null,
    siteMenuLists: [
      {
        name: "Home",
        icon: "mdi-home",
        link: "/",
      },
      {
        name: "ステータス計算機",
        icon: "mdi-calculator",
        link: "/calc-stats",
      },
      {
        name: "素早さ計算機",
        icon: "mdi-run-fast",
        link: "/calc-speed",
      },
      {
        name: "種族値ランキング",
        icon: "mdi-finance",
        link: "/base-stats-ranking",
      },
      {
        name: "利用規約",
        icon: "mdi-comment-alert",
        link: "/privacy-policy",
      },
    ],
    otherMenuLists: [
      {
        name: "ポケモニット（ブログ）",
        icon: "mdi-wordpress",
        link: "https://pokemonit.com/",
      },
      {
        name: "Twitter",
        icon: "mdi-twitter",
        link: "https://twitter.com/lefmarna/",
      },
      {
        name: "お問い合わせ",
        icon: "mdi-email",
        link: "https://pokemonit.com/otoiawase/",
      },
    ],
  }),
  mounted() {
    var to = this.$route;
    this.createPageTitle(to);
  },
  watch: {
    $route(to) {
      this.createPageTitle(to);
    },
  },
  methods: {
    /* ページが遷移したときにメタタグを書き換える */
    createPageTitle(to) {
      // titleを取得
      let currentTitle = document.querySelectorAll(
        "meta[name='twitter:title'], meta[property='og:title']"
      );
      // titleが存在する場合は書き換え、存在しない場合はデフォルトに設定
      let rewriteTitle = "ポケモニット アプリ";
      if (to.meta.title) {
        rewriteTitle = to.meta.title + " | ポケモニット アプリ";
      }
      for (let i = 0, len = currentTitle.length; i < len; i++) {
        currentTitle[i].setAttribute("content", rewriteTitle);
      }
      document.title = rewriteTitle;
      // descriptionを取得
      let currentDesc = document.querySelectorAll(
        "meta[name='description'], meta[name='twitter:description'], meta[property='og:description']"
      );
      // descriptionが存在する場合は書き換え、存在しない場合はデフォルトに設定
      if (to.meta.desc) {
        for (let i = 0, len = currentDesc.length; i < len; i++) {
          currentDesc[i].setAttribute("content", to.meta.desc);
        }
      } else {
        for (let i = 0, len = currentDesc.length; i < len; i++) {
          currentDesc[i].setAttribute(
            "content",
            "ポケモンの攻略ブログ『ポケモニット』の管理人である『レフマーナ』の自作アプリ集です。"
          );
        }
      }
    },
  },
};
</script>

<style lang="scss">
// ハートの色
$heart1: #bbdefb;
$heart2: #90caf9;
// ハートの背景をCSSで設計する
#app {
  background-color: #e3f2fd;
  background-image: linear-gradient(135deg, $heart1 0.85em, transparent 0),
    linear-gradient(-135deg, $heart1 0.85em, transparent 0),
    radial-gradient(circle at 7.4em 7.4em, $heart1 0.85em, transparent 0.85em),
    radial-gradient(circle at 0.56em 7.4em, $heart1 0.85em, transparent 0.85em),
    linear-gradient(135deg, #90caf9 0.85em, transparent 0),
    linear-gradient(-135deg, $heart2 0.85em, transparent 0),
    radial-gradient(circle at 7.4em 7.4em, $heart2 0.85em, transparent 0.85em),
    radial-gradient(circle at 0.56em 7.4em, $heart2 0.85em, transparent 0.85em);
  background-position: 0 4em, 0 4em, 0 -4em, 0 -4em, 4em 0, 4em 0, 4em 0, 4em 0;
  background-size: 8em 8em;
  background-repeat: repeat;
}

// リボン風の見出しを作る
h2 {
  position: relative;
  background: #ffcce5;
  box-shadow: 0px 0px 0px 5px #ffcce5;
  border: dashed 2px white;
  padding: 0.4em 0.5em;
  color: #454545;
}
h2:after {
  position: absolute;
  content: "";
  left: -7px;
  top: -7px;
  border-width: 0 0 15px 15px;
  border-style: solid;
  border-color: #fff #fff #ffb8da;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
}

// 各要素の背景色や枠線など、基本となるスタイルを定義
.contents {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  border-radius: 0.3rem !important;
  border: 1px solid #dee2e6 !important;
  background-color: #fff !important;
}

// テーブルの奇数行に背景色をつける
.v-data-table td {
  background: #ffffff;
}
.v-data-table tr:nth-child(odd) td {
  background: #f0f8ff;
}
.v-data-table tr:hover td {
  background-color: #eee;
}
</style>
