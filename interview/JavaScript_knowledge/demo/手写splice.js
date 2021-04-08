Array.prototype.mySplice = function (startIndex, delCnt, ...addItems) {
    let arr = Object(this)
    let len = arr.length >>> 0
    let addLen = addItems ? addItems.length >>> 0 : 0
    let delArr

    function computeStartIndex(startIndex, len) {
        if (typeof startIndex === 'undefined') {
            startIndex = 0
        } else {
            if (startIndex < 0) {
                startIndex = len + startIndex
            } else if (startIndex >= len) {
                startIndex = len
            }
        }
        return startIndex
    }

    function computeDelCnt(startIndex, delCnt, len) {
        if (typeof delCnt === 'undefined') {
            delCnt = len - startIndex
        } else if (delCnt < 0) {
            delCnt = 0
        } else if (delCnt > len - startIndex) {
            delCnt = len - startIndex
        }
        return delCnt
    }

    function setDelArr(delArr, startIndex, delCnt) {
        for (let i = 0; i < delCnt; i++) {
            let index = startIndex + i
            if (index in arr) {
                let delItem = arr[index]
                delArr[i] = delItem
            }
        }
    }

    function moveElements(arr, startIndex, len, delCnt, addLen) {
        if (delCnt === addLen) {
            return
        } else if (delCnt > addLen) {
            for (let i = startIndex + delCnt; i < len; i++) {
                let fromIndex = i
                let toIndex = i - delCnt + addLen
                if (fromIndex in arr) {
                    arr[toIndex] = arr[fromIndex]
                } else {
                    delete arr[toIndex]
                }
            }
            for (let i = len - 1; i >= len - delCnt + addLen; i--) {
                delete arr[i]
            }

        } else if (delCnt < addLen) {
            for (let i = len - 1; i >= startIndex + delCnt; i--) {
                let fromIndex = i
                let toIndex = i + addLen - delCnt
                if (fromIndex in arr) {
                    arr[toIndex] = arr[fromIndex]
                } else {
                    delete arr[toIndex]
                }
            }
        }
    }

    startIndex = computeStartIndex(startIndex, len)
    delCnt = computeDelCnt(startIndex, delCnt, len)

    if (Object.isFrozen(arr) && (delCnt > 0 || addLen > 0)) {
        throw new TypeError('the object is a frozen object!')
    }
    if (Object.isSealed(arr) && delCnt !== addLen) {
        throw new TypeError('the object is a sealed object')
    }
    delArr = new Array(delCnt)

    setDelArr(delArr, startIndex, delCnt)
    moveElements(arr, startIndex, len, delCnt, addLen)

    for (let i = 0; i < addLen; i++) {
        arr[i + startIndex] = addItems[i]
    }

    arr.length = len - delCnt + addLen

    return delArr
}

let arr = [1, 2, 3]
console.log(arr.mySplice(-1, 2, 4, 5))
console.log(arr)
