/*
 * @Author: your name
 * @Date: 2021-11-23 15:34:43
 * @LastEditTime: 2021-11-23 17:07:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\router\components\PrivateRouter.tsx
 */
import React from "react";
import { Route, useHistory } from "react-router-dom";
import { RouteProps } from "react-router";
import { Result, Button } from "antd";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const logined = localStorage.getItem("token");
  const history = useHistory();

  return logined ? (
    <Route {...props} />
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="无权限"
      extra={
        <Button type="primary" onClick={() => history.push("/login")}>
          跳转到登录页
        </Button>
      }
    />
  );
};

export default PrivateRoute;
