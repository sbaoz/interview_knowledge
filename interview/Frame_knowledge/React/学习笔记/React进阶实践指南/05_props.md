### props是什么  
- props可以是什么  
1. 作为子组件渲染数据源  
2. 作为通知父组件的回调函数  
3. 作为单纯的组件传递  
4. 作为渲染函数  
5. render props 和4的区别是放在children属性上  
6. render component插槽组件 也是放在children属性上  

### props能做什么  
- 在React组件层级props充当的角色  
1. 父组件可以把props传递给子组件去渲染  
2. 子组件可以通过props中的回调函数 向父组件传递信息  
3. 将视图容器作为props进行渲染  
- 在React更新机制中props充当的角色  
在fiber调和阶段 diff可以说是React更新的驱动器 props可以作为组件是否更新的重要准则 变化即更新  
于是有了PureComponent、memo等性能优化方案  
- 在React插槽层面props充当的角色  
React可以把组件的闭合标签里面的插槽转换成children属性  

### 监听props改变  
- 类组件  
componentWillReceiveProps可以作为监听props的生命周期 但是已经不推荐使用 未来版面可能会废弃  
因为这个生命周期超越了React可控制的范围 可能引起多次执行等情况  
getDerivedStateFromProps作为替代方案  
- 函数组件  
用useEffect作为props改变后的监听函数  

### props children模式  
- props插槽组件  
```javascript
<Container>
    <Children />
</Container>
```
上述可以在Container组件中 通过props.children属性访问到Children组件 为React element对象  
作用：  
1. 可以根据需要控制Children是否渲染  
2. Container可以用React.cloneElement强化props 或者修改Children的子元素  
- render props模式  
```javascript
<Container>
   { (ContainerProps)=> <Children {...ContainerProps}  /> }
</Container>

function  Container(props) {
    const  ContainerProps = {
        name: 'alien',
        mes:'let us learn react'
    }
    return  props.children(ContainerProps)
}
```
作用：  
1. 可以根据需要控制Children是否渲染  
2. 可以将需要传给 Children 的 props 直接通过函数参数的方式传递给执行函数 children  
- 混合模式  
```javascript
<Container>
    <Children />
    { (ContainerProps)=> <Children {...ContainerProps} name={'haha'}  />  }
</Container>
```
Container的children既有函数也有组件 处理方式参考[demo](interview/Frame_knowledge/React/demo/src/pages/React进阶实践指南Demo/05/props_children混合模式.jsx)
### 操作props小技巧  
- 抽象props
- 混入props
- 抽离props
- 显示注入props
- 隐式注入props
> 参考demo
