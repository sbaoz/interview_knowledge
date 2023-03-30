/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-11-14 15:08:55
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2023-02-22 14:47:18
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\esbuild-plugin-dev\build.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { build } = require("esbuild");
const httpImport = require("./http-import-plugin");
const html = require('./html-plugin');

async function runBuild() {
  build({
    absWorkingDir: process.cwd(),
    entryPoints: ["./src/index.jsx"],
    entryNames: "[dir]/[name]-[hash]",
    outdir: "dist",
    bundle: true,
    format: "esm",
    splitting: true,
    sourcemap: true,
    metafile: true,
    chunkNames: "[name]-[hash]",
    assetNames: "assets/[name]-[hash]",
    plugins: [httpImport(), html()],
  }).then(() => {
    console.log("🚀 Build Finished!");
  });
}

runBuild();