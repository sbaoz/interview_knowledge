import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

export default function Index(props) {
    const [number, setNumber] = useState(0);
    // 监听number变化
    useEffect(() => {
        console.log('监听number变化，此时的number是:  ' + number);
    }, [number]);
    const handleClick = () => {
        setNumber(1);
        /* 高优先级更新 */
        ReactDOM.flushSync(() => {
            setNumber(2);
            console.log(number); // 在同一个函数执行上下文中 是拿不到最新的state的
        });
        /* 批量更新 */
        
        setNumber(4);
        console.log(number); // 在同一个函数执行上下文中 是拿不到最新的state的
        /* 滞后更新 ，批量更新规则被打破 */
        setTimeout(() => {
            setNumber(3);
            console.log(number); // 在同一个函数执行上下文中 是拿不到最新的state的
        });
    }
    console.log(number);
    return (
        <div>
            <span>{number}</span>
            <button onClick={handleClick}>number++</button>
        </div>
    )
}
