// app.js文件
(function () {
    require.config({
        baseUrl: './', // 基本路径，出发点在根目录下
        paths: {
            // 映射：模块标识名：路径
            alerter: 'modules/alerter',
            dataService: 'modules/dataService'
        }
    })
    require(['alerter'], function (alerter) {
        alerter.showMsg()
    })
})()
