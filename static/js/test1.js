import lm from './layerManager'
import LayerManager1 from './layerManager1'

function Animal (name) {
  this.name = name
}
Animal.prototype.say = function () {
  return this.name
}
const cat = new Animal('kitty')
console.log(cat)
console.log(cat.hasOwnProperty('say'))
console.log('Animal.prototype', Animal.prototype)
console.log('Object.prototype', Object.prototype)
console.log('cat.__proto__', cat.__proto__)
console.log(cat.__proto__ === Animal.prototype)

// 新建类，添加lm方法
class LayerManager {
  constructor (map, lm) {
    this.map = map
    this.lm = lm
    this.layers = {}
  }
  a (params) {
    console.log(this.map)
  }
  lmFunc () {
    return lm
  }
}
let a1 = new LayerManager('a1', lm)
let $a2 = new LayerManager('a2', lm)
a1.lm.bindMap.call(a1, 'a1_Layer1')
a1.lm.bindMap.call(a1, 'a1_Layer2')
$a2.lm.bindMap.call($a2, 'a2_Layer1')
$a2.lm.bindMap.call($a2, 'a2_Layer2')
$a2.lmFunc().bindMap.call($a2, 'a2_Layer3')
console.log(a1)
console.log($a2)

// 方法文件导出的就是类
let $LayerManager = new LayerManager1('map-3')
$LayerManager.addLayer('asdasdakjhsdf')
console.log($LayerManager)
