import React from 'react';

export default class Index extends React.Component {
    /*
    * constructor的作用
    * 1. 初始化state 比如可以用来截取路由中的参数 赋值给state
    * 2. 对类组件的事件做一些处理 比如绑定this 节流 防抖等
    * 3. 对类组件进行一些必要生命周期的劫持 渲染劫持 参考反向继承的HOC
    * */
    constructor(props) {
        super(props);
        this.state = {
            a: props.match.params.param || ''
        };
        this.changeParam = this.changeParam.bind(this);
        console.log('render阶段 组件初始化 constructor');
    }

    /*
    * getDerivedStateFromProps的作用
    * 1. 在初始化和更新阶段接收父组件的props数据 可以对props进行格式化、过滤等操作
    * 返回值将作为新的state合并到state中 供给视图渲染层消费
    * 2. 两个参数
    *   2.1 nextProps：父组件新传递的props
    *   2.2 prevState：组件在此次更新前的state
    * 3. 作为类的静态属性方法执行 内部是访问不到this的 更趋向于纯函数
    * 4. 在生命周期定义为取缔componentWillMount和componentWillReceiveProps
    * */
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('render阶段 组件初始化/更新 getDerivedStateFromProps', nextProps, prevState);
        if (nextProps.match.params.param !== prevState.a) {
            return {
                a: nextProps.match.params.param
            }
        }
        return null;
    }

    /*
    * 如果存在getDerivedStateFromProps和getSnapshotBeforeUpdate就不会执行componentWillMount
    * componentWillMount将被废弃
    * */
    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    changeParam() {
        console.log('handleClick', this.props);
        this.props.history.push(`/${Math.floor(Math.random()*100+1)}`);
    }

    render() {
        console.log('render');
        return (
            <div>
                React生命周期
                <div>
                    state.a: {this.state.a}
                </div>
                <div>
                    <button onClick={this.changeParam}>changeParam</button>
                </div>
            </div>);
    }
}
