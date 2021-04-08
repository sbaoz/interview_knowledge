/*
* 常见的类数组：arguments HTMLCollection nodeList
* 常用转换方式
* 1. Array.prototype.slice.call()
* 2. Array.from()
* 3. 展开运算符
* 4. concat+apply
* */
function sum1(a,b) {
    let args = Array.prototype.slice.call(arguments)
    console.log(args.reduce((sum, cur) => sum + cur))
}
sum1(1,2)

function sum2(a,b) {
    let args = Array.from(arguments)
    console.log(args.reduce((sum, cur) => sum + cur))
}
sum2(1,2)

function sum3(a,b) {
    let args = [...arguments]
    console.log(args.reduce((sum, cur) => sum + cur))
}
sum3(1,2)

function sum4(a,b) {
    let args = Array.prototype.concat.apply([], arguments)
    console.log(args.reduce((sum, cur) => sum + cur))
}
sum4(1,2)
