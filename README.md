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

### 实现一个深拷贝函数

该函数接收一个对象作为参数，返回这个对象的深拷贝副本。当参数不是对象或者为 null 时，直接返回该参数；否则新建一个对象或数组（根据参数的类型而定），并遍历原始对象中的所有可枚举属性，逐一将它们的值递归地拷贝到新对象中。

需要注意的是，在拷贝属性值时，也需要递归地调用 deepClone 函数，保证子对象的递归拷贝。

```js
// 以下是一个基于递归实现的深拷贝函数:
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}

// 以下是一个简单示例：
const obj = {
  a: 1,
  b: [2, 3, { c: 'hello' }],
  d: { e: 'world' },
}
const newObj = deepClone(obj)
console.log(newObj) // 输出结果应该和原始对象相同，但两者不会互相影响。
```

### 实现一个单例模式

单例模式是一种常用的设计模式，它保证一个类只有一个实例，并且提供一个全局访问点。
在 JavaScript 中实现单例模式可以使用闭包和立即执行函数表达式（IIFE）。具体实现如下：

```js
const Singleton = (function () {
  let instance

  function createInstance() {
    const obj = new Object('I am the Singleton!')
    return obj
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    },
  }
})()

const instance1 = Singleton.getInstance()
const instance2 = Singleton.getInstance()
console.log(instance1 === instance2) // 输出 true
```

上述代码中，Singleton 是一个立即执行函数表达式（IIFE），它返回一个包含 getInstance 方法的对象。该方法根据 instance 是否存在来判断是否需要创建 createInstance 函数所创建的实例。
通过 Singleton.getInstance() 方法获取单例实例，多次调用该方法返回的都是同一个对象实例。注意：该示例不是线程安全的，如果需要使用单例模式处理并发问题需要进行额外的处理。

```js
var Singleton = (function () {
  var instance

  function createInstance() {
    // Your initialization code goes here
    return {
      publicMethod: function () {
        console.log('Public method')
      },
      publicProperty: 'I am a public property',
    }
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    },
  }
})()

// usage
var instance1 = Singleton.getInstance()
var instance2 = Singleton.getInstance()

console.log(instance1 === instance2) // true
```

在这个实现中，使用了立即执行函数创建 Singleton 对象。getInstance()方法返回一个 Singleton 实例并确保它是唯一的。

我们将 instance 设置为私有变量，确保外部不能直接访问它。只有在第一次调用 getInstance()时，createInstance()函数才会被调用来初始化这个实例，并将其赋值给 instance。

返回的实例对象有一些公共属性和方法，可以通过它来调用，如 instance1.publicMethod()。由于这是单例模式，所以 instance1 和 instance2 会指向同一实例，并且 Console.log(instance1 === instance2)将返回 true。

### 实现一个函数柯里化

柯里化是一种函数式编程技术，它将接收多个参数的函数转换成一个接收单个参数并返回接受余下参数并返回结果的函数序列的过程。以下是一个简单的 JavaScript 实现：

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
```

这个函数接受一个函数作为参数，返回一个柯里化的函数。在柯里化函数被调用时，它会检查传递的参数数量是否大于等于原始函数需要的参数数量。如果是，它会立即调用原始函数并返回结果。否则，它将返回一个新函数，该函数将与之前传递的参数组合在一起，并等待余下的参数被传递进来。

```js
// 例如，我们可以使用这个函数来柯里化一个简单的加法函数：
function add(x, y, z) {
  return x + y + z
}

const curriedAdd = curry(add)

console.log(curriedAdd(1)(2)(3)) // 输出 6
console.log(curriedAdd(1, 2)(3)) // 输出 6
console.log(curriedAdd(1)(2, 3)) // 输出 6
console.log(curriedAdd(1, 2, 3)) // 输出 6
```

这个例子展示了我们如何使用柯里化函数 curry 来转换原始的 add 函数。无论我们传递参数的方式如何，curriedAdd 都能正确计算结果。

### 手写闭包

闭包是指一个函数能够访问并操作其词法作用域中的变量，即使在这些变量超出了函数执行环境时依然有效。在 JavaScript 中，闭包常常用于模块化编程和实现私有变量等场景。

```js
function outerFunction() {
  const outerVariable = 'I am from outer function'

  function innerFunction() {
    console.log(outerVariable)
  }

  return innerFunction
}

const closure = outerFunction() // 通过外部函数调用获得内部函数
closure() // 输出 "I am from outer function"
```

在这个例子中，innerFunction() 访问了其外层函数 outerFunction() 中的变量 outerVariable。尽管 outerFunction() 已经执行完毕，innerFunction() 依然能够访问和操作 outerVariable 变量，这就是闭包的实现。

通过在函数内部定义函数并返回它，我们可以创建一个闭包。在返回的函数内部，可以使用外部函数中定义的变量，即使外部函数已经执行完毕，这些变量依然能够保持其值。在上面的示例中，outerVariable 的值在 innerFunction() 中被访问并输出。

### 模拟实现一个 Promise 类

请注意，这个实现是非常简单的，它只实现了 Promise 的基本功能，并没有处理异步操作，也没有支持链式调用。这个实现只是为了演示 Promise 的基本概念。实际上，现代的 Promise 实现会更加复杂，因为它们需要处理更多的场景和错误情况。

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
      }
    }

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    } else if (this.state === 'rejected') {
      onRejected(this.reason)
    }
  }

  catch(onRejected) {
    if (this.state === 'rejected') {
      onRejected(this.reason)
    }
  }
}
```

### 实现一个简易版的事件订阅发布系统（即发布-订阅模式
