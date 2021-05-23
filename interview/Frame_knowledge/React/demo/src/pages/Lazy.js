import React, { Suspense, lazy } from 'react';

function Test() {
    return (
        <div>Lasy Test</div>
    )
}

/*
* React.lazy接收一个函数，这个函数需要动态调用import()
* 必须返回一个Promise 该Promise需要resolve一个default export的React组件
* React.lazy和Suspense技术还不支持服务端渲染，想要在服务端渲染的应用中使用，推荐使用Loadable Components这个库
* */
const LazyTest = lazy(() => {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve({
                default: function () {
                    return (<Test/>)
                }
            })
        }, 2000)
    })
})

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    fallback = () => {
        return (
            <div>fallback</div>
        )
    }


    render() {
        return (
            <div>
                {/*Suspense让组件等待某个异步操作，直到该异步操作结束即可渲染*/}
                <Suspense fallback={<div>fallback</div>}>
                    <LazyTest />
                </Suspense>
            </div>
        )
    }
}
