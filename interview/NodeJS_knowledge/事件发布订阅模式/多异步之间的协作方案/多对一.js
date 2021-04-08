const render = function (results) {
    console.log(results);
}

// 偏函数 通过指定部分参数来产生一个新的定制函数的形式
const after = function (times, callback) {
    let count = 0
    const results = {}
    return  function (key, value) {
        results[key] = value
        count += 1
        if (count === times) {
            callback(results)
        }
    }
}

const done = after(2, render)

const fsRead = function () {
    setTimeout(function () {
        done('template', 'template result')
    }, 1000)
}

const sqlSelect = function () {
    setTimeout(function () {
        done('data', 'data result')
    }, 2000)
}

fsRead()
sqlSelect()



