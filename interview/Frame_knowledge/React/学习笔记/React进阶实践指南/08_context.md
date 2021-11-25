# context  

# 老版本context

- 老版本提供者 
在v16.3.0之前 React用PropTypes来声明context类型 提供者需要getChildContext来返回需要提供的context  
并且用静态属性childContextTypes声明需要提供的context数据类型 声明类型需要propsTypes库来助力  
```javascript
// 提供者
import propsTypes from 'proptypes'
class ProviderDemo extends React.Component{ 
    getChildContext(){
        const theme = { /* 提供者要提供的主题颜色，供消费者消费 */
            color:'#ccc',
            background:'pink'
        }
        return { theme }
    }
    render(){
        return <div>
            hello,let us learn React!
            <Son/>
        </div>
    }
 }

ProviderDemo.childContextTypes = {
    theme:propsTypes.object
}
```

- 老版本消费者  
```javascript
// 消费者
class ConsumerDemo extends React.Component{
   render(){
       console.log(this.context.theme) // {  color:'#ccc',  bgcolor:'pink' }
       const { color , background } = this.context.theme
       return <div style={{ color,background } } >消费者</div>
   }
}
ConsumerDemo.contextTypes = {
    theme:propsTypes.object
}

const Son = ()=> <ConsumerDemo/>
```
作为消费者 需要在组件的静态属性指明我到底需要哪个提供者提供的状态  
在demo项目中 ConsumerDemo的contextTypes明确的指明了需要ProviderDemo提供的theme信息  
然后就可以通过this.context.theme访问到theme用做渲染消费  

### 新版本context基本使用  
v16.3.0之后 context api正式发布 可以直接用createContext创建出一个context上下文对象  
context对象提供两个组件 Provider和Consumer作为新的提供者和消费者 这种context模式更便捷的传递context  

- createContext  
基本用法  
```javascript
const ThemeContext = React.createContext(null)
const ThemeProvider = ThemeContext.Provider  //提供者
const ThemeConsumer = ThemeContext.Consumer // 订阅消费者
```
createContext接收一个参数 作为初始化context的内容 返回一个context对象  
context对象上的Provider作为提供者 Consumer作为消费者  

- 新版本提供者  
```javascript
const ThemeProvider = ThemeContext.Provider  //提供者
export default function ProviderDemo(){
    const [ contextValue , setContextValue ] = React.useState({  color:'#ccc', background:'pink' })
    return <div>
        <ThemeProvider value={ contextValue } > 
            <Son />
        </ThemeProvider>
    </div>
}
```
provider作用  
- value属性传递context 供给consumer使用  
- value属性改变ThemeProvider会让消费Provider value的组件重新渲染  

- 新版本消费者  
1. 类组件contextType方式  
类组件的静态属性contextType 指向需要获取的context 就可以方便获取到最近一层Provider提供的contextValue值  
2. 函数组件useContext方式  
v16.8 hooks提供了useContext 函数组件可以快捷获取context  
useContext接受一个参数 就是想要获取的context 返回一个值 就是最近的provider提供contextValue值  
3. Consumer订阅消费者方式  
Consumer订阅者采取render props方式 接受最近一层provider中value属性作为render props函数的参数  
可以将参数取出来 作为props混入组件  

- 动态context  
Provider的value改变 会引起contextType、useContext消费该context的组件重新render 同样会使Consumer的children函数重新执行  

- 其他API  
1. displayName  
context对象接受一个名为displayName的属性 类型为字符串  
React DevTools使用该字符串来确定context要显示的内容  

### context高阶用法  
- 嵌套Provider  
多个Provider之间可以互相嵌套 来保存/切换一些全局数据  

- 逐层传递Provider  
Provider还有一个良好的特性就是可以逐层传递context 也就是一个context可以用多个Provder传递  
下一层级的Provider会覆盖上一层级的Provider  
React-redux中connect就是用这个良好特性传递订阅器的  

- Provider特性总结  
1. Provider作为提供者传递context provider中value属性改变会使所有消费context的组件重新更新
2. Provider可以逐层传递context 下一层Provider会覆盖上一层Provider

### 问答  
问：如何阻止Provider value改变造成的子组件的不必要的渲染
答：  
1. 利用memo、pureComponent对子组件props进行浅比较  
2. 利用useMemo对React element对象进行缓存  
React每次执行render都会调用createElement形成新的React element对象  
如果把它缓存下来 下一次调和更新的时候就会跳过该对象对应fiber的更新  

问：context与props和react-redux的对比  
答：  
context解决了  
- props需要每一层都要手动添加的问题  
- 改变value 组件全部重新渲染的问题(需要加上memo等限制处理)  

