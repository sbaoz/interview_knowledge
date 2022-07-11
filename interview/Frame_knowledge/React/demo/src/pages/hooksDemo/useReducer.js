import React, {useReducer} from 'react'


/*
* useReducer 接受的第一个参数是一个函数，我们可以认为它就是一个reducer
* reducer的参数就是常规reducer里面的state和action 返回改变后的state
* useReducer第二个参数为state的初始值 返回一个数组
* 数组的第一项就是更新之后state的值 第二个参数是派发更新的dispatch函数
* */
function numberReducer() {
    return useReducer((state, action) => {
        const {payload, name} = action
        switch (name) {
            case 'add':
                return state + 1
            case 'sub':
                return state - 1
            case 'reset':
                return payload
        }
        return state
    }, 0)
}

export default function Index() {
    const [number, dispatchNumber] = numberReducer()
    return (
        <div>
            当前值 {number}
            <button onClick={()=>dispatchNumber({ name:'add' })}>增加</button>
            <button onClick={()=>dispatchNumber({ name:'sub' })}>减少</button>
            <button onClick={()=>dispatchNumber({ name:'reset' ,payload:666 })}>赋值</button>
        </div>
    )
}
