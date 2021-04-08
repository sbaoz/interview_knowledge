/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    candidates = candidates.filter(item => item < target).sort((a, b) => a - b)
    let result = [], lastNum = 0, startIdx = 0
    const func = (arr, tmpResult, tmpAcc) => {
        arr.forEach((num, index) => {
            if (num + tmpAcc < target) {
                tmpAcc += num
                tmpResult.push(num)
            } else if (num + tmpAcc === target) {
                tmpResult.push(num)
                result.push(JSON.parse(JSON.stringify(tmpResult)))
                startIdx += 1
                func(candidates.slice(startIdx, candidates.length), [], 0)
            } else if (num + tmpAcc > target) {
                if (index !== 0) {
                    lastNum = tmpResult.pop()
                } else {
                    lastNum = 0
                    index += 1
                }
                func(arr.slice(index, arr.length), tmpResult, tmpAcc - lastNum)
            }
        })
    }
    func(candidates, [], 0)
    return result
};

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))
