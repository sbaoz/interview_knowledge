import React, {useRef, useLayoutEffect, useMemo, useState} from 'react'
import './index.less'

function useDrapDrop() {
    const lastOffset = useRef({
        x: 0,
        y: 0,
        X: 0,
        Y: 0
    })
    const currentDom = useRef(null)
    const [ignored, foceUpdate] = useState({})
    const [onTouchStart, onTouchMove, onTouchEnd] = useMemo(() => {
        const currentOffset = {}
        function onTouchStart(event) {
            const targetTouche = event.targetTouches[0]
            console.log('onTouchStart', targetTouche);
            currentOffset.X = targetTouche.clientX
            currentOffset.Y = targetTouche.clientY
        }
        function onTouchMove(event) {
            const targetTouche = event.targetTouches[0]
            console.log('onTouchMove', targetTouche);
            const x = lastOffset.current.X + targetTouche.clientX - currentOffset.X
            const y = lastOffset.current.Y + targetTouche.clientY - currentOffset.Y
            lastOffset.current.x = x
            lastOffset.current.y = y
            foceUpdate({
                x,
                y
            })
        }
        function onTouchEnd() {
            console.log('onTouchEnd');
            lastOffset.current.X = lastOffset.current.x
            lastOffset.current.Y = lastOffset.current.y
        }
        return [onTouchStart, onTouchMove, onTouchEnd]
    }, [])
    useLayoutEffect(() => {
        const dom = currentDom.current
        dom.ontouchstart = onTouchStart
        dom.ontouchmove = onTouchMove
        dom.ontouchend = onTouchEnd
    }, [])
    return [{x: lastOffset.current.x, y: lastOffset.current.y}, currentDom]
}

export default function Index() {
    const [position1, dom1] = useDrapDrop()
    const [position2, dom2] = useDrapDrop()
    return (
        <div>
            <div ref={dom1} className='ball red' style={{transform: `translate(${position1.x}px, ${position1.y}px)`}}></div>
            <div ref={dom2} className='ball blue' style={{transform: `translate(${position2.x}px, ${position2.y}px)`}}></div>
        </div>
    )
}
