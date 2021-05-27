import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function WrapComponent({containerDom, children}) {
    const [PortalComponent, setPortalComponent] = useState(null)
    useEffect(() => {
        // createPortal将当前组件或 element 元素的子节点，渲染到组件之外的其他地方
        setPortalComponent(createPortal(children, containerDom.current))
    }, [])
    return (
        <>
            { PortalComponent }
        </>
    )
}

export default function Index() {
    const dom = useRef(null)

    return (
        <>
            <div ref={dom}></div>
            <div>lalalal</div>
            <WrapComponent containerDom={dom}>
                <div>hello, world</div>
            </WrapComponent>
        </>
    )
}
