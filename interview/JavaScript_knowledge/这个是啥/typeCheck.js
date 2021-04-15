function typeCheck(obj) {
    const typeArr = ['String','Number','Boolean','Date','Array', 'Null', 'Undefined', 'Symbol']
    let result
    let tmpType = Object.prototype.toString.call(obj)
    typeArr.forEach(type => {
        if (tmpType.indexOf(type) > 0) {
            result = type
        }
    })
    return result || 'undefined type'
}

console.log(typeCheck('123'));
console.log(typeCheck(123));
console.log(typeCheck(true));
console.log(typeCheck(new Date()));
console.log(typeCheck([1,2,3]));
console.log(typeCheck(Symbol('lalala')));
console.log(typeCheck(undefined));
console.log(typeCheck(null));
