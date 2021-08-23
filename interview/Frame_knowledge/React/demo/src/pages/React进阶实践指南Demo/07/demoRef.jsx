import React from 'react';

export default class Index extends React.Component {
    state = {
        num: 8,
        isShow: true
    };
    node1 = null;
    node2 = null;
    node3 = null;
    getDom = ref => {
        this.node2 = ref;
        // 此时ref指向相同的函数getDom 所以更新的时候就不会打印了
        console.log('此时的参数是什么2', this.node2);
    };
    render() {
        return (
            <div>
                <div ref={(ref) => {
                    this.node1 = ref;
                    // 会打印两次是因为每一次更新的时候 都给ref赋值了新的函数
                    // 在markRef中会判断成current.ref !== ref
                    console.log('此时的参数是什么1', this.node1);
                }}>ref元素节点1</div>
                <div ref={this.getDom}>ref元素节点2</div>
                {
                    this.state.isShow && <div ref={(ref) => {
                        this.node3 = ref;
                        console.log('此时的参数是什么3', this.node3);
                    }}>ref元素节点3</div>
                }
                <button onClick={() => this.setState({num: this.state.num + 1})}>click</button>
                <button onClick={() => this.setState({isShow: !this.state.isShow})}>clickShow</button>
            </div>
        )
    }
}
