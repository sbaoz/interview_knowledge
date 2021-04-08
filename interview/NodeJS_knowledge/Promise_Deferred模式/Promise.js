const events = require('events')
const util = require('util')

const Promise = function () {
    events.EventEmitter.call(this)
}
util.inherits(Promise, events.EventEmitter)

Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    if (typeof fulfilledHandler === 'function') {
        this.once('success', fulfilledHandler)
    }
    if (typeof errorHandler === 'function') {
        this.once('error', errorHandler)
    }
    if (typeof progressHandler === 'function') {
        this.on('progress', progressHandler)
    }
    return this
}

module.exports = Promise
