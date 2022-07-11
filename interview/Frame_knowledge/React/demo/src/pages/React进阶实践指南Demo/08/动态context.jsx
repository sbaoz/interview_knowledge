import React from 'react';

const ThemeContext = React.createContext(null);
// 在React DevTools中展示的名字
ThemeContext.displayName = 'Theme';

function ConsumerDemo1() {
    //context改变引起渲染
    console.log('ConsumerDemo1');
    const {color, background} = React.useContext(ThemeContext);
    return (
        <div style={{color, background}}>consumer</div>
    )
}

function ConsumerDemo2(props) {
    //context改变引起渲染
    console.log('ConsumerDemo2');
    const {color, background} = props;
    return (
        <div style={{color, background}}>consumer</div>
    )
}

class ConsumerDemo3 extends React.Component {
    static contextType = ThemeContext;
    render() {
        //context改变引起渲染
        console.log('ConsumerDemo3');
        const {color, background} = this.context;
        return (
            <div style={{color, background}}>consumer</div>
        )
    }
}

function Grandson() {
    console.log('Grandson');
    return (
        <ConsumerDemo1 />
    )
}

/*
* 利用memo、pureComponent阻止子组件渲染
* */
// const Son1 = React.memo(() => {
//     console.log('Son1');
//     return <Grandson />
// });
class Son1 extends React.PureComponent {
    render() {
        console.log('Son1');
        return <Grandson />
    }
}
const ThemeConsumer = ThemeContext.Consumer;
const Son2 = React.memo(() => {
    console.log('Son2');
    return (
        <div>
            <ThemeConsumer>
                {
                    (contextValue) => {
                        //context改变引起渲染
                        console.log('Son2 ThemeConsumer');
                        return (
                            <ConsumerDemo2 {...contextValue} />
                        );
                    }
                }
            </ThemeConsumer>
        </div>
    );
});
const Son3 = () => {
    console.log('Son3');
    return <ConsumerDemo3 />
};

const ThemeProvider = ThemeContext.Provider;
export default function ProviderDemo() {
    const [contextVal, setContextVal] = React.useState({color: '#ccc', background: 'pink'});
    console.log('ProviderDemo');
    return (
        <div>
            <ThemeProvider value={contextVal}>
                <Son1 />
                <Son2 />
                {
                    /*利用useMemo缓存React element对象阻止渲染*/
                    React.useMemo(() => <Son3 />, [])
                }
            </ThemeProvider>
            <button onClick={() => setContextVal({color: '#fff', background: 'blue'})}>change theme</button>
        </div>
    )
}
