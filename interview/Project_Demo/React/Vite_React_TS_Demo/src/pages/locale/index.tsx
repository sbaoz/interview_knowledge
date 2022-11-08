/*
 * @Author: your name
 * @Date: 2021-11-22 15:55:27
 * @LastEditTime: 2022-07-11 17:54:50
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\pages\locale\index.tsx
 */
import React, { useState } from "react";
import { Card, Radio, RadioChangeEvent } from "antd";
import { formatMessage, setLocale } from "@/components/Locales";
import styles from "./index.module.less";

const LocalePage: React.FC = () => {
  const [localeVal, setLocaleVal] = useState(localStorage.getItem("__locale_name__") || "zh-CN");

  const handleLocaleChange = (e: RadioChangeEvent) => {
    setLocaleVal(e.target.value);
    setLocale(e.target.value);
  };

  return (
    <Card title={formatMessage({ id: "switchLan" })} style={{ width: "500px" }}>
      <Radio.Group value={localeVal} onChange={handleLocaleChange}>
        <Radio value={"zh-CN"}>{formatMessage({ id: "switchToEn" })}</Radio>
        <Radio value={"en-US"}>{formatMessage({ id: "switchToCh" })}</Radio>
      </Radio.Group>
      <div className={styles.localLan}>{formatMessage({ id: "localLan" })}react-intl</div>
    </Card>
  );
};

export default LocalePage;
