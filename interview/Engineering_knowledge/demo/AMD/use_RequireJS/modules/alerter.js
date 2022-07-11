// alerter.js文件
define(['dataService'], function (dataService) {
    let name = 'Tom'
    function showMsg() {
        alert(dataService.getMsg() + ', ' + name)
    }
    return {showMsg}
})
