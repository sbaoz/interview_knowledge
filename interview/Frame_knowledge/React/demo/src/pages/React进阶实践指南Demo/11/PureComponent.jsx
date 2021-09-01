import React from 'react';

class Children extends React.PureComponent {
    state = {
        name: 'react',
        age: 1,
        obj: {
            number: 1
        }
    };
    changeObjNumber = () => {
        const {obj} = this.state;
        obj.number++;
        this.setState({obj});
    }
    render() {
        console.log('组件渲染');
        return (
            <div>
                <div>组件本身改变state</div>
                <button onClick={() => this.setState({name: 'react'})}>state相同</button>
                <button onClick={() => this.setState({age: this.state.age + 1})}>state不同</button>
                <button onClick={this.changeObjNumber}>state为引用数据类型</button>
            </div>
        )
    }
}

export default function Home() {
    const [numberA, setNumberA] = React.useState(0);
    const [numberB, setNumberB] = React.useState(0);
    return (
        <div>
            <div>父组件改变props</div>
            <button onClick={() => setNumberA(numberA + 1)}>改变numberA</button>
            <button onClick={() => setNumberB(numberB + 1)}>改变numberB</button>
            <Children number={numberA} />
        </div>
    );
}