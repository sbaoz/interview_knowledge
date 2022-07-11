/*
 * @Author: your name
 * @Date: 2021-11-23 13:31:46
 * @LastEditTime: 2021-11-23 15:00:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\components\Icon\index.tsx
 */
import React from "react";
import classNames from "classnames";
import { createFromIconfontCN } from "@ant-design/icons";
import styles from "./index.module.less";

export interface IconType extends React.HTMLAttributes<any> {
  type: string;
  size?: "small" | "normal" | "large" | null;
  disabled?: boolean;
}

const FontIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_926128_dd736fi8pv.js",
});

const Icon: React.FC<IconType> = ({ className, size = "normal", disabled, ...restProps }) => {
  return (
    <FontIcon
      className={classNames(
        {
          [styles.large]: size === "large",
          [styles.normal]: size === "normal",
          [styles.small]: size === "small",
          [styles.disabled]: disabled,
        },
        className
      )}
      {...restProps}
    />
  );
};

export default React.memo(Icon);
