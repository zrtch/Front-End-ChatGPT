# ChatGPT 之每日一道 JS 手写题

### 如何模拟实现 call 方法

```js
Function.prototype.myCall = function (context, ...args) {
  // 如果context为null或undefined，则使用window对象
  context = context || window
  // 将当前函数作为对象的一个属性
  context.fn = this
  // 执行该函数
  const result = context.fn(...args)
  // 删除对象中的该属性
  delete context.fn
  // 返回函数执行结果
  return result
}

// 示例
function sayHello() {
  console.log(`Hello, ${this.name}!`)
}
const person = { name: 'Peter' }
sayHello.myCall(person)
```

### 如何模拟实现 apply 方法

```js
Function.prototype.myApply = function (context, args = []) {
  // 如果context为null或undefined，则使用window对象
  context = context || window
  // 将当前函数作为对象的一个属性
  context.fn = this
  // 执行该函数
  const result = context.fn(...args)
  // 删除对象中的该属性
  delete context.fn
  // 返回函数执行结果
  return result
}

// 示例
function sayHello(greeting) {
  console.log(`${greeting}, ${this.name}!`)
}
const personApply = { name: 'Peter' }
const args = ['Good morning']
sayHello.myApply(personApply, args) // Good morning, Peter!
```

### 如何模拟实现 bind 方法

```js
Function.prototype.myBind = function (context, ...args1) {
  const self = this
  return function (...args2) {
    // 调用时，合并两次传入的参数，并执行原函数
    return self.apply(context, args1.concat(args2))
  }
}

// 示例
function sayHello(greeting) {
  console.log(`${greeting}, ${this.name}!`)
}
const personBind = { name: 'Peter' }
const boundFunc = sayHello.myBind(personBind)
boundFunc('Good afternoon')
```

### 请在 JavaScript 中实现一个类?

该类包含一个属性 count 和两个方法 increment 和 decrement。increment 方法会将 count 的值加 1，decrement 方法会将 count 的值减 1。

```js
class Counter {
  constructor() {
    this.count = 0
  }
  increment() {
    this.count++
  }
  decrement() {
    this.count--
  }
}

const counter = new Counter()
console.log(counter.count) // 0
counter.increment()
console.log(counter.count) // 1
counter.decrement()
console.log(counter.count) // 0
```
