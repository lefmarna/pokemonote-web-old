<template>
  <div>
    <div class="jumbotron">
      <v-img
        alt="Pokemonote ポケモンをもっと楽しく！"
        class="shrink"
        src="@/assets/pokemonote.jpg"
        transition="scale-transition"
        max-height="492"
        min-height="164"
      />
    </div>
    <v-container>
      <v-row class="d-flex my-sm-2">
        <v-col cols="12" md="6" class="d-flex order-md-2">
          <div class="contents flex-fill text-center m-auto">
            <h2 class="headline font-weight-bold ma-2 mb-3">人気のポケモン</h2>
            <v-list>
              <v-list-item
                v-for="(item, index) in $store.getters.popularityRanking"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title align="left"
                    >{{ index + 1 }}位 {{ item }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="d-flex order-md-1">
          <div class="contents" style="width: 100%">
            <h2 class="headline font-weight-bold ma-2 mb-3 text-center">
              更新情報
            </h2>
            <v-sheet class="body-1 overflow-y-auto" max-height="280">
              <div class="px-2">
                <div>
                  <h3>2021-04-30</h3>
                  <p>『Pokemonote』α版を公開しました。</p>
                </div>
              </div>
            </v-sheet>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="contents">
            <h2 class="headline font-weight-bold ma-2 mb-3 text-center">
              Pokemonoteについて
            </h2>
            <div class="px-2">
              <p>
                当サイトは、個人の運営するファンサイトであり、株式会社ポケモンや任天堂、その他各企業様とは一切関係ありません。
              </p>
              <p>
                ポケットモンスター・ポケモン・Pokémonは任天堂・クリーチャーズ・ゲームフリークの登録商標です。
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.sosyal {
  margin: 50px auto;
  list-style: none;
  padding-left: 0;
}

.twitter > a {
  background-color: #008dde;
  box-shadow: 0 4px 0 #595e61;

  display: inline;
  position: relative;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: white;
  border-radius: 5px;
  padding: 14px 80px;
  &:active {
    top: 2px;
    box-shadow: 0 2px 0 #0078bd;
  }
  &:hover {
    background-color: #1397d8;
  }
}

h3 {
  padding: 3px 0px;
  margin-bottom: 3px;
  border-bottom: double 5px #90caf9;
}
</style>
