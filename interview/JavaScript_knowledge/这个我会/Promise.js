let promiseCnt = 1
/*
* 可进行链式调用，且每次then返回了新的Promise
* Promise是有状态且状态只可以由pending->fulfilled或pending->rejected 是不可逆的
* then中返回了新的Promise 但是then中注册的回调仍然是属于上一个Promise的
* 最关键的点就是要理解 then 函数是负责注册回调的，真正的执行是在 Promise 的状态被改变之后。而当 resolve 的入参是一个 Promise 时，要想链式调用起来，就必须调用其 then 方法(then.call),将上一个 Promise 的 resolve 方法注入其回调数组中。
* */
function MyPromise(fn) {
    let state = 'pending' // 初始化Promise状态
    let value = null;
    let name = `MyPromise-${promiseCnt++}`
    const callbacks = []
    console.log(`[${name}]: constructor fn=${fn}`)

    this.then = function (onFulfilled, onRejected) {
        console.log(`[${name}]: then`)
        return new MyPromise((resolve, reject) => {
            // 桥梁 将新Promise的resolve方法 放到前一个Promise的回调对象中
            handle({
                onFulfilled,
                onRejected,
                resolve,
                reject
            })
        })
    }

    this.catch = function (onError) {
        return this.then(null, onError)
    }

    this.finally = function (onDone) {
        return this.then(onDone, onDone)
    }

    function handle(callback) {
        console.log(`[${name}]: handle state=${state}`)
        if (state === 'pending') {
            callbacks.push(callback)
            console.log('[%s]: handle', name, 'callbacks=', callbacks);
            return
        }

        // if (state === 'fulfilled') {
        //     if (!callback.onFulfilled) {
        //         callback.resolve(value)
        //         return
        //     }
        //     const ret = callback.onFulfilled(value) // 处理回调
        //     callback.resolve(ret) // 处理下一个Promise的resolve
        // }

        const cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
        const next = state === 'fulfilled' ? callback.resolve : callback.reject;
        console.log(`[${name}]: handle cb=${cb} next=${next}`)

        if (!cb) {
            next(value)
            return;
        }

        // 异常通常是指在执行成功/失败回调时代码出错产生的错误，对于这类异常，我们使用 try-catch 来捕获错误，并将 Promise 设为 rejected 状态即可
        try {
            const ret = cb(value)
            next(ret)
        } catch (ex) {
            callback.reject(ex)
        }
    }

    function resolve(newValue) {
        console.log(`[${name}]: resolve newValue=${newValue}`)

        const fn = () => {
            console.log(`[${name}]: resolve_fn newValue=${newValue}`)

            // 只输出第一次resolve的内容 Promise是有状态且状态只可以由pending->fulfilled或pending->reject 是不可逆的
            if (state !== 'pending') {
                return
            }
            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                const { then } = newValue
                if (typeof then === 'function') {
                    /*
                    * newValue为新产生的Promise 此时resolve为上一个promise的resolve
                    * 相当于调用了新产生Promise的then方法 注入了上个promise的resolve为其回调
                    * */
                    then.call(newValue, resolve, reject)
                    return
                }
            }
            state = 'fulfilled'
            value = newValue
            handleCb()
        }
        setTimeout(fn, 0) //
    }

    function reject(error) {
        const fn = () => {
            // 只输出第一次resolve的内容 Promise是有状态且状态只可以由pending->fulfilled或pending->reject 是不可逆的
            if (state !== 'pending') {
                return
            }
            if (error && (typeof error === 'object' || typeof error === 'function')) {
                const { then } = error
                if (typeof then === 'function') {
                    /*
                    * newValue为新产生的Promise 此时resolve为上一个promise的resolve
                    * 相当于调用了新产生Promise的then方法 注入了上个promise的resolve为其回调
                    * */
                    then.call(error, resolve, reject)
                    return
                }
            }
            state = 'rejected'
            value = error
            handleCb()
        }
        setTimeout(fn, 0) //
    }

    function handleCb() {
        while (callbacks.length) {
            const fulfiledFn = callbacks.shift()
            handle(fulfiledFn)
        }
    }

    fn(resolve, reject) // 立即执行Promise中传入的fn函数 将Promise内部的resolve、reject函数作为参数传递给fn
}

new MyPromise((resolve, reject) => {
    resolve(1)
})
    /* then中新创建的Promise 它的状态变为fulfilled的节点是在上一个Promise的回调执行完毕的时候
    * 回调函数返回的结果会被当做value 返回给下一个Promise 同时下一个Promise的状态也会改变
    * 然后再去执行其回调 以此类推下去 链式调用的效应就出来了
    */
    .then(result1 => {
        console.log('result1', result1)
        // return new MyPromise((resolve, reject) => {
        //     reject(2)
        // })
    })
    // .catch(error => {
    //     console.log('error', error)
    // })
    // .finally(() => {
    //     console.log('finally')
    // })
