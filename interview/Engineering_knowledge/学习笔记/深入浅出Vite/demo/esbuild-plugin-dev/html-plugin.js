/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2023-02-22 14:21:16
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2023-02-22 14:53:53
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\esbuild-plugin-dev\html-plugin.js
 * @Description: 自动生成HTML插件
 */
const fs = require('fs/promises');
const path = require('path');
const { createScript, createLink, generateHTML } = require('./util');

module.exports = () => {
    return {
        name: 'esbuild:html',
        setup(build) {
            build.onEnd(async (buildResult) => {
                if (buildResult.errors.length) {
                    return;
                }
                console.log(buildResult)
                const { metafile } = buildResult;
                // 1. 拿到 metafile 后获取所有的 js 和 css 产物路径
                const scripts = [];
                const links = [];
                if (metafile) {
                const { outputs } = metafile;
                const assets = Object.keys(outputs);

                assets.forEach((asset) => {
                    if (asset.endsWith(".js")) {
                    scripts.push(createScript(asset));
                    } else if (asset.endsWith(".css")) {
                    links.push(createLink(asset));
                    }
                });
                }
                // 2. 拼接 HTML 内容
                const templateContent = generateHTML(scripts, links);
                // 3. HTML 写入磁盘
                const templatePath = path.join(process.cwd(), "index.html");
                await fs.writeFile(templatePath, templateContent);
            });
        },
    }
}