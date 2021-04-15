function* generatorFn() {
    // 生成器函数在遇到yield之前会正常执行
    console.log('1 start');
    // 遇到yield之后执行会停止
    // yield有点像函数的中间返回语句 它生成的值会出现在next()方法返回的对象里
    // yield退出的生成器函数会处在done:false状态
    yield 1;
    console.log('2 start');
    // 通过return关键字退出的生成器函数会处于done:true状态
    // return 2;
    yield 2;
    console.log('3 start');
    // yield关键字只能在生成器函数内部使用，用着其他地方会抛出错误。
    yield 3;
    console.log('done');
}
const g = generatorFn();
const gg = generatorFn();
// 生成器对象实现了Iterable接口，它们默认的迭代器是自引用的
console.log(g === g[Symbol.iterator]());
const timeId = setInterval(function () {
    // 调用next()方法后开始执行
    // 返回值有一个done属性和一个value属性
    const {done, value} = g.next();
    console.log(`g:{done:${done}, value:${value}}`)
    // 调用next()方法直到让生成器到达done: true
    if (done) {
        clearInterval(timeId);
        // 生成器函数内部会针对每个生成器对象区分作用域。在一个生成器对象上调用next()不会影响其他生成器
        console.log('gg:', gg.next());
    }
}, 1000)
console.log('gg:', gg.next());
