/*
 * @Author: your name
 * @Date: 2021-11-10 16:48:30
 * @LastEditTime: 2021-11-10 18:02:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\components\Locales\index.ts
 */
import React from "react";
import type { IntlShape } from "react-intl";
import { IntlProvider } from "react-intl";
import { Locale } from "antd/lib/locale-provider";
import antdEnLn from "antd/lib/locale/en_US";
import antdZhLn from "antd/lib/locale/zh_CN";
import enLn from "./locale/en";
import zhLn from "./locale/zh";

let gIntl: IntlShape;
const defaultLanguage = "zh-cn";
let currentLocaleName = "";

if (typeof window.localStorage !== "undefined") {
  currentLocaleName = localStorage.getItem("__locale_name__") || defaultLanguage;
  if (!localStorage.getItem("__locale_name__")) {
    localStorage.setItem("__locale_name__", currentLocaleName);
  }
} else {
  currentLocaleName = defaultLanguage;
}

interface ILocaleInfo {
  messages: Record<string, string>;
  locale: string;
  antd: Locale;
  momentLocale: string;
}
type LocaleType = "zh_CN" | "en_US";

const localeInfo: Record<LocaleType, ILocaleInfo> = {
  zh_CN: {
    messages: zhLn,
    locale: "zh-cn",
    antd: antdZhLn,
    momentLocale: "zh-cn",
  },
  en_US: {
    messages: enLn,
    locale: "en",
    antd: antdEnLn,
    momentLocale: "",
  },
};

export const setLocale = (lang: string) => {
  if (typeof window.localStorage !== "undefined") {
    window.localStorage.setItem("__locale_name__", lang);
    window.location.reload();
  } else {
    throw new Error("window.localStorage is undefined");
  }
};

export const getLocaleInfo = () => {
  return localeInfo[currentLocaleName];
};

export const getLocale = () => {
  return currentLocaleName;
};

export const LocaleProvider: React.FC = (props) => {
  return <IntlProvider locale={getLocale()}>{props.children}</IntlProvider>;
};
