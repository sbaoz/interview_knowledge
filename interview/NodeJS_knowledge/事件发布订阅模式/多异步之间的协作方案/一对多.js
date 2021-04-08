const events = require('events')

const emitter = new events.EventEmitter()

// 一对多
const done = function(key, result) {
    console.log(`${key} ${JSON.stringify(result)} done`)
}

const other = function(key, result) {
    console.log(`${key} ${JSON.stringify(result)} other done`)
}

emitter.on('done', done)
emitter.on('done', other)

emitter.emit('done', 'template', { xixi: 'xixixi' })
