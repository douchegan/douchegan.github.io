class DNode {
  constructor (data) {
    this.data = data
    this.next = null
    this.prev = null
  }
}

class DLinkedList {
  constructor () {
    this.head = null
    this.tail = null
  }
  append (item) {
    let node = new DNode(item)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      node.prev = this.tail
      this.tail.next = node
      this.tail = node
    }
  }
  reverse () {
    let current = this.head
    let prev = null
    while (current) {
      let next = current.next
      current.next = prev
      current.prev = next
      prev = current
      current = next
    }
    this.tail = this.head
    this.head = prev
  }
  // 两节点交换
  swap (nodeOne, nodeTwo) {
    let current = this.head
    let index = 0
    let firstNode
    while (current) {
      if (index === nodeOne) {
        firstNode = current
      } else if (index === nodeTwo) {
        let data = current.data
        current.data = firstNode.data
        firstNode.data = data
      }
      current = current.next
      index++
    }
  }
}

const dl = new DLinkedList()

// 添加节点
const dvalues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
dvalues.forEach(value => dl.append(value))

// dl.reverse()
dl.swap(1, 3)
console.log(dl)
