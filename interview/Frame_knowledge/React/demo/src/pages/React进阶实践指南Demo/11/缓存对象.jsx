import React from 'react';

function Children({number}) {
    console.log('子组件渲染');
    return <div>let us learn React! {number}</div>
}

class Index1 extends React.Component {
    state = {
        numberA: 0,
        numberB: 0
    };
    component = <Children number={this.state.numberA} />
    controllComponentRender = () => {
        const {numberA} = this.state;
        const {props} = this.component;
        if (props.number !== numberA) { // 只有numberA变化的时候 重新创建element对象
            return this.component = React.cloneElement(this.component, {number: numberA});
        }
        return this.component;
    }
    render() {
        const {numberA, numberB} = this.state;
        return (
            <div>
                {this.controllComponentRender()}
                <button onClick={() => this.setState({numberA: numberA + 1})}>改变numberA-{numberA}</button>
                <button onClick={() => this.setState({numberB: numberB + 1})}>改变numberB-{numberB}</button>
            </div>
        )
    }
}

function Index2() {
    const [numberA, setNumberA] = React.useState(0);
    const [numberB, setNumberB] = React.useState(0);
    return (
        <div>
            {
                // 用useMemo可以达到上面类组件同样的效果
                React.useMemo(() => <Children number={numberA} />, [numberA])
            }
            <button onClick={() => setNumberA(numberA + 1)}>改变numberA-{numberA}</button>
            <button onClick={() => setNumberB(numberB + 1)}>改变numberB-{numberB}</button>
        </div>
    )
}

export default () => {
    return (
        <div>
            <Index1 />
            <Index2 />
        </div>
    )
}