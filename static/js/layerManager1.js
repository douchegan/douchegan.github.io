class LayerManager {
  constructor (map) {
    this.map = map
    this.layers = {}
    console.log('layerManager-init')
  }
  addLayer (key) {
    this.layers[key] = key + 'aaaaaaaaaa'
  }
  bindMap (key) {
    this.layers[key] = key + '123123123123'
  }
}
export default LayerManager
