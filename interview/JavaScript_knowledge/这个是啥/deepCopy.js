const obj1 = {
    name: 'lalala',
    age: 11,
    married: true,
    children: [
        {
            name: 'xixixi',
            age: 1,
            isSchool: false,
            sayHi: function () {
                console.dir('hi xixixi')
            }
        }
    ],
    doWork: function () {
        console.dir('heixiu')
    }
}
obj1.target = obj1
const obj2 = deepCopy(obj1)
console.log(obj2)

// WeakMap 构成弱引用 Map 构成强引用 弱引用的对象可以在任何时候被回收 强引用在程序结束前 所占内存空间一直不会释放
function deepCopy(source, map = new WeakMap()) {
    // 解决循环引用
    if (map.get(source)) {
        return source
    }
    const targetObj = typeCheck(source) === 'Object' ? {} : []
    map.set(source, true)
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (source[key] && typeof source[key] === 'object') {
                targetObj[key] = deepCopy(source[key], map)
            } else {
                targetObj[key] = source[key]
            }
        }
    }
    return targetObj
}

function typeCheck(obj) {
    const typeArr = ['Object', 'String', 'Number', 'Boolean', 'Date', 'Array', 'Null', 'Undefined', 'Symbol']
    let result
    let tmpType = Object.prototype.toString.call(obj)
    typeArr.forEach(type => {
        if (tmpType.indexOf(type) > 0) {
            result = type
        }
    })
    return result || 'undefined type'
}

// JSON.parse() 无法解决循环引用 无法拷贝特殊对象(RegExp,Date,Set,Map等) 无法拷贝函数
//
