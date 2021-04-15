const shallowClone = (target) => {
    if (target !== null && typeof target === 'object') {
        let cloneObj = Array.isArray(target) ? [] : {}
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneObj[prop] = target[prop]
            }
        }
        return  cloneObj
    }
    return target
}

let target = {xixi: '1'}
let cloneObj = shallowClone(target)
cloneObj['xixi'] = 100
console.log(target)
console.log(cloneObj)
