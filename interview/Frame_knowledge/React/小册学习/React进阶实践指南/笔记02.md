###jsx会变成什么样子  
1. babel处理后 jsx元素节点会被编译成React.createElement的形式  
2. createElement处理后 被转换成React element对象  
3. 最终在调和阶段 React element对象的每个子节点会形成一个与之对应的fiber对象 通过sibling、return、child将每个fiber对象联系起来  

React针对不同React element对象会产生不同tag的fiber对象

###fiber对应关系  
* child：一个由父级fiber指向子级fiber的指针  
* return：一个由子级fiber指向父级fiber的指针  
* sibling：一个fiber指向下一个兄弟fiber对象的指针  

### 问答  
问：老版本的 React 中，为什么写 jsx 的文件要默认引入 React?  
答：因为 jsx 在被 babel 编译后，写的 jsx 会变成上述 React.createElement 形式，所以需要引入 React，防止找不到 React 引起报错。

问: React.createElement 和 React.cloneElement 到底有什么区别呢?
答: 可以完全理解为，一个是用来创建 element 。另一个是用来修改 element，并返回一个新的 React.element 对象。

### 相关API  
- React.createElement  
创建React element对象
React.createElement(
    type,
    [props],
    [...children]
)  
第一个参数：如果是组件类型，会传入组件对应的类或函数；如果是 dom 元素类型，传入 div 或者 span 之类的字符串。  
第二个参数：一个对象，在 dom 类型中为标签属性，在组件类型中为 props 。  
其他参数：依次为 children，根据顺序排列。  
- React.Children.toArray  
可以扁平化、规范化React element的children组成的数组 而且可以深层次flat  
- React.Children.forEach  
等同于React.Children.toArray + Array.prototype.forEach
- React.isValidElement  
可以用来检测是否为React element元素  
- React.cloneElement
React.cloneElement(
    reactElement,   
    [props],
    [...children]
)
以React element为样板克隆并返回新的React element  
返回元素的props是将新的props与原始元素的props浅合并后的结果
