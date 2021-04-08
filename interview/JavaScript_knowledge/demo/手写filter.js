Array.prototype.myFilter = function (cb, thisArg) {
    if (this === null || typeof this === 'undefined') {
        throw new TypeError("Cannot read property 'filter' of null or undefined")
    }
    if (typeof cb !== 'function') {
        throw new TypeError(cb + ' is not a function')
    }
    let O = Object(this)
    let len = O.length >>> 0
    let resLen = 0
    let res = []
    for (let i = 0; i < len; i++) {
        if (i in O) {
            let element = O[i]
            if (cb.call(thisArg, element, i, O)) {
                res[resLen++] = element
            }
        }
    }
    return res
}

let result = [1,2,3].myFilter(function(item, index, arr) {
    console.log(item, index, arr, this)
    return item % 2 === 0
}, 1)

console.log(result)
