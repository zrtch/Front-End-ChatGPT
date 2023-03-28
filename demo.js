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

// 下面是一个 instanceof 运算符的例子：
class Animal { }

class Dog extends Animal { }

const dog = new Dog()
console.log(dog instanceof Animal); // true
console.log(dog instanceof Dog); // true
console.log(dog instanceof Object); // true
console.log('abc' instanceof String); // false,字符串字面量需要包装对象才能使用 instanceof。