let time = 0;
let nowTime = +new Date();
let timer;
const poll = function() {
    timer = setTimeout(function() {
        const lastTime = nowTime;
        nowTime = +new Date();
        console.log('递归setTimeout(fn, 0)产生时间差', nowTime - lastTime);
        poll();
    }, 0);
    if (time++ === 20) clearTimeout(timer);
}
poll();