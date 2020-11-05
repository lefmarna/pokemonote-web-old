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
            v-for="nav_list in nav_lists"
            :to="nav_list.link"
            :key="nav_list.name"
          >
            <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
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
            v-for="nav_list in nav_lists2"
            :href="nav_list.link"
            :key="nav_list.name"
          >
            <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
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
    nav_lists: [
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
        name: "利用規約",
        icon: "mdi-comment-alert",
        link: "/privacy-policy",
      },
    ],
    nav_lists2: [
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
};
</script>

<style lang="scss">
// ハートの色
$heart1: #bbdefb;
$heart2: #90caf9;

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

.contents {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  border-radius: 0.3rem !important;
  border: 1px solid #dee2e6 !important;
  background-color: #fff !important;
}
</style>
