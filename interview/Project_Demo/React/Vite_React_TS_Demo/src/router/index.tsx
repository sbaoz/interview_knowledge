/*
 * @Author: your name
 * @Date: 2021-11-22 15:21:30
 * @LastEditTime: 2021-11-23 15:58:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\router\index.ts
 */
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRouter from "./components/PrivateRouter";
import LoginPage from "@/pages/login";
import HomePage from "@/pages/home";
import LocalePage from "@/pages/locale";
import IconPage from "@/pages/icon";

const RouterPage = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route
          path="/"
          render={() => (
            <HomePage>
              <Switch>
                <PrivateRouter path="/locale" component={LocalePage} />
                <PrivateRouter path="/icon" component={IconPage} />
                <Redirect to="/icon" />
              </Switch>
            </HomePage>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterPage;
