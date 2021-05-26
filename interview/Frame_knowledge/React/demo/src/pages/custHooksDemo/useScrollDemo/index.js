import React, { useEffect, useRef, useState } from 'react'
import './index.less'

function useScroll() {
    const dom = useRef(null)
    const [scrollOptions, setScrollOptions] = useState({
        top: 0,
        opacity: 1
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
        const computerOpacty = 1 - scrollY / 160
        setScrollOptions({
            top: scrollY * 5,
            opacity: computerOpacty <= 0 ? 0 : computerOpacty
        })
    }

    return [scrollOptions, dom]
}

export default function Index() {
    const [scrollOptions, dom] = useScroll()
    const { opacity, top } = scrollOptions
    return (
        <div className='wrapper'>
            <div className='red' style={{opacity, height: `${top}px`}}></div>
            <div ref={dom} className='box' style={{transform: `translateY(${top / 5}px)`}}></div>
        </div>
    )
}
