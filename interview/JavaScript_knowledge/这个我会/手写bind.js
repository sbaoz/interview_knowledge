/*
* bind函数的两个特点
* 1. 返回一个函数
* 2. 可以传入参数
*/

Function.prototype._bind = function () {
    // 获取传入的参数
    const argArr = Array.prototype.slice.call(arguments);
    // 获取新的this
    const context = argArr.shift();
    // this是调用bind的函数对象
    const fn = this;
    // 利用空函数中转
    const fNOP = function () {

    };
    // 中转函数的原型对象指向调用的函数的原型对象
    fNOP.prototype = fn.prototype;
    // 函数表达式给返回值赋值
    const fBound = function () {
        // 获取传入的参数
        const curArg = Array.prototype.slice.call(arguments);
        // 调用函数 绑定新的this
        // 当作为构造函数时 this指向实例 可以让实例获得来自绑定函数的值
        // 当作为普通函数时 this指向window 将绑定函数的this指向context
        return fn.apply(this instanceof fBound ? this : context, argArr.concat(curArg));
    }
    // 返回函数的原型对象指向调用函数的实例
    fBound.prototype = new fNOP();
    return fBound;
};
const sex = 'female';
function Foo(name, age) {
    this.habit = 'shopping';
    console.log(this.sex);
    console.log(name);
    console.log(age);
    this.name = name;
    this.age = age;
};
Foo.prototype.getName = function () {
    console.log(this.name);
}
Foo.prototype.friend = 'huhu';
const sayHi = function () {
    console.log('hi, I am ', this.name);
};
const eat = function (food, drink) {
    console.log(`I eat ${food} & ${drink}`);
};
const foo = new Foo('xixi', 18);
const fooSayHi = sayHi._bind(foo);
fooSayHi();

const bar = {
    name: 'bar',
    sex: 'male'
};
const barSayHi = sayHi._bind(bar);
barSayHi();
const barEat = eat._bind(bar, 'cola');
barEat('hamburger');

const FooBar = Foo._bind(bar);
console.log(FooBar);
// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。
// 提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
const fooBar = new FooBar('fooBar', 30);
fooBar.getName();
console.log(fooBar.habit);
console.log(fooBar.friend);
