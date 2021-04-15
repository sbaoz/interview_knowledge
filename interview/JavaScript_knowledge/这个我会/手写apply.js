let person = {
    name: 'xixi'
}

function sayHi(age, sex) {
    console.log(this.name, age, sex)
}

Function.prototype.newApply = function (context, parameter) {
    context = context || window
    let fn = Symbol()
    context[fn] = this
    const res = context[fn](...parameter)
    delete context[fn]
    return res
}

sayHi.apply(person, [16, 'female'])
sayHi.newApply(person, [16, 'female'])
