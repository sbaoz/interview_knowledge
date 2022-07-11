import React from 'react';
import styles from './styles.less';

export default () => {
    const dom = React.useRef(null);
    const changeColor = () => {
        const target = dom.current;
        target.style.backgroundColor = '#c00';
        setTimeout(() => {
            target.style.backgroundColor = 'orange';
            setTimeout(() => {
                target.style.backgroundColor = 'yellowgreen';
            }, 500);
        }, 500);
    }
    return (
        <div>
            <button onClick={changeColor}>改变颜色</button>
            <div className={styles.current} ref={dom}></div>
        </div>
    )
}