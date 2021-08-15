import React from 'react';
import Routes from '../../../router';

const GlobalContext = React.createContext('');

class Child extends React.Component {
    // 可以用this.context来消费最近的Context上的值
    static contextType = GlobalContext;

    constructor(props, context) {
        super(props);
        this.state = {
            color: ''
        }
        console.log('子组件 render阶段 组件初始化 constructor', props, context);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        console.log('子组件 render阶段 组件更新 componentWillReceiveProps', nextProps, nextContext);
        setTimeout(() => {
            if (nextProps.f % 2) {
                this.setState({
                    color: 'blue'
                });
            } else {
                this.setState({
                    color: 'red'
                });
            }
        });
    }

    render() {
        console.log('子组件 render');
        console.log('this.context', this.context);

        return (
            <>
                <div style={{color: this.state.color}}>
                    Child_prop.f：{this.props.f}
                </div>
                <GlobalContext.Consumer>
                    {
                        (globalContext) => {
                            console.log('GlobalContext.Consumer', globalContext);
                            return (
                                <div>
                                    context: {globalContext}
                                </div>
                            );
                        }
                    }
                </GlobalContext.Consumer>
            </>
        )
    }
}

export default class Index extends React.Component {
    /*
    * constructor的作用
    * 1. 初始化state 比如可以用来截取路由中的参数 赋值给state
    * 2. 对类组件的事件做一些处理 比如绑定this 节流 防抖等
    * 3. 对类组件进行一些必要生命周期的劫持 渲染劫持 参考反向继承的HOC
    * */
    constructor(props, context) {
        super(props);
        this.state = {
            a: parseInt(props.match.params.param),
            c: [],
            d: 0,
            globalContext: 'globalContext'
        };
        this.changeUrlParam = this.changeUrlParam.bind(this);
        this.divRef = React.createRef();
        this.ulRef = React.createRef();
        this.e = 'lalala';
        console.log('render阶段 组件初始化 constructor', props, context);
    }

