import React from 'react';

// 全局只有一个 ThemeContext 两次用provider传递两个不同context
const ThemeContext = React.createContext(null);

function Son() {
    const {color, background} = React.useContext(ThemeContext);
    const [themeContextVal2] = React.useState({color: '#fff', background: 'blue'});

    return (
        <div style={{color, background, height: '100px'}}>
            第一层Provider
            {/* 下一层的provider会覆盖上一层的provider */}
            <ThemeContext.Provider value={themeContextVal2}>
                <Son2 />
            </ThemeContext.Provider>
        </div>
    )
}

function Son2() {
    // 组件获取context时候 会获取离当前组件最近的上一层Provider
    const {color, background} = React.useContext(ThemeContext);
    return (
        <div style={{color, background, margin: '10px'}}>
            第二层Provider
        </div>
    )
}

export default function ProviderDemo() {
    const [themeContextValue, setThemeContextValue] = React.useState({color: '#ccc', background: 'pink'});
    return (
        <ThemeContext.Provider value={themeContextValue}>
            <Son />
        </ThemeContext.Provider>
    )
}
