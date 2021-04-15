let person = {
    name: 'xixi'
}

function sayHi(age, sex) {
    console.log(this.name, age, sex)
}

Function.prototype.newCall = function (context, ...parameter) {
    context = context || window
    let fn = Symbol()
    context[fn] = this
    const res = context[fn](...parameter)
    delete context[fn]
    return res
}

sayHi.call(person, 16, 'female')
sayHi.newCall(person, 16, 'female')
