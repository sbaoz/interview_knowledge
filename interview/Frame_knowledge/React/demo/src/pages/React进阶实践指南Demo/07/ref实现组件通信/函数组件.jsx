import React from 'react';

/*
* 父组件用 ref 标记子组件，由于子组件 Son 是函数组件没有实例，所以用 forwardRef 转发 ref
* 子组件 Son 用 useImperativeHandle 接收父组件 ref，将让 input 聚焦的方法 onFocus 和 改变 input 输入框的值的方法 onChangeValue 传递给 ref
* 父组件可以通过调用 ref 下的 onFocus 和 onChangeValue 控制子组件中 input 赋值和聚焦
* */
function Son(props, ref) {
    const inputRef = React.useRef(null);
    const [inputVal, setInputVal] = React.useState('');

    React.useImperativeHandle(ref, () => {
        const handleRefs = {
            onFocus() {
                inputRef.current.focus();
            },
            onChangeValue(value) {
                setInputVal(value);
            }
        }
        return handleRefs;
    }, []);

    return (
        <div>
            <input type="text" ref={inputRef} value={inputVal} onChange={(e) => {
                setInputVal(e.targer.value);
            }} />
        </div>
    )
}

const ForwardSon = React.forwardRef(Son);

export default class Index extends React.Component {
    cur = null;
    handleClick = () => {
        const {onFocus, onChangeValue} = this.cur;
        onFocus();
        onChangeValue('hello world');
    }

    render() {
        return (
            <div>
                <ForwardSon ref={ref => this.cur = ref} />
                <button onClick={this.handleClick}>click</button>
            </div>
        )
    }
}
