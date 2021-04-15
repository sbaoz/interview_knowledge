// 基础的插入排序
let arr = [2, 4, 1, 5, 3]
const insertSort = function (arr, start = 0, end) {
    end = end ? end : arr.length

    for (let j = start; j < end; j++) {
        let i
        let temp = arr[j]
        for (i = j; i > start && temp < arr[i - 1]; i--) {
            arr[i] = arr[i - 1]
        }
        arr[i] = temp
    }

    return arr
}

console.log(insertSort(arr));
