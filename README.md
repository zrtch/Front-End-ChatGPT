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
