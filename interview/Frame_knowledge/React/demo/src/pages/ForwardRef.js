import React from 'react';

function logProps(Component) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps, prevState, snapshot) {
            console.log('old props', prevProps);
            console.log('new props', this.props);
        }

        render() {
            const { forwardRef, ...rest } = this.props;
            return <Component ref={forwardRef} {...rest} />;
        }
    }

    function forwardRef(props, ref) {
        return <LogProps {...props} forwardRef={ref} />;
    }

    // 在 DevTools 中为该组件提供一个更有用的显示名。
    // 例如 “ForwardRef(logProps(MyComponent))”
    const name = Component.displayName || Component.name;
    forwardRef.displayName = `logProps(${name})`;

    return React.forwardRef(forwardRef);
}

const FancyButton = React.forwardRef((props, ref) => {
    return (
        <button ref={ref} onClick={props.handlerClick}>
            {props.children}=>{props.num}
        </button>
    )
})

const FancyButtonWithLog = logProps(FancyButton);

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            num: 1
        }
    }

    componentDidMount() {
        console.log(this.ref.current);
    }

    handlerClick = () => {
        console.log('handlerClick');
        this.setState({
            num: this.state.num + 1
        })
    }

    render() {
        const props = {
            num: this.state.num,
            handlerClick: this.handlerClick
        }
        return (
            <div>
                <FancyButtonWithLog ref={this.ref} {...props}>Click me!!</FancyButtonWithLog>
            </div>
        )
    }
}
