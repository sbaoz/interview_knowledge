# class组件中的state

### setState  
setState(obj, callback)  
第一个参数：当 obj 为一个对象，则为即将合并的 state ；如果 obj 是一个函数，那么当前组件的 state 和 props 将作为参数，返回值用于合并新的 state。  
第二个参数：callback 为一个函数，函数执行上下文中可以获取当前 setState 更新后的最新 state 的值，可以作为依赖 state 变化的副作用函数，可以用来做一些基于 DOM 的操作。

### setState的流程  
1.setState产生当前更新的优先级（expirationTime/lane）
expirationTime: 为防止某个update因为优先级的原因一直被打断而未能执行 React会设置一个expirationTime 当时间到了expirationTime的时候 会强制执行该update  
2.从fiber根部向下调和子节点 调和阶段将对比发生更新的地方 更新对比expirationTime 找到发生更新的组件 合并state 然后出发render函数 得到新的UI视图层 完成render阶段  
3.commit阶段 替换真实DOM 完成更新流程  
4.执行setState中的callback 完成一次setState过程  

### setState原理 
class组件初始化过程中绑定了负责更新的Updater对象 调用setState方法 实际上是React底层调用Updater对象上的enqueueSetState方法  
- enqueueSetState做了些什么  
创建一个update 然后放入当前fiber对象的等待更新队列中 最后开启调度更新 进入setState更新流程
- React底层是如何进行批量更新的  
正常state更新、UI交互都离不开用户的事件 React是采用事件合成的形式 每一个事件都是由React事件系统统一调度 State批量更新和事件系统息息相关  
在legacy模式下 所有的事件都是经过dispatchEventForLegacyPluginEventSystem函数统一处理  
在batchedEventUpdates方法中 通过 isBatchingEventUpdates = true; 开启批量更新  
当该事件结束时 再通过 isBatchingEventUpdates = false; 关闭批量更新  
在scheduleUpdateOnFiber函数中根据这个开关来确定是否进行批量更新  
  
# function组件中的state

### useState
React Hooks发布之后 useState可以使function组件像class组件一样拥有state  

- 基本用法  
```javascript
[state, dispatch] = useState(initData)
```
1. state: 提供给UI 作为渲染视图的数据源  
2. dispatch: 改变state的函数 触发function组件的渲染 可以是指 也可以是函数
   ```javascript
   const [number, setNumber] = useState(0)
   const handleClick = () => {
        setNumber(1)
        setNumber(state => state + 1) // 参数state为上一次的state 返回值作为新的state
   }
   ```
3. initData：可以是值 也可以是函数 函数的返回值作为useState的初始值
   ```javascript
    // initData为函数
    const [number, setNumber] = useState(() => {
        if (props.a === 1) return 1 
        if (props.a === 2) return 2 
        return 3 
   })
   ```
- 如何监听state变化  
class组件中的setState 可以利用callback或者componentDidUpdate 监听state或者组件的更新  
function组件中可以利用useEffect实现 把需要监听的state作为依赖项传入useEffect的第二个参数deps中  
- useState注意事项  
在使用dispatch更新state时 如果传入的state和之前的state相同 视图不会更新  
因为dispatch的处理逻辑中会浅比较两次state 如果相同则不会开启更新调度任务  
### useState原理  
todo

### 问答  
问：class组件如何限制state更新视图  
答：1.pureComponent可以对state和props进行浅比较 如果没有发生变化 那么组件不更新  
2.shouldComponentUpdate生命周期可以通过判断前后state变化来决定组件需不需要更新 需要更新返回true 否则返回false  
问：事件中异步操作的setState和普通的setState有什么区别  
答：异步的setState的执行上下文不同 异步时React的事件系统函数已经执行完毕 批量更新的开关已经关闭
所以不能进行批量更新 而是每个setState都会触发渲染流程
问：那么如何在异步环境下 继续开启批量更新呢  
答：React-Dom中提供了批量更新的方法unstable_batchedUpdates 可以手动批量更新  
```javascript
import ReactDOM from 'react-dom'
const { unstable_batchedUpdates } = ReactDOM

setTimeout(()=>{
    unstable_batchedUpdates(()=>{
        this.setState({ number:this.state.number + 1 })
        console.log(this.state.number)
        this.setState({ number:this.state.number + 1})
        console.log(this.state.number)
        this.setState({ number:this.state.number + 1 })
        console.log(this.state.number) 
    })
})
```
实际工作中unstable_batchedUpdates可以用于异步数据交互之后 合并多次setState或者useState 减少视图渲染的次数
问：那么如何可以提升更新的优先级呢  
答：React-Dom提供了flushSync方法  
```javascript
handerClick=()=>{
    setTimeout(()=>{
        this.setState({ number: 1  })
    })
    this.setState({ number: 2  })
    ReactDOM.flushSync(()=>{
        this.setState({ number: 3  })
    })
    this.setState({ number: 4  })
}
render(){
   console.log(this.state.number) // 3 4 1
   return ...
}
```
React 同一级别更新优先级关系是:
flushSync 中的 setState > 正常执行上下文中 setState > setTimeout ，Promise 中的 setState。
问：为什么function组件中 当调用dispatch改变state 在本次执行时获取不到最新的state值  
答：因为function组件更新就是函数的执行 在函数一次执行过程中 内部所有变量重新声明 所有改变的state 只有在下一次function组件执行时才会被更新  
问：setState和useState有什么异同  
答：  
相同点：  
首先从原理角度出发，setState和 useState 更新视图，底层都调用了 scheduleUpdateOnFiber 方法，而且事件驱动情况下都有批量更新规则  
不同点：  
1. 在不是 pureComponent 组件模式下， setState 不会浅比较两次 state 的值，只要调用 setState，在没有其他优化手段的前提下，就会执行更新。但是 useState 中的 dispatchAction 会默认比较两次 state 是否相同，然后决定是否更新组件。  
2. setState 有专门监听 state 变化的回调函数 callback，可以获取最新state；但是在函数组件中，只能通过 useEffect 来执行 state 变化引起的副作用。  
3. setState 在底层处理逻辑上主要是和老 state 进行合并处理，而 useState 更倾向于重新赋值。
