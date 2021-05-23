import React, {useState, useEffect, useRef} from 'react'

function getUserInfo(param) {
    return new Promise(resolve => {
        setTimeout(function() {
            resolve({
                name: 'lala'
            })
        }, 1000)
    })
}

export default function Index(param) {
    let [useInfo, setUserInfo] = useState(null)
    let [num, setNum] = useState(1)
    const div = useRef()
    useEffect((param) => {
        getUserInfo().then(res => {
            setUserInfo(res)
        })
        const timer = setInterval(() => console.log(111), 1000)
        console.log(div.current);
        window.addEventListener('resize', () => {})
        return function () {
            clearInterval(timer)
            window.removeEventListener('resize')
        }
    }, [param, num])

    return (
        <div ref={div}>
            <span>{num}</span>
            <span>{useInfo && useInfo.name}</span>
            <button onClick={() => setNum(num+1)}>click</button>
        </div>
    )
}
