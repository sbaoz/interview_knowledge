const fs = require('fs')
const Deferred = require('./Deferred')

const readFile = function (file, encoding) {
    const deferred = new Deferred()
    fs.readFile(file, encoding, deferred.callback())
    return deferred.promise
}

const promise1 = readFile('./files/foo.txt', 'utf-8')
const promise2 = readFile('./files/bar.txt', 'utf-8')

const deferred = new Deferred()
deferred.all([promise1, promise2]).then(results => {
    console.log(results)
}, err => {
    console.log(err)
})
