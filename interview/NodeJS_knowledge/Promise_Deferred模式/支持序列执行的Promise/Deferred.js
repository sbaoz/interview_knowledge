const Promise = require('./Promise')

const Deferred = function () {
    this.promise = new Promise();
}

Deferred.prototype.resolve = function (obj) {
    const promise = this.promise
    let handle
    while ((handle = promise.queue.shift())) {
        if (handle && handle.fulfilled) {
            const ret = handle.fulfilled(obj)
            if (ret && ret.isPromise) {
                ret.queue = promise.queue
                this.promise = ret
                return
            }
        }
    }
}

Deferred.prototype.reject = function (err) {
    const promise = this.promise
    let handle
    while ((handle = promise.queue.shift())) {
        if (handle && handle.error) {
            const ret = handle.error(err)
            if (ret && ret.isPromise) {
                ret.queue = ret.queue
                this.promise = ret
                return
            }
        }
    }
}

Deferred.prototype.callback = function(){
    const that = this
    return function (err, result) {
        if (err) {
            return that.reject(err)
        }
        that.resolve(result)
    }
}

module.exports = Deferred
