Function.prototype.newBind = function (context, ...innerArgs) {
    let that = this
    return function (...finnalyArgs) {
        return that.call(context, ...innerArgs, ...finnalyArgs)
    }
}

let person = {
    name: 'xixi'
}

function sayHi(age, sex) {
    console.log(this.name, age, sex)
}

let personSayHi = sayHi.newBind(person, 25)
personSayHi('felmale')
