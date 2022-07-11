import React from 'react';

/*
* 1 通过 useRef 创建一个 ref 对象，通过 forwardRef 将当前 ref 对象传递给子组件。
* 2 向 Home 组件传递的 ref 对象上，绑定 form 孙组件实例，index 子组件实例，和 button DOM 元素。
*/
class Form extends React.Component {
    render() {
        return <div>Form</div>;
    };
}

class Index extends React.Component {
    form = null;
    button = null;

    componentDidMount() {
        const {forwardRef} = this.props;
        forwardRef.current = {
            form: this.form,
            button: this.button,
            index: this
        };
    }

    render() {
        return (
            <div>
                <Form ref={ref => this.form = ref} />
                <button ref={ref => this.button = ref}>click</button>
            </div>
        );
    };
}

const ForwardRefIndex = React.forwardRef((props, ref) => {
    return <Index {...props} forwardRef={ref} />
});

export default function Home() {
    const ref = React.useRef(null);
    React.useEffect(() => {
        console.log(ref.current);
    }, []);

    return <ForwardRefIndex ref={ref} />
}
