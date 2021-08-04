import React from 'react';

function Son(props) {
    console.log(props);
    return <div>hello world</div>
}

function Father(props) {
    const fatherProps = {
        mes: 'let us learn React'
    }
    // 接收到Index传入的indexProps 混入fatherProps 传给Son
    return <Son {...props} {...fatherProps} />
}

export default function Index() {
    // 抽象 props 一般用于跨层级传递 props ，一般不需要具体指出 props 中某个属性，
    // 而是将 props 直接传入或者是抽离到子组件中
    const indexProps = {
        name: 'alien',
        age: '28'
    }

    return <Father {...indexProps} />
}
