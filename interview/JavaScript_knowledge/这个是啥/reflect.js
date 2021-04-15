// https://zhuanlan.zhihu.com/p/24778807
// 用一个单一的全局对象去存储这些方法，能够保持其它的JavaScript代码的整洁、干净。不然的话，这些方法可能是全局的，或者要通过原型来调用。
// 将一些命令式的操作如delete，in等使用函数来替代，这样做的目的是为了让代码更加好维护，更容易向下兼容；也避免出现更多的保留字。
// Reflect.construct 第一个参数为属性构造函数 如果没有第三个参数实例获得prototype方法 否则实例的方法由第三个参数来 第二个参数为第一个构造函数的参数
function A(name) {
    console.log('Function A is invoked!');
    this.name = name || 'dreamapple';
}
A.prototype.getName = function() {
    console.log(this.name);
    return this.name;
};

function B(age) {
    console.log('Function B is invoked!');
    this.age = age || 22;
}
B.prototype.getAge = function() {
    console.log(this.age);
    return this.age;
};
// 使用函数A作为构造函数
let a = Reflect.construct(A, ['happy']);
// 使用函数B作为构造函数
let b = Reflect.construct(A, ['happy'], B);
console.log(a);
console.log(b);
a.getName();
b.getAge();
