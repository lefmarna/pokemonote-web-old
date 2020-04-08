<template>
  <div class="hello">
    <h1 class="mt-3">{{ msg }}</h1>
    <router-link to="/privacy-policy">利用規約</router-link>
    <h3>フォローする</h3>
    <ul>
      <li>
        <a href="https://twitter.com/lefmarna" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
