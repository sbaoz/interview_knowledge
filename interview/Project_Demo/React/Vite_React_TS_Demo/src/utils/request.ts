/*
 * @Author: your name
 * @Date: 2021-11-09 16:51:07
 * @LastEditTime: 2021-11-09 16:53:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\utils\request.ts
 */
import umiRequest, { extend } from "umi-request";
import { urlPrefix } from "../config";

export const request = extend({
  prefix: urlPrefix,
});

export default umiRequest;
