// 柯理化 是一种将使用多个参数的函数转换成一系列使用一个参数的函数的技术（参数复用，降低通用性，提高适用性）
// 用闭包把参数保存起来，当参数的数量足够执行函数了，就开始执行函数
// 基础款
const curry1 = function (fn) {
    const arg = [].slice.call(arguments, 1)
    return function () {
        const newArg = [].slice.call(arguments)
        return fn.apply(this, arg.concat(newArg))
    }
}
const sum = function (a, b) {
    return a + b
}
const func1 = curry1(sum, 1)
console.log(func1(2));
// 将基础款作为辅助函数
const sub_curry = function (fn) {
    console.log(fn, arguments)
    const arg = [].slice.call(arguments, 1)
    return function () {
        const newArg = [].slice.call(arguments)
        return fn.apply(this, arg.concat(newArg))
    }
}
const curry2 = function(fn, length) {
    const slice = Array.prototype.slice
    length = length || fn.length
    return function() {
        if (arguments.length < length) {
            const combined = [fn].concat(slice.call(arguments))
            return curry2(sub_curry.apply(this, combined), length - arguments.length)
        } else {
            return fn.apply(this, arguments)
        }
    }
}
const func2 = curry2(sum)
console.log(func2(1)(2));
