import React, { useState } from 'react';

const a = 1;
export default function Index() {
    // const [num, setNum] = useState(1)
    const [num, setNum] = useState(() => {
        return a === 1 ? 1 : 2
    })

    return (
        <div>
            <span>{num}</span>
            <button onClick={() => {
                setNum(num + 1);
                console.log(num);
            }
            }>click</button>
        </div>
    )
}
