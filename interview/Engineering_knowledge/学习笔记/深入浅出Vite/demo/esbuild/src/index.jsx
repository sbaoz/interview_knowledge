/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-18 10:53:32
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-18 16:33:55
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\esbuild\src\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Server from 'react-dom/server'

const Greet = () => <h1>hello2</h1>
console.log(Server.renderToString(<Greet />))