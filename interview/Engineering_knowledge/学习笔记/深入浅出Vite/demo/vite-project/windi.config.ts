/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-12 17:15:24
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-12 17:28:03
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\vite-project\windi.config.ts
 * @Description: windicss配置文件 用于开启attributify 和 配置shortcuts
 */
import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  // 开启 attributify
  attributify: true,
  shortcuts: {
    'flex-c': 'flex justify-center items-center'
  }
});
