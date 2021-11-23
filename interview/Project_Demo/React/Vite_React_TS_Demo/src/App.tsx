/*
 * @Author: your name
 * @Date: 2021-11-09 11:16:31
 * @LastEditTime: 2021-11-23 16:03:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\App.tsx
 */
import React, { useState, useEffect } from "react";
import { ConfigProvider, Radio, RadioChangeEvent } from "antd";
import "antd/dist/antd.less";
import { loginApi } from "./services/login";
import RouterPage from "./router";
import { getLocaleInfo, LocaleProvider } from "./components/Locales";
import style from "./App.module.less";

export default function App() {
  const [userName, setUserName] = useState("aaa");
  const [pwd, setPwd] = useState("1111");

  useEffect(() => {
    loginApi({ userName, pwd }).then((loginResp) => {
      if (loginResp && loginResp.code === 200) {
        localStorage.setItem("token", loginResp.result.token);
      }
    });
  }, []);

  return (
    <div className={style.app}>
      <LocaleProvider>
        <ConfigProvider locale={getLocaleInfo().antd}>
          {/* {formatMessage({ id: "localLan" })} */}
          <RouterPage />
        </ConfigProvider>
      </LocaleProvider>
    </div>
  );
}
