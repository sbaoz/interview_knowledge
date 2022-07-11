import React from 'react';

function ClickHOC(Component) {
    return function Wrap(props) {
        const dom = React.useRef(null);
        React.useEffect(() => {
            const handleClick = () => {
                console.log('发生点击事件');
            };
            dom.current.addEventListener('click', handleClick);
            return () => {
                dom.current.removeEventListener('click', handleClick);
            }
        }, []);
        return <div ref={dom}><Component {...props} /></div>
    }
}

@ClickHOC
class Index extends React.Component {
    render() {
        return (
            <div style={{border: '1px solid', width: '300px', height: '300px'}}>
                <button>组件内部点击</button>
            </div>
        )
    }
}

export default () => {
    return (
        <div>
            <Index />
            <button>组件外部点击</button>
        </div>
    )
}