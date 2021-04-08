const fs = require('fs')
const Deferred = require('./Deferred')

// const readFile = function (file, encoding) {
//     const deferred = new Deferred()
//     fs.readFile(file, encoding, deferred.callback())
//     return deferred.promise
// }

// API Promise化
const promisify = function(method) {
    return function () {
        const deferred = new Deferred()
        const args = Array.prototype.slice.call(arguments, 0)
        args.push(deferred.callback())
        method.apply(null, args)
        return deferred.promise
    }
}

const readFilePromisify = promisify(fs.readFile)

readFilePromisify('../files/foo.txt', 'utf-8').then(file => {
    return readFilePromisify(`../files/${file.trim()}.txt`, 'utf-8')
}).then(file => {
    console.log(file)
})
