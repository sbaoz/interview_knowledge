/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-11-14 15:09:28
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2023-02-22 14:17:28
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\esbuild-plugin-dev\http-import-plugin.js
 * @Description: Esbuild插件 从网络获取模块内容并让Esbuild进行加载
 */
module.exports = () => ({
    name: "esbuild:http",
    setup(build) {
      let https = require("https");
      let http = require("http");
  
      // 拦截 CDN 请求
      build.onResolve({ filter: /^https?:\/\// }, (args) => {
        console.log('拦截路径 ', args.path)
        return {
            path: args.path,
            namespace: "http-url",
          }
      });
  
      // 拦截间接依赖的路径，并重写路径
      build.onResolve({ filter: /.*/, namespace: "http-url" }, (args) => {
        console.log('重写路径 ', new URL(args.path, args.importer).toString())
        return {
            path: new URL(args.path, args.importer).toString(),
            namespace: "http-url",
          }
      });
  
      // 通过 fetch 请求加载 CDN 资源
      build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
        let contents = await new Promise((resolve, reject) => {
          function fetch(url) {
            console.log(`Downloading: ${url}`);
            let lib = url.startsWith("https") ? https : http;
            let req = lib
              .get(url, (res) => {
                if ([301, 302, 307].includes(res.statusCode)) {
                  fetch(new URL(res.headers.location, url).toString());
                  req.abort();
                } else if (res.statusCode === 200) {
                  let chunks = [];
                  res.on("data", (chunk) => chunks.push(chunk));
                  res.on("end", () => resolve(Buffer.concat(chunks)));
                } else {
                  reject(
                    new Error(`GET ${url} failed: status ${res.statusCode}`)
                  );
                }
              })
              .on("error", reject);
          }
          fetch(args.path);
        });
        return { contents };
      });
    },
  });