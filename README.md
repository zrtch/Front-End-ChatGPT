# 每日前端一问

- 2023.3.21 - CSS 之怪异盒模型和标准盒模型区别?

怪异盒模型是在早期浏览器中采用的盒模型，计算元素宽度时，包括了元素的内容宽度、内边距和边框宽度，但不包括外边距。

标准盒模型是 CSS2 中规定的盒模型，计算元素宽度时，仅包括元素的内容宽度，不包括内边距、边框和外边距，但可以通过设置 box-sizing 属性为 border-box 来改变盒模型。

区别在于：

盒子大小的不同
怪异盒模型的盒子大小为「内容宽度 + padding + border」的大小，而标准盒模型的盒子大小为「内容宽度」的大小。

box-sizing 属性
在标准盒模型中，设置 box-sizing 属性为 border-box 可以让元素大小计算包括 padding 和 border。

怪异盒模型中，由于计算盒子大小时已经包括了 padding 和 border，因此不存在 box-sizing 属性。

在 CSS3 中，新增加了一个属性 box-sizing，可以分别设置元素为 content-box、border-box 或 padding-box。具体设置可以根据实际需求进行调整。
