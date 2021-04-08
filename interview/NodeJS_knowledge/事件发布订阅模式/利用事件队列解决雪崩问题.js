const events = require('events')
const emitter = new events.EventEmitter()
emitter.setMaxListeners(0)
let status = 'ready'
const selectEventEmitter = function () {
    emitter.once('seleced', function (result) {
        console.log(`seleced: ${result} !`);
    })
    if (status === 'ready') {
        status = 'pending'
        setTimeout(function () {
            emitter.emit('seleced', 'SQL result')
            status = 'ready'
        }, 2000)
    }
}

for (let i = 0; i < 10; i++) {
    selectEventEmitter()
}


