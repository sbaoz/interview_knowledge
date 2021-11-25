# ref

### ref对象创建  
- 什么是ref对象  
用createRef或者useRef创建出来的对象  
```javascript
{
    current: null // current指向ref对象获取的实际内容 可以是dom元素 组件实例 或者其他
}
```
- 类组件React.createRef  
> react/src/ReactCreateRef.js
```javascript
export function createRef() {
  const refObject = {
    current: null,
  }
  return refObject;
}
```
不要在函数组件中使用createRef 否则会造成ref对象内容丢失等情况  
- 函数组件React.useRef
useRef底层逻辑和createRef类似 只是ref保存的位置不同  
类组件有一个实例instance能够维护ref 但是函数组件每次更新 所有变量都会重新声明  
useRef不能像createRef一样把ref直接暴露出去 ref就会随着函数组件执行被重置  
为了解决这个问题 hooks和函数组件对应的fiber对象建立关联 将useRef产生的ref对象挂到函数组件对应的fiber对象上 函数组件每次执行 只要组件不被销毁 对应的fiber对象一直存在 ref信息就会被保存下来  

### React对ref属性的处理  
React对标签里面的ref属性的处理逻辑是多样化的  

- ref属性是一个字符串
```javascript
class Children extends Component{  
    render=()=><div>hello,world</div>
}

export default class Index extends React.Component{
    componentDidMount(){
       console.log(this.refs)
    }
    render=()=> <div>
        <div ref="currentDom">字符串模式获取元素或组件</div>
        <Children ref="currentComInstance" />
    </div>
}
```
用一个字符串ref标记一个DOM元素 一个类组件（函数组件没有实例 一般不能被ref标记）  
React底层逻辑会判断类型  
如果是DOM元素 会把真实DOM绑定在this.refs属性上  
如果是类组件 会把组件的实例绑定在this.refs属性上  

- ref属性是一个函数  
```javascript
class Children extends React.Component{  
    render=()=><div>hello,world</div>
}

export default class Index extends React.Component{
    currentDom = null
    currentComponentInstance = null
    componentDidMount(){
        console.log(this.currentDom)
        console.log(this.currentComponentInstance)
    }
    render=()=> <div>
        <div ref={(node)=> this.currentDom = node }>Ref模式获取元素或组件</div>
        <Children ref={(node) => this.currentComponentInstance = node  } />
    </div>
}
```
当用一个函数来标记ref的时候 将作为callback形式 等到真实DOM创建阶段执行callback 获取的DOM元素或组件实例 将以回调函数第一个参数形式传入 所以可以像上述代码片段中用组件实例下的属性currentDom和currentComponentInstance来接收真实DOM和组件实例  

- ref属性是一个ref对象  
```javascript
class Children extends React.Component{  
    render=()=><div>hello,world</div>
}

export default class Index extends React.Component{
    currentDom = React.createRef(null)
    currentComponentInstance = React.createRef(null)
    componentDidMount(){
        console.log(this.currentDom)
        console.log(this.currentComponentInstance)
    }
    render=()=> <div>
         <div ref={ this.currentDom }>Ref对象模式获取元素或组件</div>
        <Children ref={ this.currentComponentInstance } />
   </div>
}
```
在ref对象的current属性下访问  

### ref的高阶用法  

- forwardRef转发ref  
  forwardRef的初衷就是解决ref不能跨层级捕获和传递的问题 forwardRef接受了父级元素标记的ref信息 并把它转发下去 使得子组件可以通过props来接受到上一层级或者是更上层级的ref  
  
1. 跨层级获取  
场景：想要在 GrandFather 组件通过标记 ref ，来获取孙组件 Son 的组件实例。  
forwardRef 把 ref 变成了可以通过 props 传递和转发  
2. 合并转发ref  
场景：想通过Home绑定ref，来获取子组件Index的实例index，dom元素button，以及孙组件Form的实例  
forwardRef让ref可以通过props传递 那么如果用ref对象标记的ref ref对象就可以通过props的形式提供给子孙组件消费  
当然子孙组件也可以改变ref对象里面的属性或者赋予新的属性 这种forwardRef+ref模式一定程度上打破了React单向数据流动的原则  
当然绑定在ref对象上的属性 不限于组件实例或者DOM元素 也可以是属性值或方法  
3. 高阶组件转发  
如果通过高阶组件包裹一个原始类组件就会产生一个问题 如果高阶组件HOC没有处理ref 那么由于高阶组件本身会返回一个新组件 所以当使用HOC包装后组件的时候 标记的ref会指向HOC返回的组件 
而并不是HOC包裹的原始类组件 为了解决这个问题forwardRef可以对HOC做一层处理  

- ref实现组件通信  
不通过父组件render改变props的方式来触发子组件的更新 也就是子组件通过state单独管理数据层 针对这种情况父组件可以通过ref模式标记子组件实例 从而操作子组件方法  
这种情况通常发生在一些数据层托管的组件上 比如antd的form表单 暴露对外的resetFields setFieldValue等接口 可以通过表单实例调用这些API  

1. 类组件ref  
对于类组件可以通过ref直接获取组件实例 实现组件通信  

2. 函数组件 forwardRef+useImperativeHandle
对于函数组件 本身没有实例 hooks提供了useImperativeHandle 
useImperativeHandle 接受三个参数：  
第一个参数 ref : 接受forWardRef传递过来的ref  
第二个参数 createHandle ：处理函数 返回值作为暴露给父组件的ref对象  
第三个参数 deps :依赖项deps 依赖项更改形成新的ref对象  

