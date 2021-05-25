import React from 'react';

function TextComp(props) {
    console.log('子组件渲染');
    return <div>hello,world</div>
}

const controlIsRender = (preProps, nextProps) => {
    if ((preProps.number === nextProps.number) ||
        (preProps.number !== nextProps.number && nextProps.number > 5)) {
        return true;
    }
    return false;
}

/*
* React.memo 是高阶组件
* 接受两个参数，第一个参数原始组件本身，第二个参数，可以根据一次更新中props是否相同决定原始组件是否重新渲染。
* true 证明组件无须重新渲染，false证明组件需要重新渲染，这个和类组件中的shouldComponentUpdate()正好相反
* 只能对props的情况确定是否渲染
* */
const TextCompWithMemo = React.memo(TextComp, controlIsRender);

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 1,
            number: 1
        }
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }

    render() {
        const { num, number } = this.state;
        return (
            <div>
                <div>
                    改变num：当前值 { num }
                    <button onClick={ ()=>this.setState({ num:num + 1 }) } >num++</button>
                    <button onClick={ ()=>this.setState({ num:num - 1 }) } >num--</button>
                </div>
                <div>
                    改变number： 当前值 { number }
                    <button onClick={ ()=>this.setState({ number:number + 1 }) } > number ++</button>
                    <button onClick={ ()=>this.setState({ number:number - 1 }) } > number -- </button>
                </div>
                <TextCompWithMemo num={ num } number={number}  />
            </div>
        )
    }
}

