import React from 'react';

const toLearn = [ { type: 1 , mes:'let us learn React' } , { type:2,mes:'let us learn Vue3.0' }  ]

/*
* 用一个 useRef 保存 type 的信息，type 改变不需要视图变化
* 按钮切换直接改变 useRef 内容
* useEffect 里面可以直接访问到改变后的 typeInfo 的内容，不需要添加依赖项
* */
export default function Index() {
    const [change, setChange] = React.useState(false);
    const typeInfo = React.useRef(toLearn[0]);
    const changeType = info => {
        typeInfo.current = info;
    };
    React.useEffect(() => {
        console.log(typeInfo.current);
    }, [change]);
    return (
        <div>
            {
                toLearn.map(item => <button key={item.type} onClick={() => changeType(item)}>{item.mes}</button>)
            }
            <button onClick={() => setChange(!change)}>click</button>
        </div>
    )
}
