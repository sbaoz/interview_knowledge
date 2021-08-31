import React from 'react';

function HOC(Component) {
    return class WrapComponent extends React.Component {
        constructor(props) {
            super(props);
            this.node = null;
        }
        componentDidMount() {
            this.node.changeColor();
        }
        render() {
            return <Component {...this.props} ref={ref => this.node = ref} />
        }
    }
}

@HOC
class Index extends React.Component {
    state = {color: ''};
    changeColor = () => {
        this.setState({color: 'red'});
    }
    render() {
        const {color} = this.state;
        return (
            <div style={{color}}>{this.props.content}</div>
        )
    }
}

export default () => {
    return <Index content='hello world' />
}
