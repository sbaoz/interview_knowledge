/*
 * @Author: your name
 * @Date: 2021-11-09 16:40:56
 * @LastEditTime: 2021-11-09 16:48:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\env.d.ts
 */
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
