# CSS模块化  

- CSS模块化的作用  
没有模块化会有如下问题  
1. 防止全局污染 样式被覆盖  
2. 命名混乱  
3. CSS代码冗余 体积庞大  

为了解决如上问题 CSS模块化应运而生 React使用CSS模块化的思路主要有两种  
1. css modules：依赖于webpack构建和css-loader等loader处理 将css交给js动态加载  
2. 放弃css：css in js 用js对象方式写css 然后作为style方式赋值给React组件的DOM元素  
   这种写法不需要.css .less .scss等文件 取而代之的是每一个组件都有一个写对应样式的js文件  

### CSS Modules  
css modules使项目中可以像加载js模块一样加载css  
本质上通过命名规则生成唯一性的css类名 从根本上解决css全局污染 样式覆盖的问题  
css-loader配置  
```javascript
{
    test: /\.css$/, /* 对于 css 文件的处理 */
    use: [
       'css-loader?modules' /* 配置css-loader ,加一个 modules */
    ]
}
```
自定义命名规则  
```javascript
{
     test: /\.css$/, /* 对于 css 文件的处理 */
     use: [
        {
            loader: 'css-loader',
            options:{
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]", /* 命名规则  [path][name]__[local] 开发环境 - 便于调试   */
              }
            }
        }
     ]
}
```
[path][name]__[local] -> 开发环境 便于调试 可以直接通过src-pages-cssModule-style找到此类名对应的文件  
[hash:base64:5] -> 生产环境 便于生产环境压缩类名  
全局变量  
经过css modules处理的css文件类名 变成了哈希形式 再引用的时候就已经无效了  
css modules允许使用:global(.className)的语法 声明一个全局类名 凡是这样声明的class都不会被编译成哈希字符串  
组合样式  
css modules提供了一种composes组合方式 实现对样式的复用  
```css
.base { /* 基础样式 */
    color: blue;
}
.text { /* 继承基础样式 ，增加额外的样式 backgroundColor */
    composes: base;
    background-color: pink;
}
```
composes还支持动态引入别的模块下的类名  
style1.css  
```css
.text{
    color: pink;
}
```
style.css  
```css
.text { /* 继承基础样式 ，增加额外的样式 backgroundColor */
    composes:base from './style1.css';  /* base 样式在 style1.css 文件中 */
    background-color: pink;
}
```
组合方案  
全局样式或公共组件样式 用.css文件 不做css modules处理  
页面和业务组件用.less等做css modules  
动态添加class  
css modules配合classNames库 实现更灵活的动态添加类名  

css modules总结  
类名都有自己的私有域 避免类名重复/覆盖 全局污染问题  
引入css更加灵活 css模块之间可以互相结合  
class类名生成规则配置灵活 方便压缩class名  

css modules注意事项  
仅用class类名定义css 不使用其他选择器  
不要嵌套css（.a { .b {} }）或者重叠css(.a .b {])

### CSS IN JS  
// todo 用的少 晚点再写
