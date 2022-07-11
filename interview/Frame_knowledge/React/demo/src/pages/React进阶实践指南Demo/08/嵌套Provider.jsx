import React from 'react';

const ThemeContext = React.createContext(null);
ThemeContext.displayName = 'ThemeContext';
const LanContext = React.createContext(null);
LanContext.displayName = 'LanContext';

function ConsumerDemo() {
    return (
        <ThemeContext.Consumer>
            {
                (themeContextVal) => {
                    return (
                        <LanContext.Consumer>
                            {
                                (lanContextVal) => {
                                    const { color, background } = themeContextVal;
                                    return (
                                        <div style={{color, background}}>{lanContextVal === 'CH' ? '让我们一起学习React' : 'let us learn React'}</div>
                                    )
                                }
                            }
                        </LanContext.Consumer>
                    )
                }
            }
        </ThemeContext.Consumer>
    )
}

const Son = React.memo(() => <ConsumerDemo />);

export default function ProviderDemo() {
    const [themeContextValue, setThemeContextValue] = React.useState({color: '#ccc', background: 'pink'});
    const [lanContextValue, setLanContextValue] = React.useState('CH');
    return (
        <div>
            <ThemeContext.Provider value={themeContextValue}>
                <LanContext.Provider value={lanContextValue}>
                    <Son/>
                </LanContext.Provider>
            </ThemeContext.Provider>
            <button onClick={() => setThemeContextValue({color: '#fff', background: 'blue'})}>change theme</button>
            <button onClick={() => setLanContextValue('EN')}>change language</button>
        </div>
    )
}
