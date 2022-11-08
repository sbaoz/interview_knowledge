/*
 * @Author: your name
 * @Date: 2021-12-18 14:09:53
 * @LastEditTime: 2021-12-28 13:59:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\JavaScript_knowledge\编程\带取消功能的延迟函数\index.js
 */
const createAbortError = () => {
  const error = new Error("Delay aborted");
  error.name = "AbortError";
  return error;
};
const createDelay =
  ({ custClearTimeout, custSetTimeout, willResolve }) =>
  (ms, { value, signal } = {}) => {
    if (signal && signal.aborted) {
      return Promise.reject(createAbortError());
    }
    let timeoutId;
    let settle;
    let rejectFn;
    const clear = custClearTimeout || clearTimeout;
    const set = custSetTimeout || setTimeout;
    const signalListener = () => {
      clear(timeoutId);
      rejectFn(createAbortError());
    };
    const cleanup = () => {
      if (signal) {
        signal.removeEventListener("abort", signalListener);
      }
    };
    const delayPromise = new Promise((resolve, reject) => {
      settle = () => {
        console.log("settle");
        cleanup();
        if (willResolve) {
          resolve(value);
        } else {
          reject(value);
        }
      };
      rejectFn = reject;
      timeoutId = set(settle, ms);
    });
    if (signal) {
      signal.addEventListener("abort", signalListener, { once: true });
    }
    delayPromise.clear = () => {
      clear(timeoutId);
      timeoutId = null;
      settle();
    };
    return delayPromise;
  };

const randomInteger = (minimun, maxmum) => Math.floor(Math.random() * (maxmum - minimun + 1) + minimun);

const createDelayWithTimers = (clearAndSet) => {
  const delay = {};
  delay.resolve = createDelay({ ...clearAndSet, willResolve: true });
  delay.reject = createDelay({ ...clearAndSet, willResolve: false });
  delay.range = (minimun, maxmum, options) => delay.resolve(randomInteger(minimun, maxmum) * 1000, options);
  return delay;
};

(async () => {
  console.time("delay");
  const abortController = new AbortController();
  // setTimeout(() => {
  //   abortController.abort();
  // }, 500);
  const delay = createDelayWithTimers();
  try {
    const resp = await delay.resolve(1000, { value: "lala", signal: abortController.signal });
    // setTimeout(() => {
    //   delayPromise.clear();
    // }, 300);
    console.log("延迟输出：", resp);
  } catch (err) {
    console.log("异常：", err);
  }
  console.timeEnd("delay");
})();
