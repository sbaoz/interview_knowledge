import React from 'react';

function Children() {
    console.log('子组件渲染');
    return <div>hello world</div>
}

const controlIsRender = (prev, next) => {
    return (prev.number === next.number) || (prev.number !== next.number && next.number > 5)
}

const ChildrenWithMemo = React.memo(Children, controlIsRender);

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1,
            num: 1
        }
    }
    render() {
        const {num, number} = this.state;
        return (
            <div>
                <div>
                    改变num：当前值{num}
                    <button onClick={() => this.setState({num: num + 1})}>num++</button>
                    <button onClick={() => this.setState({num: num - 1})}>num--</button>
                </div>
                <div>
                    改变number：当前值{number}
                    <button onClick={() => this.setState({number: number + 1})}>number++</button>
                    <button onClick={() => this.setState({number: number - 1})}>number--</button>
                </div>
                <ChildrenWithMemo num={num} number={number} />
            </div>
        )
    }
}
