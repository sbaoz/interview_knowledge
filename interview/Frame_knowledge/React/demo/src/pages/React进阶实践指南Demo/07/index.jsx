import React, {createRef, useEffect, useRef, useState} from 'react';

function Index () {
    // 函数组件中不能使用createRef
    const ref = createRef(null);
    // const ref = useRef(null);
    const [data, setData] = useState(0);

    useEffect(() => {
        console.log(ref.current);
    });

    return (
        <div>
            data: {data}
            <button onClick={() => {
                setData(data + 1)
            }}>click</button>
            ref.current: {ref.current}
            <button onClick={() => {
                ref.current = 1
            }}>click</button>
        </div>
    )
}

export default Index;
