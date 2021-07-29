###React里程碑
* v16.0:  
1. 重写核心模块Reconciler 启用Fiber架构 解决大型应用一次更新遍历大量虚拟DOM卡顿的问题  
2. 增加createPortal API 让节点渲染到指定容器内 更好的实现弹窗功能  
3. 引入componentDidCatch钩子 捕获渲染中的异常 划分了错误边界  
* v16.2:  
1. 增加Fragment 解决数组元素问题  
* v16.3:  
1. 增加createRef API 创建Ref对象  
2. 增加forwardRef API 解决高阶组件ref传递问题  
3. 新版本的context API 迎接Provider/Consumer
4. 增加getDerivedStateFromProps 和 getSnapshotBeforeUpdate 生命周期  
* v16.6:  
1. 增加memo API 用于控制子组件渲染  
2. 增加lazy API 实现代码分割  
3. 增加contextType 让类组件更便捷的使用context  
4. 增加生命周期 getDerivedStateFromError 代替 componentDidCatch  
* v16.8:  
1. 全新 React-Hooks 支持，使函数组件也能做类组件的一切事情  
* v17:  
1. 事件绑定由 document 变成 container ，移除事件池等  
