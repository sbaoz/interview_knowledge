/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-11-14 15:21:08
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-11-14 15:24:14
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\esbuild-plugin-dev\index.jsx
 * @Description: 第三方依赖从CND服务上拉取
 */
import { render } from 'https://cdn.skypack.dev/react-dom'
import React from 'https://cdn.skypack.dev/react'

const Greet = () => <h1>Hello World</h1>

render(<Greet />, document.getElementById('root'))