import React from 'react';

const ThemeContext = React.createContext(null);

class ConsumerDemo1 extends React.Component {
    render() {
        const {color, background} = this.context;
        return (
            <div style={{color, background}}>consumer</div>
        );
    };
};
// 类组件contextType方式
ConsumerDemo1.contextType = ThemeContext;

function ConsumerDemo2() {
    // 函数组件useContext方式
    const contextValue = React.useContext(ThemeContext);
    const {color, background} = contextValue;
    return (
        <div style={{color, background}}>consumer</div>
    );
};

const  ThemeConsumer = ThemeContext.Consumer;
class ConsumerDemo3 extends React.Component {
    render() {
        const {color, background} = this.props;
        return (
            <div style={{color, background}}>consumer</div>
        );
    };
};

const Son1 = () => <ConsumerDemo1 />
const Son2 = () => <ConsumerDemo2 />
// Consumer订阅消费者方式
const Son3 = () => {
    return (
        <ThemeConsumer>
            {
                (contextValue) => {
                    return (
                        <ConsumerDemo3 {...contextValue} />
                    );
                }
            }
        </ThemeConsumer>
    );
}

const ThemeProvider = ThemeContext.Provider;
export default function ProviderDemo() {
    const [contextVal, setContextVal] = React.useState({color: '#ccc', background: 'pink'});
    return (
        <div>
            <ThemeProvider value={contextVal}>
                <Son1 />
                <Son2 />
                <Son3 />
            </ThemeProvider>
        </div>
    )
}


