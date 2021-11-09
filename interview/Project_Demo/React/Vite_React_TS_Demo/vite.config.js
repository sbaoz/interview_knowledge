/*
 * @Author: your name
 * @Date: 2021-11-09 17:06:22
 * @LastEditTime: 2021-11-09 17:27:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\vite.config.js
 */
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";
import { apiAddress, proxyApi } from "./src/config";
import * as path from "path";

export default defineConfig({
  server: {
    proxy: {
      [proxyApi]: {
        target: apiAddress,
        changeOrigin: true,
        cookieDomainRewrite: "",
        secure: false,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [reactRefresh()],
});
