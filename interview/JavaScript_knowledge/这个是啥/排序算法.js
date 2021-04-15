// https://www.jianshu.com/p/1b4068ccd505
let arr = createUnsortedArray(50)

function createUnsortedArray(size) {
    const array = [];

    for (let i = size; i > 0; i--) {
        const num = (i / 10 > 1) ? i : 10;
        array.push(Math.round(Math.random(i) * num + Math.round(Math.random(i)) * Math.random(i) * num * 10));
    }

    return array;
}

// 冒泡
function bubbleSort(arr) {
    let _arr = [].concat(arr)
    let len = _arr.length
    console.time('bubbleSort')
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            if (_arr[i] > _arr[j]) {
                let tmp = _arr[i]
                _arr[i] = _arr[j]
                _arr[j] = tmp
            }
        }
    }
    console.timeEnd('bubbleSort')
    // console.log(_arr);
}

bubbleSort(arr)
console.log('-------------------------');

// 选择
function selectionSort(arr) {
    let _arr = [].concat(arr)
    let len = _arr.length
    console.time('selectionSort')
    for (let i = 0; i < len - 1; i++) {
        let minIdx = i
        for (let j = i + 1; j < len; j++) {
            if (_arr[minIdx] > _arr[j]) {
                minIdx = j
            }
        }
        if (minIdx !== i) {
            let tmp = _arr[i]
            _arr[i] = _arr[minIdx]
            _arr[minIdx] = tmp
        }
    }
    console.timeEnd('selectionSort')
    // console.log(_arr);
}

selectionSort(arr)
console.log('-------------------------');

// 插入
function insertionSort(arr) {
    let _arr = [].concat(arr)
    let len = _arr.length
    console.time('insertionSort')
    for (let i = 0; i < len; i++) {
        let curVal = _arr[i]
        let j = i
        while (j > 0 && _arr[j - 1] > curVal) {
            _arr[j] = _arr[j - 1]
            j--
        }
        _arr[j] = curVal
    }
    console.timeEnd('insertionSort')
    // console.log(_arr);
}

insertionSort(arr)
console.log('-------------------------');

// 归并
function mergeSort(arr) {
    let _arr = [].concat(arr)

    function merge(left, right) {
        const result = []
        while (left.length && right.length) {
            if (left[0] <= right[0]) {
                result.push(left.shift())
            } else {
                result.push(right.shift())
            }
        }
        while (left.length) {
            result.push(left.shift())
        }
        while (right.length) {
            result.push(right.shift())
        }
        return result
    }

    function slice(arr) {
        const len = arr.length
        if (len <= 1) {
            return arr
        }
        const pivot = Math.floor(len / 2)
        const left = arr.slice(0, pivot)
        const right = arr.slice(pivot, len)
        return merge(slice(left), slice(right))
    }

    console.time('mergeSort')
    _arr = slice(_arr)
    console.timeEnd('mergeSort')
    // console.log(_arr);
}

mergeSort(arr)
console.log('-------------------------');

// 快速
arr = [2, 4, 1, 3, 5]

function quickSort(arr) {
    let _arr = arr

    function quick(arr, left, right) {
        if (left < right) {
            let partitionIndex = partition(arr, left, right);
            quick(arr, left, partitionIndex - 1);
            quick(arr, partitionIndex + 1, right);
        }
        return arr;
    }

    function partition(arr, left, right) {     //分区操作
        let pivot = left,                      //设定基准值（pivot）
            index = pivot + 1;
        for (let i = index; i <= right; i++) {
            if (arr[i] < arr[pivot]) {
                swap(arr, i, index);
                index++;
            }
        }
        swap(arr, pivot, index - 1);
        return index - 1;
    }

    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    console.time('quickSort')
    _arr = quick(_arr, 0, _arr.length - 1)
    console.timeEnd('quickSort')
    console.log(_arr);
}

quickSort(arr)
