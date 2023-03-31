function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearInterval(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
      timer = null
    }, delay)
  }
}
//示例
function sayHello() {
  console.log('hello');
}
const debounceSayHello = debounce(sayHello, 1000)
setInterval(debounceSayHello, 500)