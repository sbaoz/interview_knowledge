/*
 * @Author: your name
 * @Date: 2021-11-10 16:48:30
 * @LastEditTime: 2021-11-22 14:25:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\components\Locales\index.ts
 */
import React from "react";
import type { IntlShape } from "react-intl";
import { IntlProvider, createIntl } from "react-intl";
import { Locale } from "antd/lib/locale-provider";
import antdEnLn from "antd/lib/locale/en_US";
import antdZhLn from "antd/lib/locale/zh_CN";
import enLn from "./locale/en";
import zhLn from "./locale/zh";

type LocaleInfo = {
  messages: Record<string, string>;
  locale: string;
  antd: Locale;
  momentLocale: string;
};
type LocaleType = "zh-CN" | "en-US";
type MessageDescriptor = {
  id: string;
  defaultMessage?: string;
  description?: string | object;
};

let gIntl: IntlShape;
const defaultLanguage = "zh-CN";
let currentLocaleName: LocaleType = defaultLanguage;

if (typeof window.localStorage !== "undefined") {
  currentLocaleName = (localStorage.getItem("__locale_name__") as LocaleType) || defaultLanguage;
  if (!localStorage.getItem("__locale_name__")) {
    localStorage.setItem("__locale_name__", currentLocaleName);
  }
} else {
  currentLocaleName = defaultLanguage;
}

const localeInfo: Record<LocaleType, LocaleInfo> = {
  "zh-CN": {
    messages: zhLn,
    locale: "zh-CN",
    antd: antdZhLn,
    momentLocale: "zh-CN",
  },
  "en-US": {
    messages: enLn,
    locale: "en-US",
    antd: antdEnLn,
    momentLocale: "",
  },
};

const getIntl = (locale?: LocaleType, changeIntl?: boolean) => {
  if (gIntl && !locale && !changeIntl) {
    return gIntl;
  }
  if (locale) {
    return createIntl(localeInfo[locale]);
  }
  return createIntl({ locale: "zh-CN", messages: {} });
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

export const formatMessage = (descriptor: MessageDescriptor, values?: Record<string, any>) => {
  if (!gIntl) {
    gIntl = getIntl(getLocale(), true);
  }
  return gIntl.formatMessage(descriptor, values);
};
