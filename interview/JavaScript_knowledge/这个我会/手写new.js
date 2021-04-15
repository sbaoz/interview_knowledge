function New() {
    const Constructor = [].shift.call(arguments)
    // const obj = Object.create(null)
    // Object.setPrototypeOf(obj, Constructor.prototype)
    const obj = {};
    // 获得原型对象上的属性
    obj.__proto__ = Constructor.prototype;
    // 获得实例的属性
    const result = Constructor.apply(obj, arguments)
    return typeof result === 'object' ? result || obj : obj
}
function Foo(a, b) {
    this.a = a
    this.b = b
}
Foo.prototype.getA = function () {
    return this.a
}
Foo.prototype.c = 'lalala'

const foo = New(Foo, 1, 2)
console.log(Object.getPrototypeOf(foo));
console.log(foo.getA());

