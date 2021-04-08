const Promise = require('./Promise')

const Deferred = function () {
    this.state = 'unfulfilled';
    this.promise = new Promise();
}

Deferred.prototype.resolve = function (obj) {
    this.state = 'fulfilled';
    this.promise.emit('success', obj)
}

Deferred.prototype.reject = function (err) {
    this.state = 'failed';
    this.promise.emit('error', err)
}

Deferred.prototype.progress = function (data) {
    this.promise.emit('progress', data)
}

// 多异步协作
Deferred.prototype.all = function(promises) {
    let count = promises.length
    const that = this
    const results = []
    promises.forEach(function (promise, i) {
        promise.then(function (data) {
            count -= 1
            results[i] = data
            if (count === 0) {
                that.resolve(results)
            }
        }, function (err) {
            that.reject(err)
        })
    })
    return this.promise
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
