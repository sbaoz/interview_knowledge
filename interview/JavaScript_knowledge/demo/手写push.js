Array.prototype.myPush = function (...items) {
    let O = Object(this)
    let len = this.length >>> 0
    let argCnt = items.length >>> 0
    let newLength = len + argCnt
    if (newLength > 2 ** 53 -1) {
        throw new TypeError("The number of array is over the max value restricted!")
    }
    for (let i = 0; i < argCnt; i++) {
        O[len + i] = items[i]
    }
    return newLength
}


let arr = []
console.log(arr.myPush(1, 2, 3))
console.log(arr, arr.length)
