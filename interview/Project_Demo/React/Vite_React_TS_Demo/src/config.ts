/*
 * @Author: your name
 * @Date: 2021-11-09 16:33:36
 * @LastEditTime: 2021-11-09 17:21:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\config.ts
 */
export const apiAddress = "http://localhost:3008/";
export const proxyApi = "/api";
export const urlPrefix = process.env.NODE_ENV === "development" ? proxyApi : "";
