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

防抖函数可以用于防止某些事件过快地被触发，例如用户频繁点击按钮或输入框中频繁输入。

1. 在需要防抖的函数最开始处定义一个定时器变量 timer，初始值为 null。
2. 当需要执行该函数时，清除之前的定时器，并重新设置一个新的定时器。因为在间隔时间内再次触发了函数，那么就会清除之前的定时器，重新计时。
3. 如果过了规定的时间间隔，定时器变量 timer 就不再是 null，此时就可以执行函数，执行后将定时器变量重新设为 null。

```js
function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
      timer = null
    }, delay)
  }
}

// 示例
function sayHello() {
  console.log('Hello!')
}
const debouncedSayHello = debounce(sayHello, 1000)
setInterval(debouncedSayHello, 500)
```

在上面的示例中，sayHello 函数被包装到了 debounce 函数里，并返回一个新的函数 debouncedSayHello，这个新函数具备防抖能力，每隔 500ms 就会执行一次，但由于设置了 1s 的防抖延迟，因此函数只会每隔 1s 执行一次。

### 实现一个节流函数

节流函数的核心思路就是通过定时器来限制高频事件的触发次数，从而达到性能优化的效果。

```js
function throttle(func, delay) {
  let canRun = true
  return function (...args) {
    if (!canRun) {
      return
    }
    canRun = false
    setTimeout(() => {
      func.apply(this, args)
      canRun = true
    }, delay)
  }
}
```

该函数接收两个参数：要执行的函数和时间间隔，以毫秒为单位。当调用该函数时，它会返回一个新函数，这个新函数只有在每隔 delay 时间执行一次。

具体实现方式为：利用一个布尔型变量 canRun 来控制函数是否可以执行。当新函数被调用时，首先判断 canRun 的值，如果为 false，说明还没有到可以执行的时间，直接 return 掉；否则将 canRun 设为 false，并使用 setTimeout 延迟一段时间，在延迟结束后再次设置 canRun 为 true，并执行函数。
