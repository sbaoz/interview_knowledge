/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-12 14:11:49
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-14 16:16:31
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\vite-project\src\main.tsx
 * @Description: Vite会将项目的源代码编译成浏览器可以识别的代码 Chrome的网络调试面板中可以看到编译后的结果
 * 在Vite项目中 一个import语句即代表一个HTTP请求，Vite Dev Server 会读取本地文件，返回浏览器可以解析的代码。
 * 当浏览器解析到新的 import 语句，又会发出新的请求，以此类推，直到所有的资源都加载完成
 * no-bundle理念的真正含义: 利用浏览器原生 ES 模块的支持，实现开发阶段的 Dev Server，进行模块的按需加载，而不是先整体打包再进行加载。
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'virtual:windi.css'; // 用来注入 Windi CSS 所需的样式，一定要加上！
import 'virtual:svg-icons-register'; // svg雪碧图

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
