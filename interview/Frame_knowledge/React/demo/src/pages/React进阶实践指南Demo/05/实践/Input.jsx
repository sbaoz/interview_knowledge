import React from 'react';

/* Input 组件, 负责回传value值 */
export default function Input({value, onChange}){
    const [val, setVal] = React.useState(value);

    React.useEffect(() => {
        setVal(value);
    }, [value]);

    return (
        <input
            type='text'
            value={val} // 设置value的话需要把Input改成受控组件
            onChange={
                (e) => onChange && onChange(e.target.value)
            }
        />
    );
}
/* 给Component 增加标签 */
Input.displayName = 'input';
