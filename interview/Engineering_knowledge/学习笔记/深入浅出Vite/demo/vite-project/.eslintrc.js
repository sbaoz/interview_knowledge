/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-12 17:49:56
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-13 11:03:18
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\vite-project\.eslintrc.js
 * @Description: ESLint配置
 */
module.exports = {
  env: {
    // 运行环境
    browser: true, // 启用浏览器环境 该环境的一些全局变量（window等）会同时启用
    node: true,
    es2021: true
  },
  // "globals": { // 有些全局变量是业务代码引入的第三方库所声明，这里就需要在globals配置中声明全局变量了 比如jquery 配置值有3种情况 'writable'或者true 表示变量可重写 'readonly'或者false 表示变量不可重写 'off'表示禁用该全局变量
  //     "$": false,
  //     "jquery": false
  // },
  extends: [
    // 继承另外的ESLint配置 配置为一个字符串或一个字符串数组 分为3种情况 1.从ESLint本身继承 2.从类似eslint-config-xxx 的npm包继承 3. 从ESLint插件继承 格式一般为 plugin:${pluginName}/${configName}
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // 接入 prettier 的规则 覆盖掉 eslint 的格式化规则
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser', // 解析器 ESLint底层使用Espree进行AST解析 不支持TS 需要将TS代码转换为Espree能识别的格式
  parserOptions: {
    // 解析器选项
    ecmaFeatures: {
      // 设置使用额外的语言特性
      jsx: true
    },
    ecmaVersion: 'latest', // 可以配置ES+数字（ES6）或ES+年份（ES2015）也可以配置lastest 启用最新的ES语法
    sourceType: 'module' // 默认为script 使用ESModule则设置为module
  },
  plugins: [
    'react',
    '@typescript-eslint', // 添加TS规则 添加插件后默认没有开启规则校验 需要在rules中配置
    'prettier' // prettier的eslint插件
  ],
  rules: {
    // 具体代码规则
    'prettier/prettier': 'error', // 将不符合prettier格式化规则的都标记为错误
    'react/react-in-jsx-scope': 'off', // suppress errors for missing 'import React' in files
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
};
