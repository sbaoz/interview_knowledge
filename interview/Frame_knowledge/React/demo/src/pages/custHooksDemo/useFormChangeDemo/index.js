import React, { useRef, useMemo, useReducer } from 'react'

function useFormChange() {
    // 用useRef缓存变量 在useMemo中可以获取到变化
    // 用useState的话 需要在useMemo中设置依赖项 否则拿不到变化后的值
    // 但是就失去了useMemo优化的意义
    const formData = useRef({})
    // 配合useRef 触发组件渲染
    const [ignored, forceUpdate] = useReducer((state,action) => {
        const {payload, name} = action
        switch (name) {
            case 'update':
                return state + 1
            case 'reset':
                return payload
        }
        return state
    }, 1)
    const handlerForm = useMemo(() => {
        const setFormItem = (key, value) => {
            const form = formData.current
            form[key] = value
            forceUpdate({name: 'update'})
        }
        const resetForm = () => {
            const form = formData.current
            for (let key in form) {
                form[key] = ''
            }
            forceUpdate({name: 'reset', payload: 0})
        }
        return [setFormItem, resetForm]
    }, [])
    return [formData.current, ...handlerForm]
}

export default function Index() {
    const [formData, setFormItem, resetForm] = useFormChange()
    const {
        name,
        age
    } = formData
    console.log('render', formData)
    return (
        <div>
            <input type="text" value={name || ''} onChange={(event) => setFormItem('name', event.target.value)} />
            <input type="text" value={age || ''} onChange={(event) => setFormItem('age', event.target.value)}/>
            <button onClick={() => console.log(formData)}>submit</button>
            <button onClick={resetForm}>reset</button>
        </div>
    )
}
