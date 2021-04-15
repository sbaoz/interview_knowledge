let arr = [1, 2, [3, [4, [5]]], [6], 7]
// flat
console.log(arr.flat(Infinity))

// replace+split
let str1 = JSON.stringify(arr)
console.log(str1.replace(/(\[|\])/g, '').split(','))

//replace+JSON.parse
let str2 = JSON.stringify(arr)
console.log(JSON.parse('[' + str2.replace(/(\[|\])/g, '') + ']'))

// 递归
let result1 = []

function flatten1(arr) {
    if (Array.isArray(arr)) {
        arr.forEach(item => {
            flatten1(item)
        })
    } else {
        result1.push(arr)
    }
}

flatten1(arr)
console.log(result1)

// 利用reduce迭代
function flatten2(arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten2(cur) : cur)
    }, [])
}
let result2 = flatten2(arr)
console.log(result2)

// 扩展运算符
let result3 = [1, 2, [3, [4, [5]]], [6], 7]
while (result3.some(item => Array.isArray(item))) {
    console.log(...result3)
    result3 = [].concat(...result3)
}
console.log(result3)
