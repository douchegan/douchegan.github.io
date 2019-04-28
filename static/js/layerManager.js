export function bindMap (key) {
  this.layers[key] = key + '123123123123'
}

export function addLayer (key) {
  this.layers[key] = key + 'aaaaaaaaaa'
}

export default {
  bindMap,
  addLayer
}
