/*
 * @Author: sbaoz xiaojz821@hotmail.com
 * @Date: 2022-07-14 15:03:52
 * @LastEditors: sbaoz xiaojz821@hotmail.com
 * @LastEditTime: 2022-07-14 16:56:07
 * @FilePath: \interview_knowledge\interview\Engineering_knowledge\学习笔记\深入浅出Vite\demo\vite-project\src\components\SvgIcon\index.ts
 * @Description: 通过vite-plugin-svg-icons插件 将所有的svg合并到一个雪碧图中 通过use属性来引用雪碧图的对应内容 减少大量svg的网络请求
 */
export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  prefix?: string;
  color?: string;
}
export default function SvgIcon({
  name,
  prefix = 'icon',
  color = '#333',
  ...props
}: SvgIconProps) {
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg {...props} aria-hidden="true">
      <use href={symbolId} fill={color} />
    </svg>
  );
}
