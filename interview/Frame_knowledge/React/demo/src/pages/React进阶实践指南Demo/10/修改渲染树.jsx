import React from 'react';

class Index extends React.Component {
    render() {
        return (
            <ul>
                <li>React</li>
                <li>React</li>
                <li>React</li>
            </ul>
        )
    }
}

const HOC = (WrapComponent) => {
    return class Wrap extends WrapComponent {
        render() {
            const element = super.render();
            const otherChild = React.createElement('li', {}, 'hello world');
            const newChild = React.Children.map(element.props.children, (child, index) => {
                if (index === 2) {
                    return otherChild;
                }
                return child;
            });
            return React.cloneElement(element, {...element.props, ...this.props}, newChild);
        }
    }
}

const HOCIndex = HOC(Index);

export default (props) => {
    return <HOCIndex {...props} />
}
