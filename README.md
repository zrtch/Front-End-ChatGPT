# ChatGPT 之每日一道 JS 手写题

### 如何模拟实现 call 方法

1. 在要改变 this 指向的函数的原型上，添加一个自定义的 myCall 方法；

2. 在 myCall 方法内部，将调用 myCall 方法的函数作为对象的一个属性（例如 fn ），并传入要绑定到该函数的 this 对象；

3. 执行该函数，并通过 apply 方法传入参数数组；

4. 返回该函数的执行结果，并删除添加的 fn 属性。

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

1. 在要改变 this 指向的函数的原型上，添加一个自定义的 myApply 方法；

2. 在 myApply 方法内部，将调用 myApply 方法的函数作为对象的一个属性（例如 fn ），并传入要绑定到该函数的 this 对象；

3. 执行该函数，并通过 apply 方法传入参数数组；

4. 返回该函数的执行结果，并删除添加的 fn 属性。

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

1. 在要改变 this 指向的函数的原型上，添加一个自定义的 myBind 方法；

2. 在 myBind 方法内部，保存调用 myBind 方法的函数（即原函数）的引用，以及绑定到该函数的 this 对象和参数列表；

3. 返回一个新函数，并在新函数中调用保存的原函数，并将绑定到该函数的 this 对象和参数列表传递给原函数。

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

### 实现一个防抖函数

### 实现一个节流函数
