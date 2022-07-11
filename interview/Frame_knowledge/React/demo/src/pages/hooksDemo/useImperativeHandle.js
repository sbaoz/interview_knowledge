import React, {useImperativeHandle, forwardRef, useRef} from 'react'

function FancyInput(props, ref) {
    const inputRef = useRef();
    // 在函数组件使用ref时 可以用useImperativeHandle暴露自定义的实例值给父组件
    // 要和forwardRef一起使用
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));
    return <input ref={inputRef} />;
}
FancyInput = forwardRef(FancyInput);

export default function Index() {
    let inputRef = useRef();

    const handlerClick = () => {
        const {focus} = inputRef
        focus()
    }
    return (
        <div>
            <FancyInput ref={ref => inputRef = ref}/>
            <button onClick={handlerClick}>click</button>
        </div>
    )
}
