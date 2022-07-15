/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-13 15:08:39
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-13 15:10:58
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\vite-project\.commitlintrc.js
 * @Description: commitlint配置文件
 * 规定的 commit 信息一般由两个部分: type 和 subject 组成
 * 常用的 type 值包括如下:
 * feat: 添加新功能。
 * fix: 修复 Bug。
 * chore: 一些不影响功能的更改。
 * docs: 专指文档的修改。
 * perf: 性能方面的优化。
 * refactor: 代码重构。
 * test: 添加一些测试代码等等。
 *  */
module.exports = {
  extends: ['@commitlint/config-conventional']
};
