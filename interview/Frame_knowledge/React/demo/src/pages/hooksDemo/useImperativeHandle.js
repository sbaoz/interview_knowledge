import React, {useImperativeHandle, forwardRef, useRef} from 'react'

function FancyInput(props, ref) {
    const inputRef = useRef();
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
