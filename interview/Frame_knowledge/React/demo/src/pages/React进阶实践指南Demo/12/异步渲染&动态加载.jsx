import React from 'react';

const getUserInfo = () => {
    return new Promise(resolve => setTimeout(() => resolve({name: 'lalala'}), 2000));
};

/*
* 异步渲染的 UserInfo 组件可以直接通过 getUserInfo 请求数据，直接用数据 user 进行渲染，很显然现在是做不到的。
* 现在的异步请求方式比较繁琐，主要是是通过类组件 componentDidMount 或者函数组件 useEffect 进行数据交互，
* 获得数据后通过调用 setState 或 useState 改变 state 触发视图的更新
* 传统模式：挂载组件-> 请求数据 -> 再渲染组件
* 异步模式：请求数据-> 渲染组件
* 异步渲染相比传统数据交互相比好处:
* 1. 不再需要 componentDidMount 或 useEffect 配合做数据交互，也不会因为数据交互后，改变 state 而产生的二次更新作用
* 2. 代码逻辑更简单，清晰
*/
function UserInfo() {
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        getUserInfo().then(res => {
            setUser(res);
        });
    }, []);
    return <h1>{user && user.name}</h1>
}

// 用React.lazy动态引入组件 配合Suspense实现动态加载组件效果
// 这样利于代码分割 不会让初始化的时候加载大量的文件
const LazyComponent = React.lazy(() => import('../11/memo'));

export default () => {
    return (
        <React.Suspense fallback={<h1>loading...</h1>}>
            {/*  Suspense 让组件‘等待’异步操作，异步请求结束后在进行组件的渲染，也就是所谓的异步渲染，但是这个功能目前还在实验阶段 */}
            <UserInfo />
            <LazyComponent />
        </React.Suspense>
    )
}
