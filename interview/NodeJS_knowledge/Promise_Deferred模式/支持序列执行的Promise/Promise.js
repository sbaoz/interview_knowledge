const Promise = function () {
    // 队列用于储存待执行的回调函数
    this.queue = []
    this.isPromise = true
}

Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    const handle = {}
    if (typeof fulfilledHandler === 'function') {
        handle.fulfilled = fulfilledHandler
    }
    if (typeof errorHandler === 'function') {
        handle.error = errorHandler
    }
    if (typeof progressHandler === 'function') {
        handle.progress = progressHandler
    }
    this.queue.push(handle)
    return this
}

module.exports = Promise
