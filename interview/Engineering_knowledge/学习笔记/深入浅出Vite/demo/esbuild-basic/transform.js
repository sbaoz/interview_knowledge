/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-18 16:38:08
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-18 16:52:10
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\esbuild\transform.js
 * @Description: Transform API
 */
const { transform, transformSync } = require("esbuild");

async function runTransform() {
  // 第一个参数是代码字符串，第二个参数为编译配置
  const content = await transform("const isNull = (str: string): boolean => str.length > 0;", {
    sourcemap: true,
    loader: "",
  });
  console.log(content);
}

// function runTransform() {
//   const content = transformSync("const isNull = (str: string): boolean => str.length > 0;", {
//     sourcemap: true,
//     loader: "",
//   });
//   console.log(content);
// }

runTransform();
