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
    <div id="leafletMap"></div>
    <el-button @click="getPdf('body')">导出PDF</el-button>
    <el-button @click="printPDF">打印PDF</el-button>
  </div>
</template>

<script>
import text from './text.js'
import { animateOpt } from './optionData.js'
import L from 'leaflet'
// import $ from '../../static/js/jquery.min.js'
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
  methods: {
    initMap () {
      let map = L.map('leafletMap', {
        minZoom: 3,
        maxZoom: 18,
        center: [31.5, 113.09],
        zoom: 11,
        attributionControl: false
      })
      L.tileLayer('http://online{s}.map.bdimg.com/tile/?qt=tile&styles=pl&scaler=2&x={x}&y={y}&z={z}').addTo(map)
    },
    printPDF () {
      window.print()
    }
  },
  mounted () {
    // this.initMap()
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
#leafletMap{
  height: 400px;
  width: 400px;
  margin: 0 auto;
  overflow: hidden;
  z-index: 9999;
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
