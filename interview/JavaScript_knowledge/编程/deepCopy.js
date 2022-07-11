const map = new Map()
map.set('a', 1)
map.set('b', 2)
map.set('c', 3)
const set = new Set()
set.add('1')
set.add('2')
set.add('3')
const obj1 = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Symbol(1),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('func1');
    },
    func2: function (a, b) {
        return a + b;
    }
};
obj1.target = obj1
console.time()
const obj2 = clone(obj1)
console.log(obj2)
console.timeEnd()

// JSON.parse() 无法解决循环引用 无法拷贝特殊对象(RegExp,Date,Set,Map等) 无法拷贝函数

const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Object]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function forEach(array, callback) {
    let len = array.length
    let idx = 0
    while (idx < len) {
        callback(array[idx], idx)
        idx++
    }
}

function isObject(target) {
    const type = typeof target
    return target !== null && (type === 'object' || type === 'function')
}

function getType(target) {
    return Object.prototype.toString.call(target)
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}



// 深拷贝的话因为不知道对象的层级深度 所以要用递归
function clone(target, map = new WeakMap()) {
    if (isObject(target)) {
        const isArray = Array.isArray(target)
        // 考虑数组的情况
        const cloneTarget = isArray ? [] : {}
        // 解决循环引用
        if (map.get(target)) {
            return target
        }
        map.set(target, true)
        const keys = isArray ? undefined : Object.keys(target)
        forEach(keys || target, (val, key) => {
            if (keys) {
                key = val
            }
            cloneTarget[key] = clone(target[key], map)
        })
        return cloneTarget
    } else {
        return target
    }
}

