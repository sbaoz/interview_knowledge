import React from 'react';
import {GlobalContext} from '../../../App';

export default class Index extends React.Component {
    // 可以用this.context来消费最近的Context上的值
    static contextType = GlobalContext;

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
            c: []
        };
        this.changeParam = this.changeParam.bind(this);
        this.divRef = React.createRef();
        this.ulRef = React.createRef();
        console.log('render阶段 组件初始化 constructor', props, context);
    }

    /*
    * getDerivedStateFromProps的作用
    * 1. 在初始化和更新阶段接收父组件的props数据 可以对props进行格式化、过滤等操作
    *    返回值将作为新的state合并到state中 供给视图渲染层消费
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
        } else if (nextProps.match.params.param == prevState.a) {
            return {
                b: prevState.b ? prevState.b + '*' : 'return in getDerivedStateFromProps',
            }
        }
        return null;
    }

    /*
    * 1. getSnapshotBeforeUpdate在commit阶段执行
    * 2. 返回值作为componentDidUpdate的第三个参数 解决render阶段和commit阶段之间可能存在的延迟
    * */
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('commit阶段:before_mutation 组件更新 getSnapshotBeforeUpdate', prevProps, prevState);
        return {
            divColor: this.divRef.current.style.color,
            ulScrollHeight: this.ulRef.current.scrollHeight - this.ulRef.current.scrollTop
        };
    }

    /*
    * 1. 返回值决定是否继续执行render函数 调和子节点
    * 2. 三个参数
    *  2.1 nextProps: 新的props
    *  2.2 nextState: 新的state
    *  2.3 nextContext: 新的context
    * */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('render阶段 组件更新 shouldComponentUpdate', nextProps, nextState, nextContext);
        if (nextState.a % 2 === 0) {
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
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('render阶段 组件更新 componentWillReceiveProps', nextProps, nextContext);
    }

    /*
    * 如果存在getDerivedStateFromProps和getSnapshotBeforeUpdate就不会执行componentWillMount
    * componentWillMount将被废弃
    * */
    componentWillMount() {
        console.log('render阶段 组件初始化 componentWillMount');
    }

    /*
    * 1. 存在getDerivedStateFromProps时不会执行
    * componentWillUpdate将被废弃
    * */
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('render阶段 组件更新 componentWillUpdate', nextProps, nextState, nextContext);
    }

    /*
    * React调和玩所有的fiber节点 到commit阶段 在组件初始化commit阶段 会调用componentDidMount
    * */
    componentDidMount() {
        console.log('commit阶段:layout 组件初始化 componentDidMount');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('commit阶段:layout 组件更新 componentDidUpdate', prevProps, prevState, snapshot);
        this.divRef.current.style.color = snapshot.divColor === 'red' ? 'blue' : 'red';
        this.ulRef.current.scrollTop = this.ulRef.current.scrollHeight - snapshot.ulScrollHeight;

    }

    changeParam() {
        this.props.history.push(`/${this.state.a + 1}`);
        // this.setState(state => {
        //     return {
        //         a: state.a + 1
        //     }
        // });
    }

    render() {
        console.log('render');
        console.log('this.context', this.context);
        return (
            <div>
                React生命周期
                <div>
                    state.a: {this.state.a}
                </div>
                <div ref={this.divRef}>
                    state.b: {this.state.b}
                </div>
                <div>
                    state.c:
                    <ul ref={this.ulRef} style={{maxHeight: '100px', overflow: 'auto'}}>
                        {
                            this.state.c.map(item => <li>{item}</li>)
                        }
                    </ul>
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
                <div>
                    <button onClick={this.changeParam}>changeParam</button>
                </div>
            </div>);
    }
}
