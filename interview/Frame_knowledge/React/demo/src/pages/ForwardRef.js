import React from 'react';


/*
* 通过forwardRef转发ref 解决高阶组件引入ref的问题
* */
function logProps(Component) {
    class LogProps extends React.Component {
        componentDidUpdate(prevProps, prevState, snapshot) {
            console.log('old props', prevProps);
            console.log('new props', this.props);
        }

        render() {
            const { forwardRef, ...rest } = this.props;
            return <Component forwardRef={forwardRef} {...rest} />;
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

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button ref={this.props.forwardRef} onClick={this.props.handlerClick}>
                {this.props.children}{this.props.num ? '=>' + this.props.num : ''}
            </button>
        )
    }
}

/*
* 隔代ref引用 需要使用forwardRef
* react不予许ref通过props传递，因为组件上已经有ref这个属性，在组件调和过程中，已经被特殊处理
* forwardRef出现就是解决这个问题，吧ref转发到自定义的forwardRef定义的属性上，让ref可以通过props传递
* */
const FancyButton = React.forwardRef((props, ref) => {
    return (
        <Button forwardRef={ref} {...props} />
    )
})

const ButtonWithLog = logProps(Button);

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.ref1 = React.createRef();
        this.ref2 = React.createRef();
        this.ref3 = null;
        this.state = {
            num: 1
        }
    }

    componentDidMount() {
        console.log(this.ref1.current);
        console.log(this.ref2.current);
        console.log(this.ref3);
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
            <div ref={ref => this.ref3 = ref}>
                <FancyButton ref={this.ref1}>Click me!</FancyButton>
                <ButtonWithLog ref={this.ref2} {...props}>Click me!!</ButtonWithLog>
            </div>
        )
    }
}
