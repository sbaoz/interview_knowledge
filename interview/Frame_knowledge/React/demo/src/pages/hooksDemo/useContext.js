import React, { createContext, useContext } from 'react'

const Context = createContext({
    name: 'xixi'
})

function ComponentA() {
    return (
        <>
            <ComponentB/>
            <ComponentC/>
        </>
    )
}

/*
* 使用useContext ，来获取父级组件传递过来的context值，这个当前值就是最近的父级组件 Provider 设置的value值，
* useContext参数一般是由 createContext 方式引入 ,也可以父级上下文context传递 ( 参数为context )。
* useContext 可以代替 context.Consumer 来获取Provider中保存的value值
* */
function ComponentB() {
    const {name} = useContext(Context)
    return (
        <div>
            get value from grand component with useContext: {name}
        </div>
    )
}

function ComponentC() {
    return (
        <Context.Consumer>
            {
                value => (
                    <div>
                        get value from grand component with Consumer: {value.name}
                    </div>
                )
            }
        </Context.Consumer>
    )
}

export default function Index() {
    return (
        <div>
            <Context.Provider value={{name: 'lala'}}>
                <ComponentA />
            </Context.Provider>
        </div>
    )
}
