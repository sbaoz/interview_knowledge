### 什么是React组件  
本质上就是类和函数 组件承载了渲染视图的UI和更新视图的方法  
React有class组件和function组件  
React调和渲染fiber节点的时候按照fiber的tag来区分处理逻辑  

### class组件  
在 class 组件中，除了继承 React.Component ，底层还加入了 updater 对象，组件中调用的 setState 和 forceUpdate 本质上是调用了 updater 对象上的 enqueueSetState 和 enqueueForceUpdate 方法。  
class组件会创建实例 并在实例上绑定props和context等属性 原型链上绑定setState、forceUpdate方法 对于 updater，React 在实例化类组件之后会单独绑定 update 对象。  

### function组件
function组件采用直接执行的方式 而不是通过new的方式 所以不要尝试给function组件prototype绑定属性或方法 不会有作用

### class组件和function组件的区别  
class组件底层只需要实例化一次 实例中保存了组件的state等状态 每次更新只需要调用render方法以及对应的生命周期函数  
function组件每次更新都会重新执行一次函数 里面的变量都会重新声明 利用React Hooks可以帮助function组件保存组件的状态 处理额外的副作用 模拟生命周期  

### 组件通信方式  
1. props和callback  
最基本的通信方式  
父组件通过自身state改变 重新渲染 传递props 通知子组件  
子组件通过调用父组件props传递发callback 通知父组件  
2. ref  
3. redux等状态管理  
4. context上下文  
5. event bus事件总线  
不推荐使用 需要手动绑定和解绑 中大型项目难以维护 违背单项数据流向原则  

### 组件强化的方式  
1. class组件继承  
首先实现一部分基础功能 再针对项目要求进行有方向的改造、强化、添加额外的功能  
优势如下：  
可以控制父类 render，还可以添加一些其他的渲染内容；  
可以共享父类方法，还可以添加额外的方法和属性。  

state 和生命周期会被继承后的组件修改  
2. function组件自定义Hooks  
3. HOC高阶组件  

### 问答  
问：如果没有在 constructor 的 super 函数中传递 props，那么接下来 constructor 执行上下文中就获取不到 props ，这是为什么呢？
答：绑定 props 是在父类 Component 构造函数中，执行 super 等于执行 Component 函数，此时 props 没有作为第一个参数传给 super() ，在 Component 中就会找不到 props 参数。

问：class组件主要组成介绍demo中的两个handleClick 点击div之后会打印什么？  
答：打印111。因为在 class 类内部，箭头函数是直接绑定在实例对象上的，而第二个 handleClick 是绑定在 prototype 原型链上的，它们的优先级是：实例对象上方法属性 > 原型链对象上方法属性。  



