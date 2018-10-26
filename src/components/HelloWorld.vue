<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Some Links</h2>
    <ul>
      <li>
        <a
          href="/static/d3/index.html"
          target="_blank"
        >
          d3示例
        </a>
      </li>
    </ul>
    <el-carousel :interval="5000" height="200px" trigger="click">
      <el-carousel-item v-for="(item, index) in text" :key="index">
        <div class="carousel-div" v-html="item"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import text from './text.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Dx’s page',
      text: text.carousel
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
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
.hello {
  margin: 0 auto;
  width: 80%;
  .carousel-div {
    height: 100%;
    background: #30314847;
    padding: 20px;
    line-height: 30px;
  }
}
</style>
<style>
.el-carousel {
  width: 50%;
  margin: 0 auto;
}
</style>
