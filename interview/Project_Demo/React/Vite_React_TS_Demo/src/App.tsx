/*
 * @Author: your name
 * @Date: 2021-11-09 11:16:31
 * @LastEditTime: 2021-11-09 14:59:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\App.tsx
 */
import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app" onClick={() => setCount(count + 1)}>
      App{count}
    </div>
  );
}
