import React from 'react';

function Home(props) {
    console.log(`Home ${props.content}`);
    return <div>{props.content}</div>
}

Home = React.memo(Home);

function HOC(Component) {
    return (props) => {
        return <Component {...props} />
    }
}

class Index1 extends React.Component {
    render() {
        const WrapHome = HOC(Home);
        return <WrapHome content='class component' />
    }
}

function Index2() {
    const WrapHome = HOC(Home);
    return <WrapHome content='function component' />
}

export default () => {
    const [ignore, forceUpdate] = React.useState(null);
    return (
        <div>
            <Index1 />
            <Index2 />
            <button onClick={() => forceUpdate({})}>click</button>
        </div>
    )
}
