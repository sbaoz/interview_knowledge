import React from 'react';

function ChildrenComponent() {
    return (
        <div>ChildrenComponent</div>
    )
}

class PropsComponent extends React.Component {
    componentDidMount() {
        console.log('this: ', this);
    }

    render() {
        const { children, mes, renderName, say, Component } = this.props;
        const [renderFunction, renderComponent] = children;
        // 子组件中不同的props的处理方式
        return (
            <div>
                {renderFunction()}
                {mes}
                {renderName()}
                {renderComponent}
                <Component />
                <button onClick={() => say()}>change content</button>
            </div>
        )
    }
}

export default class Index extends React.Component {
    state = {
        mes: 'hello, React'
    };
    say = () => this.setState({mes: 'let us learn React!'});
    render() {
        return (
            <div>
                <PropsComponent
                    mes={this.state.mes} // 作为渲染数据源
                    say={this.say} // 作为通知父组件的回调函数
                    Component={ChildrenComponent} // 作为单纯的组件传递
                    renderName={() => <div>renderName</div>} // 作为渲染函数
                >
                    { () => <div>renderProps in children</div> } {/* children中的render props */}
                    <ChildrenComponent /> {/* render component插槽组件 */}
                </PropsComponent>
            </div>
        )
    }
}
