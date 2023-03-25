# 每日前端一问

### 2023.3.21 - CSS 之怪异盒模型和标准盒模型区别?

怪异盒模型是在早期浏览器中采用的盒模型，计算元素宽度时，包括了元素的内容宽度、内边距和边框宽度，但不包括外边距。

标准盒模型是 CSS2 中规定的盒模型，计算元素宽度时，仅包括元素的内容宽度，不包括内边距、边框和外边距，但可以通过设置 box-sizing 属性为 border-box 来改变盒模型。

区别在于：

1. 盒子大小的不同:
   怪异盒模型的盒子大小为「内容宽度 + padding + border」的大小，而标准盒模型的盒子大小为「内容宽度」的大小。

2. box-sizing 属性:
   在标准盒模型中，设置 box-sizing 属性为 border-box 可以让元素大小计算包括 padding 和 border。
   怪异盒模型中，由于计算盒子大小时已经包括了 padding 和 border，因此不存在 box-sizing 属性。

在 CSS3 中，新增加了一个属性 box-sizing，可以分别设置元素为 content-box、border-box 或 padding-box。具体设置可以根据实际需求进行调整。

### 2023.3.22 - Html 之权重级别?

HTML 权重级别是在 CSS 控制样式时用于确定哪个规则优先应用的一种算法，主要有以下四个等级：

1. ID 权重（Specificity of ID selectors）: 通过 ID 选择器定义的样式优先级最高，ID 选择器的权重为 100。
2. Class，属性和伪类权重（Specificity of class selectors, attribute selectors, and pseudo-classes）：通过类选择器、属性选择器和伪类选择器定义的样式权重次之，它们的权重都为 10。
3. 元素和伪元素的权重（Specificity of element selectors and pseudo-elements）：通过元素选择器和伪元素选择器定义的样式权重较低，它们的权重都为 1。
4. 通配符和继承（Specificity of the universal selector, combinators, and inherited）：这是最低优先级，包括通用选择器、组合器和继承样式，它们没有特定的权重。

在规则具有相同优先级时，后定义的规则将被应用。在某些情况下，可以使用 !important 修饰符来提高 CSS 规则的权重，但应该避免使用它，因为它可以使代码难以调试和维护。

### 2023.3.23 - 请在 JavaScript 中实现一个类?

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

### 2023.3.25 - CSS 中 BFC 的概念?

BFC 是指块级格式化上下文（Block Formatting Context），它是 Web 页面的可视化 CSS 渲染的一部分，这是根据 CSS 规范定义的一块渲染区域。在 BFC 中，块级盒子会按照一定规则排列，并且不会影响到 BFC 区域之外的元素布局。

换句话说，BFC 是一种渲染模式，它决定了元素如何被摆放，如何堆叠，以及它们之间的相互影响关系。当一个元素生成 BFC 时，它会创建一块独立渲染区域，该区域与其它元素之间互不干扰。这意味着，BFC 区域内的元素不会影响到其它元素的布局，同时也不会受到其它元素的影响。

常见生成 BFC 的情况包括：

- 根元素
- display 属性值为 inline-block、table-cell、table-caption，或者 inline-flex、inline-grid 的元素
- overflow 属性值不为 visible 的块级盒子
- float 属性值不为 none 的元素
- position 属性值为 absolute 或 fixed 的元素

BFC 可以用于解决很多布局问题，例如清除浮动影响，防止边距重叠等。
