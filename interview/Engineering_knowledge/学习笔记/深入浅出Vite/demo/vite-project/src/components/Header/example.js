/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-13 17:17:43
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-13 17:26:08
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\vite-project\src\components\Header\example.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const start = () => {
  let count = 0;
  setInterval(() => {
    console.log(111);
    // 给主线程传值
    postMessage(++count);
  }, 2000);
};
start();
