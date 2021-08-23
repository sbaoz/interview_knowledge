import React from 'react';

const ThemeContext = React.createContext(null);

function ConsumerDemo1() {
    console.log('ConsumerDemo1');
    const {color, background} = React.useContext(ThemeContext);
    return (
        <div style={{color, background}}>consumer</div>
    )
}

function ConsumerDemo2(props) {
    console.log('ConsumerDemo2');
    const {color, background} = props;
    return (
        <div style={{color, background}}>consumer</div>
    )
}

const Son1 = React.memo(() => {
    console.log('Son1');
    return <ConsumerDemo1 />
});
const ThemeConsumer = ThemeContext.Consumer;
const Son2 = React.memo(() => {
    console.log('Son2');
    return (
        <div>
            <ThemeConsumer>
                {
                    (contextValue) => {
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

const ThemeProvider = ThemeContext.Provider;
export default function ProviderDemo() {
    const [contextVal, setContextVal] = React.useState({color: '#ccc', background: 'pink'});
    return (
        <div>
            <ThemeProvider value={contextVal}>
                <Son1 />
                <Son2 />
            </ThemeProvider>
            <button onClick={() => setContextVal({color: '#fff', background: 'blue'})}>change theme</button>
        </div>
    )
}
