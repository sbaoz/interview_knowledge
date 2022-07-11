let scheduledHostCallback = null;
// 建立一个消息通道
let channel = new MessageChannel();
// 建立一个port发送消息
let port = channel.port2;
let isMessageLoopRunning = false;

channel.port1.onmessage = function () {
  // 执行任务
  scheduledHostCallback();
  // 执行完毕 清空任务
  scheduledHostCallback = null;
};
// 向浏览器请求执行更新任务
requestHostCallback = function (callback) {
  scheduledHostCallback = callback;
  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true;
    port.postMessage(null);
  }
};

(function () {
  const arr = new Array(20000).fill(1);
  arr.forEach((item) => {
    console.log(item);
  });
  requestHostCallback(function () {
    console.log(11111111111);
  });
})();
