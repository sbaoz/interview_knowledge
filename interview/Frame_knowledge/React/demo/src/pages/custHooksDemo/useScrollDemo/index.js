import React, { useEffect, useRef, useState } from 'react'
import './index.less'

function useScroll() {
    const dom = useRef(null)
    const [scrollOptions, setScrollOptions] = useState({
        top: 0
    })
    useEffect(() => {
        window.addEventListener('scroll', handlerScroll)
        return () => {
            window.removeEventListener('scroll', handlerScroll)
        }
    }, [])

    function handlerScroll() {
        const ele = dom.current
        const scrollY = window.scrollY
        console.log(ele.offsetHeight, scrollY)
        setScrollOptions({
            top: scrollY * 5
        })
    }

    return [scrollOptions, dom]
}

export default function Index() {
    const [scrollOptions, dom] = useScroll()
    return (
        <div className='wrapper'>
            <div ref={dom} className='box' style={{transform: `translateY(${scrollOptions.top}px)`}}></div>
        </div>
    )
}
