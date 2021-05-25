import React, {useMemo, useState} from 'react'

function LogMemo({num}) {
    /*
    * useMemo第二个参数和useEffect一样
    * 不设置依赖项 组件每次渲染都会执行useMemo的函数
    * 空数组 加载完成的时候执行一次
    * 设置依赖项 依赖项改变的时候执行
    * 依赖项进行的是浅比较
    * 函数内的变量保持执行时的值
    * 根据依赖项合理的颗粒化组件 可以起到优化组件的作用
    * */
    const printLog = useMemo(() => {
        console.log('printLog')
        return () => {
            console.log(num);
        }
    }, [])

    return (
        <button onClick={() => printLog()}>click!</button>
    )
}

function NumMemo({num}) {
    return useMemo(() => {
        console.log('NumMemo run')
        return (
            <span>{num}</span>
        )
    }, [num])
}

function ArrMemo({arr}) {
    return useMemo(() => {
        console.log('ArrMemo run')
        return arr.map((item, index) => <span key={index}>{item}</span>)
    }, [arr])
}

export default function Index() {
    const [num, setNum] = useState(0)
    const [arr, setArr] = useState([])

    return (
        <div>
            <ArrMemo arr={arr} />
            <NumMemo num={num} />
            <LogMemo num={num} />
            <button onClick={() => setNum(num + 1)}>click!!</button>
            <button onClick={() => {
                const tmpArr = [...arr, 'lalal']
                setArr(tmpArr)
            }}>click!!!</button>
        </div>
    )
}
