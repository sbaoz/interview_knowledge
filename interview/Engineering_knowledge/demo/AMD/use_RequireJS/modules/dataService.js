// dataService.js文件
define(function (window) {
    let msg = 'www.baidu.com'
    function getMsg() {
        return msg.toUpperCase()
    }
    return {getMsg}
})