- 函数组件缓存数据  
函数组件每一次render 函数上下文会重新执行 如果视图层更新不依赖想要改变的数据 那边把数据放在state中 更新无疑是一种性能浪费  
useRef可以创建出一个ref对象 只要组件没有销毁 ref对象就一直存在 可以把一下不依赖于视图更新的数据存储到ref对象中  
这样做有两个好处  
    1. 能直接修改数据 不会造成函数组件冗余的更新作用  
    2. 如果有useEffect useMemo引用ref对象中的数据 无需将ref对象添加成dep依赖项 因为useRef始终指向一个内存空间 可以随时访问到变化后的值  

### ref原理  

- ref执行时机和处理逻辑  
ref的处理都是在commit阶段发生  
对于ref处理函数 React底层用两个方法处理 commitDetachRef和commitAttachRef  
demoRef中打印 一次为null(DOM更新之前) 一次为div(DOM更新之后) 就是分别调用了上述的方法  
第一阶段： 一次更新中 在commit的mutation阶段 执行commitDetachRef 清空之前ref值 重置为null  
> react-reconciler/src/ReactFiberCommitWork.js
  
```javascript
function commitDetachRef(current: Fiber) {
  const currentRef = current.ref;
  if (currentRef !== null) {
    if (typeof currentRef === 'function') { /* function 和 字符串获取方式。 */
      currentRef(null); 
    } else {   /* Ref对象获取方式 */
      currentRef.current = null;
    }
  }
}
```
第二阶段：DOM更新阶段 根据不同的effectTag 真实的操作DOM  
第三阶段：layout阶段 在更新真实元素节点之后 更新ref  
这一阶段主要判断ref获取的是组件还是DOM元素标签 然后根据不同的获取ref的方式 对ref进行更新
> react-reconciler/src/ReactFiberCommitWork.js
  
```javascript
function commitAttachRef(finishedWork: Fiber) {
  const ref = finishedWork.ref;
  if (ref !== null) {
    const instance = finishedWork.stateNode;
    let instanceToUse;
    switch (finishedWork.tag) {
      case HostComponent: //元素节点 获取元素
        instanceToUse = getPublicInstance(instance);
        break;
      default:  // 类组件直接使用实例
        instanceToUse = instance;
    }
    if (typeof ref === 'function') {
      ref(instanceToUse);  //* function 和 字符串获取方式。 */
    } else {
      ref.current = instanceToUse; /* function 和 字符串获取方式。 */
    }
  }
}
```

### ref的处理特性  
React被ref标记的fiber 不会每一次更新都调用commitDetachRef和commitAttachRef 只有在ref更新的时候才会调用  

- 更新ref  
在commit阶段 commitDetachRef和commitAttachRef执行的条件  
commitDetachRef调用时机  
> react-reconciler/src/ReactFiberWorkLoop.js
  
```javascript
function commitMutationEffects(){
     if (effectTag & Ref) {
      const current = nextEffect.alternate;
      if (current !== null) {
        commitDetachRef(current);
      }
    }
}
```
commitAttachRef调用时机  
> react-reconciler/src/ReactFiberWorkLoop.js

```javascript
function commitLayoutEffects(){
     if (effectTag & Ref) {
      commitAttachRef(nextEffect);
    }
}
```
只有含有Ref tag的时候 才会执行更新ref  

> react-reconciler/src/ReactFiberBeginWork.js
  
```javascript
function markRef(current: Fiber | null, workInProgress: Fiber) {
  const ref = workInProgress.ref;
  if (
    (current === null && ref !== null) ||      // 初始化的时候
    (current !== null && current.ref !== ref)  // ref 指向发生改变
  ) {
    workInProgress.effectTag |= Ref;
  }
}
```

markRef方法执行的两种情况  
- 类组件的更新过程中  
- 更新HostComponent的时候  
markRef会在以下两种情况下给effectTag标记Ref 只有标记了Ref tag才会有后续的commitAttachRef和commitDetachRef流程  
- 第一种 current === null && ref !== null 就是在fiber初始化的时候 第一次ref处理的时候 是一定要标记Ref的  
- 第二种 current !== null && current.ref !== ref 就是fiber更新的时候 ref对象的指向变了  
只有在Ref tag存在的时候才会更新ref  

- 卸载ref  
被卸载的fiber会被大成Deletion effect tag 然后在commit阶段会进行commitDeletion流程  
对于有ref标记的类组件和HostComponent 会统一走safelyDetachRef流程 这个方法就是用来卸载ref  
> react-reconciler/src/ReactFiberCommitWork.js
  
```javascript
function safelyDetachRef(current) {
  const ref = current.ref;
  if (ref !== null) {
    if (typeof ref === 'function') {  // 函数式 ｜ 字符串
        ref(null)
    } else {
      ref.current = null;  // ref 对象
    }
  }
}
```
对于字符串和函数类型的ref 会执行传入null 置空ref  
对于ref对象类型 会清空ref对象上的current属性  

### 问答  
问： 为什么ref='node'字符串 会按照函数方式处理  
答： 因为当ref为字符串时 React会自动绑定一个函数来处理ref逻辑 会被绑定在组件实例的refs属性下面  
> react-reconciler/src/ReactChildFiber.js
  
```javascript
const ref = function(value) {
    let refs = inst.refs;
    if (refs === emptyRefsObject) {
        refs = inst.refs = {};
    }
    if (value === null) {
        delete refs[stringRef];
    } else {
        refs[stringRef] = value;
    }
};
```
