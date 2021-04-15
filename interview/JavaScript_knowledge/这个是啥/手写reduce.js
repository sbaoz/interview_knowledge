Array.prototype.myReduce = function (cb, initialVal) {
    if (this === null || typeof this === 'undefined') {
        throw new TypeError('throw new TypeError(`${cb} is not a function`)')
    }
    if (typeof cb != 'function') {
        throw new TypeError(`${cb} is not a function`)
    }
    let O = Object(this)
    let len = O.length >>> 0
    let i = 0
    let accumulator = initialVal

    if (typeof accumulator === 'undefined') {
        for (; i < len; i++) {
            if (i in O) {
                accumulator = O[i]
                i++
                break
            }
        }
    }

    if (i === len && typeof accumulator === 'undefined') {
        throw new Error('Each element of the array is empty')
    }

    for (; i < len; i++) {
        if (i in O) {
            let val = O[i]
            accumulator = cb.call(undefined, accumulator, val, O)
        }
    }
    return accumulator
}

let result = [1,2,3].myReduce(function (preSum, curVal, arr) {
    console.log(preSum, curVal, arr)
    return preSum + curVal
})
console.log(result)


