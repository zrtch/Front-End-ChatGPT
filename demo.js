// 如何模拟实现call方法
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
const person = { name: "Peter" }
sayHello.myCall(person)

// 如何模拟实现apply方法
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
const personApply = { name: "Peter" }
const args = ["Good morning"]
sayHello.myApply(personApply, args) // Good morning, Peter!

// 如何模拟实现bind方法
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
const personBind = { name: "Peter" }
const boundFunc = sayHello.myBind(personBind)
boundFunc("Good afternoon")


// 请在 JavaScript 中实现一个类?
class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++
  }
  decrement() {
    this.count--
  }
}

const counter = new Counter()
console.log(counter.count); // 0
counter.increment()
console.log(counter.count); // 1
counter.decrement()
console.log(counter.count); // 0

// 实现一个防抖函数
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
  console.log("Hello!")
}
const debouncedSayHello = debounce(sayHello, 1000)
setInterval(debouncedSayHello, 500)

// 实现一个节流函数
// 利用一个布尔型变量 canRun 来控制函数是否可以执行。当新函数被调用时，首先判断 canRun 的值，如果为 false，说明还没有到可以执行的时间，直接 return 掉；否则将 canRun 设为 false，并使用 setTimeout 延迟一段时间，在延迟结束后再次设置 canRun 为 true，并执行函数。
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

// 实现一个单例模式的示例代码
var Singleton = (function () {
  var instance;

  function createInstance() {
    // Your initialization code goes here
    return {
      publicMethod: function () {
        console.log("Public method");
      },
      publicProperty: "I am a public property"
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

// usage
var instance1 = Singleton.getInstance();
var instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true


// 实现柯里化函数
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

function add(x, y, z) {
  return x + y + z;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 输出 6
console.log(curriedAdd(1, 2)(3)); // 输出 6
console.log(curriedAdd(1)(2, 3)); // 输出 6
console.log(curriedAdd(1, 2, 3)); // 输出 6

