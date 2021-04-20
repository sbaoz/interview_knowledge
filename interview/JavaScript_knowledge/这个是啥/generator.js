function* generatorFn_1() {
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
const g = generatorFn_1();
const gg = generatorFn_1();
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

// 生成器对象作为可迭代对象
function *generatorFn_2() {
    yield 1;
    yield 2;
    yield 3;
}
for (const x of generatorFn_2()) {
    console.log(x);
}

// 使用yield实现输入和输出
function* generatorFn_3(initial) {
    console.log(initial);
    console.log(yield);
    console.log(yield);
}

const g_3 = generatorFn_3('foo');
// 第一次调用next()传入的值不会被使用，因为这一次是为了开始执行生成器函数
g_3.next('bar'); // foo
// 上一次让生成器函数暂停的yield关键字会接收到传给next()方法的第一个值
g_3.next('baz'); // baz
g_3.next('qux'); // qux

// yield关键字可以同时用于输入和输出
function* generatorFn_4() {
    // 因为函数必须对整个表达式求值才能确定要返回的值
    // 所以它在遇到yield关键字是暂停执行并计算出要产生的值：foo
    // 下一次调用next()传入bar 作为交给同一个yield的值
    // 这个值被确定为本次生成器函数要返回的值
    return yield 'foo';
}

const g_4 = generatorFn_4();
console.log(g_4.next()); // { value: 'foo', done: false }
console.log(g_4.next('bar')); // { value: 'bar', done: true }

// 产生可迭代对象 可以使用星号增强yield的行为 让它能够迭代一个可迭代对象 从而一次产出一个值
function *generatorFn_5() {
    // yield*的值是关联迭代器返回done: true时的value属性
    // 对于普通迭代器来说 这个值是undefined
    console.log('iter value:', yield* [1,2,3]); // undefined
}
for (const x of generatorFn_5()) {
    console.log('g_5', x);
}
function *innerGeneratorFn_6() {
    // 对于生成器函数产生的迭代器来说 这个值是生成器函数返回的值
    yield 'foo';
    return 'bar';
}
function* outerGeneratorFn_6() {
    console.log('iter value:', yield* innerGeneratorFn_6()); // bar
}
for (const x of outerGeneratorFn_6()) {
    console.log('g_6', x);
}

// 使用yield*实现递归算法
