/*
 * @Author: your name
 * @Date: 2021-11-09 11:16:31
 * @LastEditTime: 2021-11-09 17:26:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\App.tsx
 */
import React, { useState, useEffect } from "react";
import { loginApi } from "./services/login";
import "./App.css";

export default function App() {
  const [userName, setUserName] = useState("aaa");
  const [pwd, setPwd] = useState("1111");
  const [count, setCount] = useState(0);

  useEffect(() => {
    loginApi({ userName, pwd }).then((resp) => console.log(resp));
  }, []);

  return (
    <div className="app" onClick={() => setCount(count + 1)}>
      App{count}
    </div>
  );
}
