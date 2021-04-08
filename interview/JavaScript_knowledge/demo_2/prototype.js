function SuperType() {

}
SuperType.prototype.name = 'xixi'
var superInstance = new SuperType()
superInstance.name = 'haha'
// prototype是函数才有的属性
// ES5的方法 Object.getPrototypeOf 获取原型对象
console.log(Object.getPrototypeOf(SuperType.prototype) === Object.prototype); // true
console.log(SuperType.prototype.__proto__ === Object.prototype); // true
// 原型对象的constructor属性指向构造函数SuperType
console.log(SuperType.prototype.constructor === SuperType) // true
// 函数的prototype指向一个对象 这个对象正是调用该构造函数创建的实例的原型
console.log(Object.getPrototypeOf(superInstance) === SuperType.prototype) // true
console.log(superInstance.name) // haha
delete superInstance.name
// 实例属性中不存在name 就会从原型属性中寻找 如果原型中没有 就会去找原型的原型
console.log(superInstance.name) // xixi
// Object的原型是null 原型链的终点 instanceof的实现原理就是遍历原型链寻找对应的原型
console.log(Object.getPrototypeOf(Object.prototype) === null); // true
console.log(superInstance instanceof SuperType) // true
