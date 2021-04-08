setTimeout(function () {
    console.log('setTimeout');
}, 0)
process.nextTick(function () {
    console.log('nextTick1');
})
process.nextTick(function () {
    console.log('nextTick2');
})
setImmediate(function () {
    setTimeout(function () {
        console.log('setTimeout插入');
    }, 0)
    console.log('setImmediate1');
    process.nextTick(function () {
        console.log('nextTick插入');
    })
})
setImmediate(function () {
    console.log('setImmediate2');
})

console.log('正常执行')
