/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-12 17:21:27
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-15 12:03:33
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\vite-project\src\types\shim.d.ts
 * @Description: 使用windicss attributify的时候 需要增加类型声明 以防类型报错
 */
import { AttributifyAttributes } from 'windicss/types/jsx';

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
