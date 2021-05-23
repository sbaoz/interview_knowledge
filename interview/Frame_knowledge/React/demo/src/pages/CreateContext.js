import React, { createContext } from 'react';


/*
* createContext用于创建一个Context对象 包括用于传递Context对象值value的Provider和接受value变化订阅的Consumer
* createContext接受一个参数defaultValue
* 如果Consumer上一级一直没有Provider 则会应用defaultValue作为value
* */
const MyContext = createContext({
    name: 'lala'
})

function ComponentB() {
    return (
        /*
        * 用Consumer订阅 来自Provider中value的改变
        * */
        <MyContext.Consumer>
            {
                value => {
                    return (
                        <div>name: {value.name}</div>
                    )
                }
            }
        </MyContext.Consumer>
    )
}

function ComponentA() {
    return (
        <ComponentB />
    )
}

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MyContext.Provider value={{
                name: 'haha'
            }}>
                <ComponentA />
            </MyContext.Provider>
        )
    }
}
