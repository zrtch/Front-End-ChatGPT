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

// 手写闭包:在这个例子中，innerFunction() 访问了其外层函数 outerFunction() 中的变量 outerVariable。尽管 outerFunction() 已经执行完毕，innerFunction() 依然能够访问和操作 outerVariable 变量，这就是闭包的实现。
function outerFunction() {
  const outerVariable = 'i am form outer function'

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction
}

const closure = outerFunction() // 通过外部函数调用获得内部函数
closure()  // 输出 "I am from outer function"

// 模拟实现一个 Promise 类
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

//  实现一个简易版的事件订阅发布系统（即发布-订阅模式
var eventCenter = (function () {
  var events = {}

  function subscribe(eventName, callback) {
    if (!events[eventName]) {
      events[eventName] = []
    }
    events[eventName].push(callback)
  }

  function unsubscribe(eventName, callback) {
    if (!events[eventName]) {
      return
    }

    var index = events[eventName].indexOf(callback)
    if (index > -1) {
      events[eventName].splice(index, 1)
    }
  }

  function publish(eventName, data) {
    if (!events[eventName]) {
      return
    }

    events[eventName].forEach(function (callback) {
      callback(data)
    })
  }

  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    publish: publish,
  }
})()

// Usage example:
eventCenter.subscribe('someEvent', function (data) {
  console.log('Received someEvent with data:', data)
})

eventCenter.publish('someEvent', 'Hello, world!')

eventCenter.unsubscribe('someEvent', callback)


//  手写一个 new 操作符

function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype)
  const result = constructor.apply(obj, args)
  return typeof result === 'object' ? result : obj
}

//  Trim 方法实现
function trim(str) {
  if (str && typeof str === 'string') {
    // 使用正则表达式匹配空格，并使用空字符串替换
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
  return str
}

const s = ' hello world'
const s_trimmed = trim(s)
console.log(s_trimmed); // hello world

// 原型链
// 定义一个 Animal 构造函数
function Animal(name) {
  this.name = name;
}

// 为 Animal 的原型对象添加一个 say 方法
Animal.prototype.say = function () {
  console.log(`My name is ${this.name}`);
};

// 定义一个 Cat 构造函数，并将其原型对象设置为 Animal 的实例
function Cat(name, color) {
  this.name = name;
  this.color = color;
}
Cat.prototype = new Animal();

// 为 Cat 的原型对象添加一个 catchMouse 方法
Cat.prototype.catchMouse = function () {
  console.log(`${this.name} is catching a mouse!`);
};

// 创建一个 Cat 实例
var garfield = new Cat("Garfield", "orange");

// 调用 garfield 的 say 和 catchMouse 方法
garfield.say(); // My name is Garfield
garfield.catchMouse(); // Garfield is catching a mouse!

// 柯里化
function add(x, y) {
  return x + y
}
function curryAdd(x) {
  return function (y) {
    return add(x, y)
  }
}
const addOne = curryAdd(1)
console.log(addOne(3)); // 4

// 手写一个方法，取两个数组的交集
function getIntersection(arr1, arr2) {
  const result = [] // 保存结果
  // 创建一个 Set 数据结构来保存第一个数组〝arr1、中的所有元素。
  const set = new Set(arr1)
  // 接着我们遍历第二个数组〝arr2、中的所有元素，
  for (const num of arr2) {
    // 如果元素在 Set 中存在，则说明这个元素是两个数组的交集元素，将其添加到结果数组中，
    if (set.has(num)) {
      result.push(num)
      set.delete(num)
    }
  }
  return result
}
const arr1 = [1, 2, 3, 4, 5]
const arr2 = [3, 4, 5, 6, 7]
const intersection = getIntersection(arr1, arr2)
console.log(intersection); // [ 3, 4, 5 ]

// 请实现一个函数，满足以下功能 
// // 1
// add(1)(2) // 3
// add(1)(2)(3) // 6
// add(1)(2,3) // 6
// add(1,2)(3) // 6
// 可以使用 JavaScript 的闭包和递归实现一个满足以上功能的函数
function add(...args) {
  const fn = (...rest) => add(...args, ...rest)
  fn.valueOf = () => args.reduce((acc, cur) => acc + cur, 0)
  return fn
}
console.log(add(1)); // 1

// 请手动实现数组的flat方法
// let a = [1,2,[3],[4,5],6]
// a.fakeFlat(Infinity) // 输出[1,2,3,4,5,6]
Array.prototype.fakeFlat = function (depth = 1) {
  let result = []
  const flatten = function (arr, depth) {
    arr.forEach(item => {
      if (Array.isArray(item) && depth > 0) {
        flatten(item, depth - 1)
      } else {
        result.push(item)
      }
    })
  }
  flatten(this, depth)
  return result
}
let a2 = [1, 2, [3], [4, 5], 6]
console.log(a2.fakeFlat(Infinity)); // [ 1, 2, 3, 4, 5, 6 ]

// JavaScript实现千位分隔符
// 1. toLocaleString() 方法返回这个数字在特定语言环境下的表示字符串。
let num1 = 1234567875
let num2 = 673439.4542
console.log(num1.toLocaleString()); // 1,234,567,875
console.log(num2.toLocaleString()); // 673,439.454

// 2. 实现思路是将数字转换为字符数组，再循环整个数组， 每三位添加一个分隔逗号，最后再合并成字符串
function numFormat(num) {
  num = num.toString().split(".");  // 分隔小数点
  var arr = num[0].split("").reverse();  // 转换成字符数组并且倒序排列
  var res = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (i % 3 === 0 && i !== 0) {
      res.push(",");   // 添加分隔符
    }
    res.push(arr[i]);
  }
  res.reverse(); // 再次倒序成为正确的顺序
  if (num[1]) {  // 如果有小数的话添加小数部分
    res = res.join("").concat("." + num[1]);
  } else {
    res = res.join("");
  }
  return res;
}

