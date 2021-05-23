import React from 'react'

function ComponentA({ children }) {
    /*
    * 在组件中劫持children element，通过cloneElement克隆element 混入props
    * */
    const newB = React.cloneElement(children, { age: 18 })
    return <div>{newB}</div>
}

function ComponentB(props) {
    console.log(props)
    return <div>hellow world</div>
}

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ComponentA>
                    <ComponentB name="lala" />
                </ComponentA>
            </div>
        )
    }
}

