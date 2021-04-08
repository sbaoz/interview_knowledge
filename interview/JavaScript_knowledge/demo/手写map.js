Array.prototype.myMap = function (cb, thisArg) {
    if (this === null || typeof this === 'undefined') {
        throw new TypeError('throw new TypeError(`${cb} is not a function`)')
    }
    if (typeof cb != 'function') {
        throw new TypeError(`${cb} is not a function`)
    }
    let O = Object(this)
    let T = thisArg
    let len = O.length >>> 0
    let A = new Array(len)
    for (let i = 0; i < len; i++) {
        if (i in O) {
            let val = O[i]
            let mappedVal = cb.call(T, val, i, O)
            A[i] = mappedVal
        }
    }
    return A
}
let arr = [1, 2, 3].myMap(function (item, index, arr) {
    console.log(item, index, arr, this)
    return item * 2 + this
}, 1)
console.log(arr)

