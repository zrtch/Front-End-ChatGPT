# 每日前端一问

### CSS 盒子摸型 ?

怪异盒模型是在早期浏览器中采用的盒模型，计算元素宽度时，包括了元素的内容宽度、内边距和边框宽度，但不包括外边距。

标准盒模型是 CSS2 中规定的盒模型，计算元素宽度时，仅包括元素的内容宽度，不包括内边距、边框和外边距，但可以通过设置 box-sizing 属性为 border-box 来改变盒模型。

区别在于：

1. 盒子大小的不同:
   怪异盒模型的盒子大小为「内容宽度 + padding + border」的大小，而标准盒模型的盒子大小为「内容宽度」的大小。

2. box-sizing 属性:
   在标准盒模型中，设置 box-sizing 属性为 border-box 可以让元素大小计算包括 padding 和 border。
   怪异盒模型中，由于计算盒子大小时已经包括了 padding 和 border，因此不存在 box-sizing 属性。

在 CSS3 中，新增加了一个属性 box-sizing，可以分别设置元素为 content-box、border-box 或 padding-box。具体设置可以根据实际需求进行调整。

### Html 之权重级别?

HTML 权重级别是在 CSS 控制样式时用于确定哪个规则优先应用的一种算法，主要有以下四个等级：

1. ID 权重（Specificity of ID selectors）: 通过 ID 选择器定义的样式优先级最高，ID 选择器的权重为 100。
2. Class，属性和伪类权重（Specificity of class selectors, attribute selectors, and pseudo-classes）：通过类选择器、属性选择器和伪类选择器定义的样式权重次之，它们的权重都为 10。
3. 元素和伪元素的权重（Specificity of element selectors and pseudo-elements）：通过元素选择器和伪元素选择器定义的样式权重较低，它们的权重都为 1。
4. 通配符和继承（Specificity of the universal selector, combinators, and inherited）：这是最低优先级，包括通用选择器、组合器和继承样式，它们没有特定的权重。

在规则具有相同优先级时，后定义的规则将被应用。在某些情况下，可以使用 !important 修饰符来提高 CSS 规则的权重，但应该避免使用它，因为它可以使代码难以调试和维护。

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

### CSS 中 BFC 的概念?

BFC 是指块级格式化上下文（Block Formatting Context），它是 Web 页面的可视化 CSS 渲染的一部分，这是根据 CSS 规范定义的一块渲染区域。在 BFC 中，块级盒子会按照一定规则排列，并且不会影响到 BFC 区域之外的元素布局。

换句话说，BFC 是一种渲染模式，它决定了元素如何被摆放，如何堆叠，以及它们之间的相互影响关系。当一个元素生成 BFC 时，它会创建一块独立渲染区域，该区域与其它元素之间互不干扰。这意味着，BFC 区域内的元素不会影响到其它元素的布局，同时也不会受到其它元素的影响。

常见生成 BFC 的情况包括：

- 根元素
- display 属性值为 inline-block、table-cell、table-caption，或者 inline-flex、inline-grid 的元素
- overflow 属性值不为 visible 的块级盒子
- float 属性值不为 none 的元素
- position 属性值为 absolute 或 fixed 的元素

BFC 可以用于解决很多布局问题，例如清除浮动影响，防止边距重叠等。

### 用过哪些 HTML5 新特性？

1. 新的语义标签，如 `<header>、<nav>、<article>、<section>、<footer> `等，使得网页结构更加清晰明了。
2. 改进的表单控件，如 `<input>` 的 type 属性新增了很多值，如 email、url、date、time 等，使得表单更容易填写，同时增加了一些表单验证的功能。
3. 新增的视频和音频标签 `<video>` 和 `<audio>`，使得嵌入多媒体内容变得更加方便，同时支持更多的视频和音频格式。
4. 新的 Canvas 绘图功能，使用 JavaScript 可以绘制各种复杂的图形、动画和游戏。
5. 改进的网页存储功能，如 sessionStorage 和 localStorage，使得网页可以在本地存储一些数据和状态，从而提高网页的性能和用户体验。
6. 新的 Web Workers 技术，可以在后台运行 JavaScript 代码，从而提高网页响应速度和性能。
7. Geolocation 地理位置 API，可以获取用户的位置信息，从而实现各种有趣的地理位置相关功能。
8. 改进的 Websocket 技术，使得网页上的实时通信变得更加方便和高效。

### instanceof 作用与原理

instanceof 是 JavaScript 中的一个运算符，用于检查一个对象是否是某个构造函数创建的实例。其语法如下：`object instanceof constructor`

- 其中，object 是要检查的对象，constructor 是构造函数。如果 object 是 constructor 创建的实例或者是 constructor 的子类的实例，则返回 true；否则返回 false。
- instanceof 运算符的实现原理是通过检查 object 原型链上的所有原型对象，看是否存在 constructor.prototype。如果存在，返回 true；否则返回 false。
- 需要注意的是，object 和 constructor 必须都是对象（原始类型会被自动转换成对应的包装对象），否则会抛出 TypeError 错误。此外，对于内置对象如 Array、RegExp 等，由于它们都继承自 Object.prototype，所以 instanceof 运算符总是返回 true。

```js
// 下面是一个 instanceof 运算符的例子：
class Animal {}

class Dog extends Animal {}

const dog = new Dog()
console.log(dog instanceof Animal) // true
console.log(dog instanceof Dog) // true
console.log(dog instanceof Object) // true
console.log('abc' instanceof String) // false,字符串字面量需要包装对象才能使用 instanceof。
```

### 重排 & 重绘

### position

### HTTPS 加密

### apply 与 call

### CSS 选择器

### React Hoc 组件

### 优化页面白屏时简

### DOM 事件楼型

### 0.1 + 0.2 !== 03

### 浏览器缓存 策路

### 原型链

### Vue computed 属性

### Webpack Loader

### 柯里化 curry

### 判断单链表是否有环

### 斐波那契

### DOM 树

### 前端模块化机制

### React 合事件

### 离职原因描述

### Koa 中间件原理

### treeshaking

### 行内元案、块元素

### 二叉树

### JS 事件循环机制

### JS 变量提升

### Vue nextTick

### Babel 核心流程

### CSS 的选择器优先级机制

### 前端性能忧化

### Vue Computed 和 Watch

### 求解平方根

### Trim 方法实现

### JS 内存泄露间题排查

### 动面性能忧化

### Webpack 插件机制

### 判断括号字符串有效

### V8 垃级回收机制

### HTTP2.0 改进点

### 判断括号字符串有效

### React fiber 原理及优点

### 网站大量图片加载慢的化化

### 闭包作用及原理

### 最近看的书和心得

### Node require 具体实现

### 浏览器输入 URL 到展现的过程

### Webpack 工作流程

### 1 分钟自我介绍

### 进程通信方式

### Vue 的 keep alive

### React 的性能优化点

### WebSocket 连接建立的过程

### 进程和线程的区别

### UglifyJS 原理
