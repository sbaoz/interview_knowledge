import React, { useState, useEffect, useMemo, useRef } from 'react'

function fetchData(payload) {
    console.log('fetchData payload:', payload);
    return new Promise(resolve => {
        setTimeout(function () {
            return resolve({
                code: 0,
                result: {
                    name: 'lala' + payload.param
                }
            })
        }, 1000)
    })
}

function useRequest(query, api) {
    const [options, setOptions] = useState({
        param: query.param
    })
    const [result, setResult] = useState({
        name: ''
    })

    const handlerQueryChange = useMemo(() => {
        return (options) => {
            console.log('handlerQueryChange', options)
            setOptions({...options})
        }
    }, [])

    const getResult = useMemo(() => {
        return async payload => {
            if (!api) return
            const data = await api(payload || {...options})
            if (data.code === 0) {
                setResult(data.result)
            }
        }
    }, [])

    useEffect(() => {
        console.log('useEffect ', options)
        getResult({...options})
    }, [options])

    return [result, handlerQueryChange]
}

export default function Index() {
    const request = useRef({param: 1})
    const [result, handlerQueryChange] = useRequest(request.current, fetchData)

    return (
        <div>
            param: {request.current.param}
            result: {result.name}
            <button onClick={() => {
                handlerQueryChange({param: ++request.current.param})
            }}>click</button>
        </div>
    )
}