var a1 = 1234567894532;
var b = 673439.4542;
console.log(numFormat(a1)); // "1,234,567,894,532"
console.log(numFormat(b)); // "673,439.4542"


// 实现一个数组去重函数
function unique(arr) {
  // 使用 Set 去重，并将 Set 转为数组返回结果。
  return Array.from(new Set(arr))
}
console.log(unique([1, 1, 2, 3, 4, 4, 5])); // [ 1, 2, 3, 4, 5 ]

// 实现一个数组交集函数
function intersection(arr1, arr2) {
  return Array.from(new Set(arr1.filter(item => arr2.includes(item))));
}
console.log(intersection([1, 2, 3, 4, 5], [1, 2, 22, 6])); // [1,2]

// 实现一个数组并集函数
function union(arr1, arr2) {
  return Array.from(new Set([...arr1, ...arr2]));
}
console.log(union([1, 2, 3, 4, 5], [1, 2, 22, 6])); // [1,2,3,4,5,22,6]

// 实现一个数组差集函数
function difference(arr1, arr2) {
  return Array.from(new Set([...arr1].filter(item => !arr2.includes(item))));
}
console.log(difference([1, 2, 3, 4, 5], [1, 2, 22, 6])); // [3,4,5]

// 定一个字符串类型的对象
const str = { name: 'Tom', age: '20', sex: 'male' }
const str2 = JSON.stringify(str) // "{"name":"Tom","age":"20","sex":"male"}"
console.log(JSON.parse(str2)); // { name: 'Tom', age: '20', sex: 'male' }

// 检查一个对象是否是某个构造函数创建的实例
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}
const perosn = new Person('tom', 20)
const noperson = { name: 'tom', age: 11 }
console.log(perosn instanceof Person); // true
console.log(noperson instanceof Person); // true

// 手写闭包
function add(x) {
  return function (y) {
    return x + y;
  };
}

// 使用闭包创建一个加法函数 add5
var add5 = add(5);

// 调用 add5 函数
console.log(add5(2)); // 输出7
console.log(add5(10)); // 输出15

// 将数组换成成树结构
function buildTree(arr, parentId = null) {
  let tree = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].parentId === parentId) {
      let node = {
        id: arr[i].id,
        name: arr[i].name,
        child: buildTree(arr, arr[i].id)
      }
      tree.push(node)
    }
  }
  return tree
}

let arr = [
  { id: 1, name: 'Node 1', parentId: null },
  { id: 2, name: 'Node 2', parentId: 1 },
  { id: 3, name: 'Node 3', parentId: 1 },
  { id: 4, name: 'Node 4', parentId: 2 },
  { id: 5, name: 'Node 5', parentId: 2 },
  { id: 6, name: 'Node 6', parentId: 3 },
  { id: 7, name: 'Node 7', parentId: 3 },
  { id: 8, name: 'Node 8', parentId: null }
]

let tree = buildTree(arr, null)
console.log(JSON.stringify(tree));

// 编写一个程序将数组扁平化并去除其中重复部分数据，最终得到一个升序且不重复的数组。（扁平化、去重、排序）
function flattenAndSort(arr) {
  // 使用 Set 数据结构存储去重后的元素
  const uniqueSet = new Set();

  // 递归遍历数组元素
  function flatten(arr) {
    arr.forEach(item => {
      if (Array.isArray(item)) {
        // 如果当前元素是数组，递归调用 flatten 函数
        flatten(item);
      } else {
        // 将非数组元素添加到 Set 中
        uniqueSet.add(item);
      }
    });
  }

  // 调用扁平化函数
  flatten(arr);

  // 将 Set 转换为数组，并进行升序排序
  const result = Array.from(uniqueSet).sort((a, b) => a - b);

  return result;
}


// 排序
const array = [2, 5, 3]
const sortarr = array.sort((a, b) => a - b)
console.log(sortarr); // [ 2, 3, 5 ]

// 代码输出值
var a = 10;
(function () {
  console.log(a); // undefined
  a = 5;
  console.log(b); // reference
  let b = 15
  console.log(window.a); // 10
  var a = 20;
  console.log(a); // 20
})()
// undefined, ReferenceError: Cannot access 'b' before initialization, 10, 20

// 打印顺序
async function async1() {
  console.log(1);
  await async2()
  console.log(2);
}
async function async2() {
  console.log(3);
}
console.log(4);
setTimeout(() => {
  console.log(5);
}, 0);
async1()
console.log(8);

// 4 1 3 8 2 5


// 1.1请用Promise实现sleep方法，等待n毫秒后返回
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
sleep(1000).then(() => {
  console.log('1秒后执行')
})

// 1.2使用async/await 改写printSomeThing方法
async function printSomeThing() {
  try {
    await sleep(2000)
    console.log('两秒后执行');
  } catch (err) {
    console.log('oops! error!', err);
  }
}
printSomeThing()