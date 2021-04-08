let set = new Set([1,2,3])
function cover2Map(set) {
    let arr = Array.from(set)
    let map = arr.reduce((map, curVal, index) => {
        return map.set(index, curVal)
    }, new Map())
    return map
}
let map = cover2Map(set)
console.log(map)
