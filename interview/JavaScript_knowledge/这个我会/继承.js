// 原型链继承
console.log("-----------原型链继承-------------");
function Parent1() {
  this.friends = ["xixi", "haha"];
}
Parent1.prototype.sayHi = function () {
  console.log(`hello ${this.friends.join(",")}`);
};
function Child1() {}
Child1.prototype = new Parent1();
// 创建实例是无法向父类传参
const child1Instance1 = new Child1();
// 实例共享父类中的引用类型属性
child1Instance1.friends.push("lala");
child1Instance1.sayHi(); // hello xixi,haha,lala
const child1Instance2 = new Child1();
child1Instance2.sayHi(); // hello xixi,haha,lala
// 借用构造函数
console.log("-----------借用构造函数-------------");
function Parent2(name) {
  this.name = name;
  this.friends = ["xixi", "haha"];
}
Parent2.prototype.age = 10;
Parent2.prototype.sayHi = function () {
  console.log(`hello ${this.friends.join(",")}`);
};
function Child2(name) {
  // 借用父类的构造函数
  Parent2.call(this, name);
  // 无法继承父类原型上的方法 在构造函数中定义的话 每次创建实例都会创建一遍方法
  // 优先实例中的方法
  this.sayHi = function () {
    console.log(`hello1 ${this.friends.join(",")}`);
  };
}
Child2.prototype.sayHi = function () {
  console.log(`hello2 ${this.friends.join(",")}`);
};
// 可以向父类构造函数传参
const child2Instance1 = new Child2("lala1");
console.log(child2Instance1.name);
// 每个实例有独立的引用类型属性
child2Instance1.friends.push("huhu");
console.log(child2Instance1.age); // 无法继承父类原型上的属性
child2Instance1.sayHi();
const child2Instance2 = new Child2("lala2");
child2Instance2.sayHi();
// 组合继承
// 融合了原型链继承和借用构造函数的优点
// 但是会调用2次父类的构造函数 在子类的原型对象上创建了不必要的属性
console.log("-----------组合继承-------------");
function Parent3(name) {
  this.name1 = name;
  this.name2 = name;
  this.name3 = name;
  this.name = name;
  this.friends = ["xixi", "haha"];
}
Parent3.prototype.age = 10;
Parent3.prototype.sayHi = function () {
  console.log(`hello ${this.friends.join(",")}`);
};
function Child3(name, sex) {
  // 借用父类的构造函数（第二次）
  Parent3.call(this, name);
  this.sex = sex;
}
// 原型对象指向父类的实例（第一次）
Child3.prototype = new Parent3();
// 修改子类的构造函数
Child3.prototype.constructor = Child3;
const child3Instance1 = new Child3("huhu", "male");
child3Instance1.sayHi();
console.log(child3Instance1.name); // 这个name是实例对象上属性
console.log(child3Instance1.sex);
console.log(child3Instance1.age); // 这个age是原型对象上的属性
console.log(Child3.prototype); // 原型对象上创建了不必要的属性
// 原型式继承
console.log("-----------原型式继承-------------");
// ES5 Object.create的实现 将传入的对象作为创建的对象的原型
function createObj1(object) {
  const F = function () {};
  F.prototype = object;
  return new F();
}
const child1 = createObj1(parent);
console.log(child1.name);
// 和原型链继承一样 实例共享引用类型的属性
child1.friends.push("huhu");
const child2 = Object.create(parent);
console.log(child2.friends);
// 寄生式继承
console.log("-----------寄生式继承-------------");
// 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象
const parent = {
  name: "xixi",
  friends: ["haha", "lala"],
};
function createObj2(object) {
  var clone = Object.create(object);
  // 跟借用构造函数模式一样，每次创建对象都会创建一遍方法
  clone.sayName = function () {
    console.log("hi", Object.getPrototypeOf(this));
  };
  return clone;
}
const child3 = createObj2(parent);
child3.sayName();
// 寄生组合式继承
console.log("-----------寄生组合式继承-------------");
function Parent4(name) {
  this.name1 = name;
  this.name2 = name;
  this.name3 = name;
  this.name = name;
  this.friends = ["xixi", "haha"];
}
Parent4.prototype.age = 10;
Parent4.prototype.sayHi = function () {
  console.log(`hello ${this.friends.join(",")}`);
};
function Child4(name, sex) {
  // 仅调用一下父类的构造函数
  Parent4.call(this, name);
  this.sex = sex;
}
// 使父类的原型对象和子类的原型对象建立联系 和组合继承相比 不会把父类的实例属性加到子类的原型对象中
Child4.prototype = Object.create(Parent4.prototype);
Child4.prototype.constructor = Child4;
const child4Instance1 = new Child4("huhu", "male");
child4Instance1.sayHi();
console.log(child4Instance1.name); // 这个name是实例对象上属性
console.log(child4Instance1.sex);
console.log(child4Instance1.age);
console.log(Child4.prototype);