    /*
    * 从props中得到派生的state
    * 1. 在初始化和更新阶段接收父组件的props数据 可以对props进行格式化、过滤等操作
    *    在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
    *    返回值将作为新的state合并到state中 供给视图渲染层消费
    *    props改变 setState forceUpdate都会触发
    * 2. 两个参数
    *   2.1 nextProps：父组件新传递的props
    *   2.2 prevState：组件在此次更新前的state
    * 3. 作为类的静态属性方法执行 内部是访问不到this的 更趋向于纯函数
    * 4. 在生命周期定义为取缔componentWillMount和componentWillReceiveProps
    * */
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('render阶段 组件初始化/更新 getDerivedStateFromProps', nextProps, prevState);
        if (nextProps.match.params.param != prevState.a) {
            return {
                a: parseInt(nextProps.match.params.param) ,
                b: prevState.b ? prevState.b + '!' : 'return in getDerivedStateFromProps',
                c: prevState.c.concat(parseInt(nextProps.match.params.param))
            }
        }
        return null;
    }

    /*
    * 获取更新前的快照
    * 1. getSnapshotBeforeUpdate在commit阶段的before Mutation（DOM修改前）执行
    *    此时DOM还没有更新 在接下来的Mutation阶段会被替换成真实DOM 此时是获取DOM信息的最佳时期
    * 2. 两个参数
    *   2.1 prevProps: 更新前的props
    *   2.2 prevState：更新前的state
    * 3. 返回值作为componentDidUpdate的第三个参数 解决render阶段和commit阶段之间可能存在的延迟
    * */
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('commit阶段:before_mutation 组件更新 getSnapshotBeforeUpdate', prevProps, prevState);
        // dom更新前的信息
        return {
            divColor: this.divRef.current.style.color,
            ulScrollHeight: this.ulRef.current.scrollHeight - this.ulRef.current.scrollTop
        };
    }

    /*
    * 1. 返回值决定是否继续执行render函数 调和子节点
    * 2. 三个参数
    *  2.1 nextProps: 新的props
    *  2.2 nextState: 新的state 通过getDerivedStateFromProps合并
    *  2.3 nextContext: 新的context
    * */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('render阶段 组件更新 shouldComponentUpdate', nextProps, nextState, nextContext);
        console.log(this.state.d, nextState.d);
        if (nextState.a % 2 === 0 || (this.state.d !== nextState.d)) {
            return true;
        }
        return false;
    }

    /*
    * 1. getDerivedStateFromProps不存在就执行componentWillReceiveProps
    * 2. 两个参数
    *   2.1 nextProps：父组件新传递的props
    *   2.2 nextContext：父组件新传递的context
    * componentWillReceiveProps将被废弃
    * */
    // UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    //     console.log('render阶段 组件更新 componentWillReceiveProps', nextProps, nextContext);
    // }

    /*
    * 如果存在getDerivedStateFromProps和getSnapshotBeforeUpdate就不会执行componentWillMount
    * UNSAFE_componentWillMount将被废弃
    * */
    // componentWillMount() {
    //     console.log('render阶段 组件初始化 componentWillMount');
    // }

    /*
    * 1. 存在getDerivedStateFromProps时不会执行
    * componentWillUpdate将被废弃
    * */
    // UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
    //     console.log('render阶段 组件更新 componentWillUpdate', nextProps, nextState, nextContext);
    // }

    /*
    *   在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。
    *   componentWillUnmount() 中不应调用 setState()，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它
    * */
    componentWillUnmount() {
        console.log('commit阶段：组件销毁 componentWillUnmount');
    }

    /*
    * React调和玩所有的fiber节点 到commit阶段 在组件初始化commit阶段 会调用componentDidMount
    * */
    componentDidMount() {
        console.log('commit阶段:layout 组件初始化 componentDidMount');
    }

    /*
    * 1. 此时DOM已经修改完成 可以操作修改之后的DOM
    * 2. 三个参数
    *   2.1 prevProps：更新之前的props
    *   2.2 prevState：更新之前的state
    *   2.3 snapshot：getSnapshotBeforeUpdate返回的快照结果
    * 3. 这个函数里面如果想要使用setState ，一定要加以限制，否则会引起无限循环
    * */
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('commit阶段:layout 组件更新 componentDidUpdate', prevProps, prevState, snapshot);
        this.divRef.current.style.color = snapshot.divColor === 'red' ? 'blue' : 'red';
        this.ulRef.current.scrollTop = this.ulRef.current.scrollHeight - snapshot.ulScrollHeight;
    }

    changeUrlParam() {
        this.props.history.replace(`/${this.state.a + 1}`);
    }

    changeState = () => {
        this.setState(state => {
            return {
                d: state.d + 1
            }
        });
    }

    destroy = () =>  {
        this.props.history.push(`/`);
    }

    changeE() {
        this.e += '!';
        // 默认情况下，当组件的 state 或 props 发生变化时，组件将重新渲染。如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染。
        // 调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。
        // 但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。
        // 通常你应该避免使用 forceUpdate()，尽量在 render() 中使用 this.props 和 this.state。
        this.forceUpdate();
    }

    render() {
        console.log('render');
        return (
            <GlobalContext.Provider value={this.state.globalContext}>
                <div>
                    React类组件生命周期
                    <div>
                        state.a: {this.state.a}
                    </div>
                    <div ref={this.divRef}>
                        state.b: {this.state.b}
                    </div>
                    <div>
                        state.c:
                        <ul ref={this.ulRef} style={{maxHeight: '88px', overflow: 'auto'}}>
                            {
                                this.state.c.map((item, index) => <li key={index}>{item}</li>)
                            }
                        </ul>
                    </div>
                    <div>
                        state.d: {this.state.d}
                    </div>
                    <div>
                        this.e: {this.e}
                    </div>
                    <Child f={this.state.d}/>
                    <div>
                        <button onClick={this.changeUrlParam}>changeUrlParam</button>
                    </div>
                    <div>
                        <button onClick={this.changeState}>changeState</button>
                    </div>
                    <div>
                        <button onClick={() => this.changeE()}>changeE</button>
                    </div>
                    <div>
                        <button onClick={() => this.destroy()}>destroy</button>
                    </div>
                </div>
                <button onClick={() => {
                    this.setState(state => {
                        return {
                            globalContext: state.globalContext + '!'
                        }
                    })
                }}>changeGlobalContext</button>
            </GlobalContext.Provider>);
    }
}
