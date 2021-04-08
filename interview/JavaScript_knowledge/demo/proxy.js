// let obj = {}
// let proxyObj = new Proxy(obj, {
//     get: function (target, prop) {
//         console.log('get')
//         return target[prop]
//     },
//     set: function (target, prop, value) {
//         console.log('set')
//         target[prop] = value
//     },
//     // 拦截key in object操作
//     has: function (target, key) {
//         console.log('has')
//         if (key === 'xixi') {
//             return target[key]
//         }
//         return false
//     },
//     // 拦截对目标对象属性的删除
//     deleteProperty: function (target, key) {
//         console.log('delete')
//         if (key === 'xixi') {
//             delete target[key]
//             return true
//         }
//         return false
//     },
//     // 拦截Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames
//     ownKeys: function (target) {
//         console.log('ownKeys')
//         return Object.keys(target).filter(key => key === 'xixi')
//     }
// })
// // 要想Proxy起作用，必须针对Proxy实例进行操作，而不是目标对象(obj)
// proxyObj.xixi = 'xixixi'
// proxyObj.haha = 'hahaha'
// console.log(proxyObj.xixi)
// console.log('xixi' in proxyObj)
// console.log(delete proxyObj.haha)
// console.log(proxyObj)
// console.log(Object.getOwnPropertyNames(proxyObj))

// 数组读取负数索引
// function createArrProxy(...elements) {
//     let handler = {
//         get: function (target, prop, receiver) {
//             let index = Number(prop)
//             if (index < 0) {
//                 prop = String(target.length + index)
//             }
//             return Reflect.get(target, prop, receiver)
//         }
//     }
//     let arr = [].concat(elements)
//     return new Proxy(arr, handler)
// }
// let arrProxy = createArrProxy(1,2,3)
// console.log(arrProxy[2]);
// console.log(arrProxy[-1]);

// 数据验证
// let validator = {
//     set: function (target, prop, value) {
//         if (prop === 'age') {
//             if (typeof value !== 'number') {
//                 throw new TypeError('The age is not an integer')
//             }
//             if (value > 100) {
//                 throw new RangeError('The age seems invalid')
//             }
//         }
//     }
// }
//
// let person = new Proxy({}, validator)
// person.age = 100
// // person.age = '100'
// // person.age = 200

// 函数调用拦截
// let twice = {
//     apply: function (target, thisArg, args) {
//         return Reflect.apply(target, thisArg, args) * 2
//     }
// }
// function sum(p1, p2) {
//     return p1+p2
// }
//
// let sumProxy = new Proxy(sum, twice)
// console.log(sumProxy(1, 2));
// console.log(sumProxy.apply(null, [1, 2]));
// console.log(sumProxy.call(null, 1, 2));

// 构造函数拦截
// let Person = new Proxy(function () {}, {
//     construct(target, argArray, newTarget) {
//         console.log('called:' + argArray.join(','))
//         return {
//             name: argArray[0]
//         }
//     }
// })
// let p = new Person('xixi')
// console.log(p);

// 与传统校验方式相比，这种方式把校验规则单独抽离出来，减少与业务逻辑的耦合

// 通用代理生成函数
// function validator(target, validator) {
//     return new Proxy(target, {
//         _validator: validator,
//         set(target, key, value, proxy) {
//             if (target.hasOwnProperty(key)) {
//                 let va = this._validator[key];
//                 if (!!va(value)) {
//                     return Reflect.set(target, key, value, proxy);
//                 } else {
//                     throw Error(`不能设置${key}到${value}`);
//                 }
//             } else {
//                 throw Error(`${key}不存在`);
//             }
//         }
//     })
// }
//
// // 校验规则
// const personValidators = {
//     name(val) {
//         return typeof val === 'string';
//     },
//     age(val) {
//         return typeof val === 'number' && val > 18;
//     }
// }
//
// // 类Person实例化之后，得到的是一个对Person实例对象的代理
// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//         return validator(this, personValidators); // this指向的是类的实例
//     }
// }
//
// const person = new Person('lilei', 30);
//
// console.log(person);    // Proxy {name: "lilei", age: 30}
//
// person.name = 48;       // Uncaught Error: 不能设置name到48

// 深层监听对象
let object = {
    name: {
        first: {
            four: 5,
            second: {
                third: 'ssss'
            }
        }
    },
    class: 5,
    arr: [1, 2, {arr1: 10}],
    age: {
        age1: 10
    }
}
let objectArr = [{name: {first: 'ss'}, arr1: [1, 2]}, 2, 3, 4, 5, 6]
let handler = {
    get(target, property) {
        console.log('get:' + property)
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        console.log('set:' + property + '=' + value);
        return Reflect.set(target, property, value);
    }
}

function toDeepProxy(obj, handler) {
    if (!isPureObject(obj)) {
        addSubProxy(obj, handler)
    }
    return new Proxy(obj, handler)
}

function addSubProxy(obj, handler) {
    for (let prop in obj) {
        if (typeof obj[prop] === 'object') {
            obj[prop] = toDeepProxy(obj[prop], handler)
        }
    }
}

function isPureObject(obj) {
    if (obj !== null && typeof obj === 'object') {
        for (let prop in obj) {
            if (typeof obj[prop] === 'object') {
                return false
            }
        }
    }
    return true
}

let objectProxy = toDeepProxy(object, handler)
let objectArrProxy = toDeepProxy(objectArr, handler)

console.time('pro')
objectArrProxy.length
objectArrProxy[3];
objectArrProxy[2] = 10
objectArrProxy[0].name.first = 'ss'
objectArrProxy[0].arr1[0]
objectProxy.name.first.second.third = 'yyyyy'
objectProxy.class = 6;
objectProxy.name.first.four
objectProxy.arr[2].arr1
objectProxy.age.age1 = 20;
console.timeEnd('pro')

// defineProterty和proxy的对比
// 1.defineProterty是es5的标准,proxy是es6的标准;
// 2.proxy可以监听到数组索引赋值,改变数组长度的变化;
// 3.proxy是监听对象,不用深层遍历,defineProterty是监听属性;
// 3.利用defineProterty实现双向数据绑定(vue2.x采用的核心)
// 4.利用proxy实现双向数据绑定(vue3.x会采用)
