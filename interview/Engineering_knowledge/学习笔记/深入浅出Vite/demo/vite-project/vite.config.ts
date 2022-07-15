/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-12 14:11:49
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-15 12:00:27
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\vite-project\vite.config.ts
 * @Description: Vite配置文件
 */
import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
/**
 * 引入 path 包注意两点:
 * 1. 为避免类型报错，你需要通过 `pnpm i @types/node -D` 安装类型
 * 2. tsconfig.node.json 中设置 `allowSyntheticDefaultImports: true`，以允许下面的 default 导入方式
 */
import path from 'path';
import autoprefixer from 'autoprefixer';
import windi from 'vite-plugin-windicss';
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from '@amatlash/vite-plugin-stylelint';
import svgr from 'vite-plugin-svgr';
import viteImagemin from 'vite-plugin-imagemin';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'));
// 是否为生产环境 在生产环境一般会注入 NODE_ENV 这个环境变量
const isProduction = process.env.NODE_ENV === 'production';
// 填入项目的 CDN 域名地址
const CDN_URL = 'http://xxxxxx/';

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? CDN_URL : '/',
  root: path.join(__dirname, './'), // 手动指定项目根目录位置
  // 别名配置 alias 别名配置不仅在 JavaScript 的 import 语句中生效，在 CSS 代码的 @import 和 url导入语句中也同样生效
  resolve: {
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  plugins: [
    react(),
    windi(),
    viteEslint(),
    viteStylelint({
      exclude: /windicss|node_modules/ // 对某些文件排除检查
    }),
    svgr(),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }), // 图片压缩
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/icons')]
    }) // svg雪碧图
  ],
  // css 相关的配置
  css: {
    // CSS预处理器配置
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    },
    // CSS Modules配置
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    // CSS后处理器配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  },
  build: {
    assetsInlineLimit: 8 * 1024 // 资源文件内联的临界值 8kb
  },
  // 预构建相关的配置
  optimizeDeps: {}
  // json: {
  //   stringify: true // 禁用JSON文件按名导入的方式
  // }
});
