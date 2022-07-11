import React from 'react';

// 冒泡阶段和捕获阶段
export default () => {
    const handleClick = () => {console.log('模拟冒泡阶段执行');}
    const handleClickCapture = () => {console.log('模拟捕获阶段执行');}
    return (
        <div onClick={() => console.log(1)} onClickCapture={() => console.log(2)}>
            <button onClick={handleClick} onClickCapture={handleClickCapture}>冒泡/捕获</button>
        </div>
    )
}

// 阻止冒泡 阻止默认行为
() => {
    const handleClick = (e) => {
        console.log('阻止冒泡');
        e.stopPropagation(); // 阻止事件冒泡 handleFatherClick不会触发
        e.preventDefault(); // 阻止默认行为
    }
    const handleFatherClick = () => console.log('冒泡到父级');
    return (
        <div style={{border: '1px solid red', padding: '20px'}} onClick={handleFatherClick}>
            <a href='https://www.baidu.com' onClick={handleClick}>click</a>
        </div>
    )
}