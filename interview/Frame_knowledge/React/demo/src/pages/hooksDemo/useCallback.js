import React, { useEffect, useCallback, useState, memo } from 'react'

function ComponentA(props) {
    console.log('ComponentA run')
    useEffect(() => {
        props.getInfo('ComponentA')
    }, [])
    return <div>ComponentA</div>
}

const ComponentAWithMemo = memo(ComponentA)

export default function Index() {
    const [number, setNumber] = useState(1)

    const getInfo = (componentName) => {
        console.log(componentName)
    }

    /*
    * useCallback 必须配合memo、pureComponent
    * */
    const getInfoWithCallback = useCallback(getInfo, [])

    return (
        <div>
            <ComponentAWithMemo getInfo={getInfoWithCallback}/>
            <button onClick={() => setNumber(number + 1)}>增加</button>
        </div>
    )
}
