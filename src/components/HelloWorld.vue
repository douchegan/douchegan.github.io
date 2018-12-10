<template>
  <div class="hello" id="page-index">
    <h1>
      <span :class="animateV + ' animated'">{{ msg }}</span>
    </h1>
    <div class="animate-select">
      <span>动画选择：</span>
      <el-select v-model="animateV" placeholder="请选择">
        <el-option
          v-for="item in animateOpt"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <h2>Some Links</h2>
    <ul class="links">
      <li v-for="(item, index) in links" :key="index">
        <a :href="item" target="_blank">{{index}}</a>
      </li>
    </ul>
    <el-carousel :interval="5000" height="200px" trigger="click">
      <el-carousel-item v-for="(item, index) in text" :key="index">
        <div class="carousel-div" v-html="item"></div>
      </el-carousel-item>
    </el-carousel>
    <el-button @click="getPdf('body')">导出PDF</el-button>
  </div>
</template>

<script>
import text from './text.js'
import { animateOpt } from './optionData.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Dx’s page',
      text: text.carousel,
      links: text.links,
      animateOpt: animateOpt,
      animateV: animateOpt[0],
      htmlTitle: '导出的pdf文件'
    }
  },
  mounted () {
    //
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
.links li {
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
  h1{
    >span{
      display: inline-block
    }
  }
  .animate-select{
    margin: 10px 0;
  }
}
</style>
<style lang="scss">
.el-carousel {
  width: 50%;
  margin: 0 auto;
}
#page-index{
  .el-input__inner{
    background: #30314847 !important;
    color: #fff !important;
    border: none !important;
  }
}
</style>
