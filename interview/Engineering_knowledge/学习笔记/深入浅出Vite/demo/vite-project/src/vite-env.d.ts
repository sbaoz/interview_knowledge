/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-12 14:11:49
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-14 11:51:07
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\vite-project\src\vite-env.d.ts
 * @Description: 环境变量类型声明
 */
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 自定义的环境变量 某个环境变量要在 Vite 中通过 import.meta.env 访问，那么它必须以VITE_开头
  readonly VITE_IMG_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
