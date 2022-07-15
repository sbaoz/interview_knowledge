/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-13 14:04:54
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-13 15:17:06
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\vite-project\.stylelintrc.js
 * @Description: stylelint配置文件
 * Stylelint的配置和ESLint相似
 * Stylelint 中 rules 的配置会和 ESLint 有些区别
 * 对于每个具体的 rule 会有三种配置方式:
 * - null，表示关闭规则。
 * - 一个简单值(如 true，字符串，根据不同规则有所不同)，表示开启规则，但并不做过多的定制。
 * - 一个数组，包含两个元素，即[简单值，自定义配置]，第一个元素通常为一个简单值，第二个元素用来进行更精细化的规则配置
 *  */
module.exports = {
  // 注册 stylelint 的 prettier 插件
  plugins: ['stylelint-prettier'],
  // 继承一系列规则集合
  extends: [
    // standard 规则集合
    'stylelint-config-standard',
    // standard 规则集合的 scss 版本
    'stylelint-config-standard-scss',
    // 样式属性顺序规则
    'stylelint-config-recess-order',
    // 接入 Prettier 规则
    'stylelint-config-prettier',
    'stylelint-prettier/recommended'
  ],
  // 配置 rules
  rules: {
    // 开启 Prettier 自动格式化功能
    'prettier/prettier': true
  }
};
