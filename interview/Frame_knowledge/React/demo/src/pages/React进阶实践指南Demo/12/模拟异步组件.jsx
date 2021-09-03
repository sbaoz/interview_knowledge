import React from 'react';

function queryApi() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                data: {
                    name: 'lalala'
                }
            });
        }, 800);
    })
}

function Test(props) {
    console.log('组件渲染');
    const {rData, age} = props;
    return (
        <div>
            <div>name: {rData.name}</div>
            <div>age: {age}</div>
        </div>
    )
}

/*
* 用AsyncComponent作为一个HOC包装组件 接受两个参数
* 1. 当前组件
* 2. 请求数据的api
* 声明一个函数给React.lazy作为回调函数 React.lazy要求这个函数必须返回一个Promise
* 在Promise里面通过调用api请求数据 然后根据返回来的数据渲染组件 接受并传递props
*/
function AsyncComponent(Component, api) {
    const AsyncComponentPromise = () => new Promise(async (resolve) => {
        const resp = await api();
        resolve({
            default: props => <Component rData={resp.data} {...props} />
        })
    })
    return React.lazy(AsyncComponentPromise);
}

export default class App extends React.Component {
    /* 需要每一次在组件内部声明，保证每次父组件挂载，都会重新请求数据 ，防止内存泄漏。 */
    LazyTest = AsyncComponent(Test, queryApi);
    render() {
        const {LazyTest} = this;
        return (
            <React.Suspense fallback={<div>loading...</div>}>
                <LazyTest age={8} />
            </React.Suspense>
        )
    }
}
