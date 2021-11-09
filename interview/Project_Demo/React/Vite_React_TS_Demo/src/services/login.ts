/*
 * @Author: your name
 * @Date: 2021-11-09 16:55:24
 * @LastEditTime: 2021-11-09 17:00:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\services\login.ts
 */
import { request } from "../utils/request";

/*
 * 登录请求数据类型
 */
export interface ILogin {
  userName: string;
  pwd: string;
}

/*
 * 返回数据类型
 */
export interface ILoginData {
  code: number;
  message: string;
  token: string;
}

/*
 * 登录接口
 * @param params
 */
export const loginApi = (params: ILogin): Promise<ILoginData> => {
  return request.get("/login", {
    params,
  });
};
