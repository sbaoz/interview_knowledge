const fs = require('fs')


fs.readFile('README.md', (result) => {
    console.log('i/o callback');
    setTimeout(function () {
        console.log('i/o timeout')
    })

    setImmediate(function () {
        console.log('i/o immediate')
    })
})

new Promise(resolve => {
    resolve('promise')
}).then(result => {
    console.log('promise callback');

    setTimeout(function () {
        console.log('promise timeout')
    })

    setImmediate(function () {
        console.log('promise immediate')
    })
})

console.log('start')

setTimeout(function () {
    console.log('timeout')
})

setImmediate(function () {
    console.log('immediate')
})

console.log('end')
