// push（value） - 在链表的末尾/头部添加一个节点
// pop（） - 从链表的末尾/头部删除一个节点
// get（index） - 返回指定索引处的节点
// delete（index） - 删除指定索引处的节点
// isEmpty（） - 根据列表长度返回true或false
// print（） - 返回链表的可见表示
class Node {
  constructor (data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  constructor () {
    this.head = null
    this.tail = null
    this.length = 0
  }
  push (data) {
    // 创建新的节点
    const node = new Node(data)
    if (!this.head) {
      this.head = node
      this.tail = node
    }
    this.tail.next = node
    this.tail = node
    this.length++
  }
  pop () {
    if (this.isEmpty()) {
      return null
    }
    if (this.head === this.tail) {
      this.head = null
      this.tail = null
      this.length--
      return this.tail
    }
    let node = this.tail
    let currentNode = this.head
    while (currentNode) {
      if (currentNode.next === this.tail) {
        break
      }
      currentNode = currentNode.next
    }
    currentNode.next = null
    this.tail = currentNode
    this.length--
    return node
  }
  get (index) {
    if (index === 0) {
      return this.head
    }
    if (index < 0 || index > this.length) {
      return null
    }
    let currentNode = this.head
    let i = 0
    while (i < index) {
      i++
      currentNode = currentNode.next
    }
    return currentNode
  }
  delete (index) {
    let currentNode = this.head
    if (index === 0) {
      this.head = this.head.next
      this.length--
      return currentNode
    }
    if (index < 0 || index > this.length) {
      return null
    }
    // if (index === this.length) {
    //   return this.pop()
    // }
    let i = 0
    let previous
    while (i < index) {
      i++
      previous = currentNode
      currentNode = currentNode.next
    }
    if (!currentNode.next) {
      previous.next = null
      this.tail = previous
    } else {
      previous.next = currentNode.next
    }
    this.length--
    return currentNode
  }
  isEmpty () {
    return this.length === 0
  }
  print () {
    const list = []
    let currentNode = this.head
    while (currentNode) {
      list.push(currentNode.data)
      currentNode = currentNode.next
    }
    return list.join(' => ')
  }
}

const l = new LinkedList()

// 添加节点
const values = ['A', 'B', 'C', 'd']
values.forEach(value => l.push(value))

console.log(l.print())
console.log(l.pop())
// console.log(l.get(1))
// console.log(l.isEmpty())
// console.log(l.delete(0))
// console.log(l.print())
// console.log(l.delete(3))
console.log(l.print())
console.log(l)
