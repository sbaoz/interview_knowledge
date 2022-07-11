import React from 'react';

class Child1 extends React.Component {
    current = null;
    timer = null;
    poll = () => {console.log('poll')} // 轮询
    handleClick = () => { console.log('click'); } // 处理点击事件
    componentDidMount() {
        this.timer = setInterval(() => {
            this.poll(); // 2秒进行一次轮询事件
        }, 2000);
        this.current.addEventListener('click', this.handleClick);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.current.removeEventListener('click', this.handleClick);
    }
    render() {
        return (
            <div ref={ref => this.current = ref}>
                class Component
            </div>
        )
    }
}

function Child2() {
    const dom = React.useRef(null);
    const poll = () => {console.log('poll')};
    const handleClick = () => {console.log('click')};
    React.useEffect(() => {
        let timer = setInterval(() => {
            poll();
        }, 2000);
        dom.current.addEventListener('click', handleClick);
        return () => {
            clearInterval(timer);
            dom.current && dom.current.removeEventListener('click', handleClick);
        }
    }, []);
    return (
        <div ref={dom}>
            function Component
        </div>
    )
}

export default () => {
    const [showComponent, setShowComponent] = React.useState(true);
    return (
        <div>
            <button onClick={() => {setShowComponent(!showComponent);}}>showComponent</button>
            {showComponent ? <><Child1 /><Child2 /></> : null}
        </div>
    )
}