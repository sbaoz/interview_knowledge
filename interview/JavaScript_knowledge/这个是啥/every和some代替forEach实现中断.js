/*
* 用every和some代替forEach
* every在return false的时候 终止循环
* some在return true的时候 终止循环
* */
let arr = [1,2,3]

console.log(arr.some(item => {
    console.log(item)
    return item > 1
}))

console.log(arr.every(item => {
    console.log(item)
    return item > 1
}))
