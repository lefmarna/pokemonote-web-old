<template>
  <div>
    <div class="jumbotron jumbotron-fluid mb-0">
      <div class="container">
        <Jumbotron msg="ポケモニット アプリ" />
      </div>
    </div>
    <div class="container my-1 my-sm-2">
      <div class="row d-flex">
        <div class="col-12 col-md-6 px-1 mb-2 d-flex order-md-2">
          <div
            class="bg-white border rounded-lg shadow-sm flex-fill text-center"
          >
            <h2 class="mb-3">フォローする</h2>
            <img
              src="../assets/lefmarna.png"
              class="img-fluid mb-3"
              alt="レフマーナ"
            />
            <p><strong>レフマーナ</strong></p>
            <ul class="list-unstyled sosyal">
              <li class="twitter">
                <a
                  href="https://twitter.com/lefmarna"
                  target="_blank"
                  rel="noopener"
                  >Twitter</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-6 px-1 mb-2 d-flex order-md-1">
          <div class=" bg-white border rounded-lg shadow-sm">
            <h2 class="mb-3">更新情報</h2>
            <updates />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 px-1 mb-2">
          <div class="bg-white border rounded-lg shadow-sm">
            <h2 class="mb-3">ポケモニット アプリについて</h2>
            <div class="px-2">
              <p>
                『ポケモニット アプリ』は、ポケモンの攻略ブログ『<a
                  href="https://pokemonit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >ポケモニット</a
                >』を運営している『レフマーナ』による自作アプリ集です。
              </p>
              <p>
                SPA(シングルページアプリケーション)という技術を用いて制作しているため、当サイト内のリンクであれば読み込みがかからず、各ページ間の遷移をスムーズに行うことができます。
              </p>
              <p>
                当サイトは、個人の運営するファンサイトであり、株式会社ポケモンや任天堂、その他各企業様とは一切関係ありません。
              </p>
              <p>
                ポケットモンスター・ポケモン・Pokémonは任天堂・クリーチャーズ・ゲームフリークの登録商標です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin: 10px;
  font-weight: bold;
  text-align: center;
}

.jumbotron {
  background: url(../assets/top.jpg) center no-repeat;
  background-size: cover;
}

.sosyal {
  margin: 50px auto;
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
</style>

<script>
// @ is an alias to /src
import Jumbotron from "@/components/Jumbotron.vue";
import updates from "@/components/updates.vue";

export default {
  name: "Home",
  components: {
    Jumbotron,
    updates
  }
};
</script>
