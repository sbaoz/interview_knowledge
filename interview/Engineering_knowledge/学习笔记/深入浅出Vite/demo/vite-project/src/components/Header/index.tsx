/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-12 16:09:41
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-14 16:12:22
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\vite-project\src\components\Header\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { devDependencies } from '../../../package.json';
// import Worker from './example.js?worker'; // 引入的时候注意加上?worker后缀，相当于告诉 Vite 这是一个 Web Worker 脚本文件
// import init from './fib.wasm';
import styles from './index.module.scss';
import logoSrc from '@assets/imgs/vite.png';
import { ReactComponent as ReactLogo } from '@assets/icons/logo.svg';
import SvgIcon from '../SvgIcon';
import { useEffect } from 'react';

// Vite 中提供了import.meta.glob的语法糖来解决这种批量导入的问题 globEager => 同步加载
const icons = import.meta.globEager('../../assets/icons/logo_*.svg');
console.log(icons);
const iconUrls = Object.values(icons).map((mod) => {
  // 如 ../../assets/icons/logo-1.svg -> logo-1
  const fileName = mod.default.split('/').pop();
  const [svgName] = fileName.split('.');
  return svgName;
});
// 初始化 Worker 实例
// const worker = new Worker();
// 主线程监听 worker 的信息
// worker.addEventListener('message', (e) => {
//   console.log(e);
// });

// export type FibFunc = (num: number) => number;
// wasm 引入
// init({}).then((exports) => {
//   const fibFunc = exports.fib as FibFunc;
//   console.log('Fib result:', fibFunc(10));
// });

export function Header() {
  useEffect(() => {
    const img = document.getElementById('logo') as HTMLImageElement;
    img.src = logoSrc;
  }, []);
  return (
    <div className={`p-20px text-center ${styles.header}`}>
      <ReactLogo height="120px" width="120px" />
      <h1 className="font-bold text-2xl mb-2">
        vite version: {devDependencies.vite}
      </h1>
      {/* 开启WindiCss的attributify（属性化）能力 可以用props的方式去定义样式属性 */}
      <button
        bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
        text="sm white"
        font="mono light"
        p="y-2 x-4"
        border="2 rounded blue-200"
      >
        Button
      </button>
      <div className="flex-c">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
      <img className="m-auto mb-4" src={logoSrc} alt="" />
      <img className="m-auto mb-4" alt="" id="logo" />
      {/* 图片需要存放到另外的存储服务的情况 */}
      <img
        className="m-auto mb-4"
        src={
          new URL(
            './tos-cn-i-k3u1fbpfcp/c99ea7293f8a4907a918af4455bec2c5~tplv-k3u1fbpfcp-zoom-1.gif',
            import.meta.env.VITE_IMG_BASE_URL
          ).href
        }
        alt=""
      />
      {iconUrls.map((item) => (
        <SvgIcon name={item} key={item} width="50" height="50" />
      ))}
    </div>
  );
}
