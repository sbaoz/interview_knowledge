import React from 'react';

function Home() {
    return <div>Home</div>
}

function HOC(Component) {
    return () => {
        return <Component />
    }
}


class Index1 extends React.PureComponent {
    render() {
        const WrapHome = HOC(Home);

        console.log(111);
        return <WrapHome />
    }
}

function Index2() {
    const WrapHome = HOC(Home);

    console.log(222);
    return <WrapHome />
}

Index2 = React.memo(Index2);

export default () => {
    const [ignore, forceUpdate] = React.useState(false);
    return (
        <div>
            <Index1 />
            <Index2 />
            <button onClick={() => forceUpdate(!ignore)}>click</button>
        </div>
    )
}