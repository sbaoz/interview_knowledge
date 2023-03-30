/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2023-02-22 14:38:25
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2023-02-22 14:39:03
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\esbuild-plugin-dev\util.js
 * @Description: 工具函数
 */
const createScript = (src) => `<script type="module" src="${src}"></script>`;
const createLink = (src) => `<link rel="stylesheet" href="${src}"></link>`;
const generateHTML = (scripts, links) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Esbuild App</title>
  ${links.join("\n")}
</head>

<body>
  <div id="root"></div>
  ${scripts.join("\n")}
</body>

</html>
`;

module.exports = { createLink, createScript, generateHTML };