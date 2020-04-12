<template>
  <footer class="pt-3 pb-1 text-center bg-dark text-white">
    <ul>
      <li><router-link to="/">ホーム</router-link></li>
      <li><router-link to="/privacy-policy">利用規約</router-link></li>
      <li>
        <a
          href="https://pokemonit.com/otoiawase/"
          target="_blank"
          rel="noopener noreferrer"
          >お問い合わせ</a
        >
      </li>
    </ul>
    <p>
      © Copyright 2020
      <a href="https://app.pokemonit.com">ポケモニット アプリ</a>
    </p>
  </footer>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: white;
  margin: 0 10px;
  line-height: 1.5;
  cursor: pointer;
  &:hover {
    color: white;
  }
}
</style>
