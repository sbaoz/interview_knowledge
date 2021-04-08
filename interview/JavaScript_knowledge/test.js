// new Promise((resolve, reject) => {
//     resolve(1)
// }).then(result => {
//     console.log(result)
// }).then(result => {
//     console.log(result)
// }).then(result => {
//     console.log(result)
// })
function MyPromise(fn) {
    let state = 'pending' // 初始化Promise状态
    let value = null;
    const callbacks = []

    this.then = function (onFulfilled) {
        // then中返回了新的Promise
        return new MyPromise((resolve, reject) => {
            // 但then中注册的回调依然属于上一个Promise
            handle({
                onFulfilled,
                resolve,
                reject
            })
        })
    }

    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback)
            return
        }

        if (state === 'fulfilled') {
            if (!callback.onFulfilled) {
                callback.resolve(value)
                return
            }
            const ret = callback.onFulfilled(value) // 处理回调
            callback.resolve(ret) // 处理下一个Promise的resolve
        }
    }

    function resolve(newValue) {
        const fn = () => {
            // 只输出第一次resolve的内容 Promise是有状态且状态只可以由pending->fulfilled或pending->reject 是不可逆的
            if (state !== 'pending') {
                return
            }
            state = 'fulfilled'
            value = newValue
            handleCb()
        }
        setTimeout(fn,0) //
    }

    function reject() {

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
    .then(result => {
    console.log('result1', result)
    // return new MyPromise((resolve, reject) => {
    //     resolve(2)
    // })
})
//     .then(result => {
//     console.log('result2', result)
// })
