Array.prototype.myPop = function () {
    let O = Object(this)
    let len = this.length >>> 0
    if (len === 0) {
        return undefined
    }
    let val = O[--len]
    delete O[len]
    O.length = len
    return val
}
let arr = [1,2,3]
console.log(arr.myPop(), arr, arr.length)
