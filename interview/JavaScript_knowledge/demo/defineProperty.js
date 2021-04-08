// 属性描述符 数据描述符和存取描述符不能同时设置
// 据描述符和存取描述均具有以下描述符
// configrable 描述属性是否配置，以及可否删除 可以由true改为false 不能由false改为true
// enumerable 描述属性是否会出现在for in 或者 Object.keys()的遍历中
let person = {}
// 数据描述符 value writable
// Object.defineProperty(person, 'name', {
//     value: 'xixixi',
//     writable: true, // 默认为false
//     enumerable: true, // 默认为false
//     configurable: true // 默认为false
// })
// person.name = 'hahaha'
// console.log(person.name);
// console.log(Object.keys(person));
// delete person.name
// console.log(person);
// writable: false时 person.name 不能改变
// enumerable: false时 person.name 不能枚举
// configurable: false时 person.name 不能被删除

// 存取描述符 set get
// let value = ''
// Object.defineProperty(person, 'name', {
//     set: function (val) {
//         value = val
//         console.log('set')
//     },
//     get: function () {
//         return value
//     },
//     enumerable: true,
//     configurable: true
// })
// person.name = 'xixi'
// console.log(person.name);

// defineProperty无法检测数组索引赋值,改变数组长度的变化; 但是通过数组方法来操作可以检测到
// let obj = {}, value = 1
// Object.defineProperty(obj, 'xixixi', {
//     set: function (val) {
//         value = val
//         console.log('set')
//     },
//     get: function () {
//         return value
//     }
// })
// console.log(obj.xixixi);
// obj.xixixi = [] // set
// obj.xixixi = [1,2,3] // set
// obj.xixixi[0] = 10
// obj.xixixi.push(4)
// obj.xixixi.length = 5
// console.log(obj.xixixi);

// 对象常量 不可配置 不可修改
// Object.defineProperty(person, 'name', {
//     value: 'xixixi',
//     writable: false, // 默认为false
//     enumerable: true, // 默认为false
//     configurable: false // 默认为false
// })
// Object.preventExtensions(person) // 禁止扩展
// person.age = 111
// console.log(person.age);
// person.name = 'hahaha'
// delete person.name
// console.log(person);

// Object.seal()创建一个密封对象 在对象上调用Object.preventExtensions() 把configurable设为false
// let sealObj = { name: 'seal'}
// Object.seal(sealObj)
// sealObj.name = 'hahaha'
// console.log(sealObj.name); // 可以修改属性值
// console.log(Object.keys(sealObj));
// sealObj.age = 11
// delete sealObj.name
// console.log(sealObj);

// Object.freeze()创建一个冻结对象 在对象上调用Object.seal() 把writable设为false
// let freezeObj = {name: 'xixixi'}
// Object.freeze(freezeObj)
// freezeObj.name = 'hahaha'
// console.log(freezeObj.name);
// console.log(Object.keys(freezeObj));
// freezeObj.age = 11
// delete freezeObj.name
// console.log(freezeObj);

// 多级嵌套对象监听
let obj = {}

function observe(obj) {
    if (obj !== null && typeof obj === 'object') {
        for (let key in obj) {
            defineProperty(obj, key, obj[key])
        }
    }
}

function defineProperty(obj, key, value) {
    observe(value)
    Object.defineProperty(obj, key, {
        get: function () {
            return value
        },
        set: function (val) {
            value = val
            console.log('set')
        }
    })
}

defineProperty(obj, 'friends', {name: 'xixi'})
obj.friends.name = 'haha'
console.log(obj.friends.name);
// 不能监听数组索引赋值和改变长度的变化
// 必须深层遍历嵌套的对象,因为defineProterty只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历,显然能劫持一个完整的对象是更好的选择
