/*
 * @Author: your name
 * @Date: 2021-11-23 14:31:57
 * @LastEditTime: 2021-11-23 15:01:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\pages\icon\index.tsx
 */
import React from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import Icon from "@/components/Icon";

const IconPage: React.FC = () => {
  return (
    <div>
      <Icon type="icon-ditu" size={"large"} />
      <MinusCircleOutlined style={{ fontSize: "16px", color: "#08c" }} />
    </div>
  );
};

export default IconPage;
