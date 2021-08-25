import React from 'react';
import classNames from 'classnames';
import styles from './styles.less';


export default function Index() {
    const [theme, setTheme] = React.useState('light');

    return (
        <div>
            <button
                className={classNames(styles.base, theme === 'light' ? styles.light : styles.dark)}
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >change theme</button>
        </div>
    )
}
