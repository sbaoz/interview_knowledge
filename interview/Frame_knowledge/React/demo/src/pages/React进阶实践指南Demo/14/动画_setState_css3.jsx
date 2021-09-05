import React from 'react';
import styles from './styles.less';

export default () => {
    const [position, setPosition] = React.useState({left: 0, top: 0});
    const changePosition = () => {
        let time = 0;
        let timer = setInterval(() => {
            if (time === 30) {
                clearInterval(timer);
            }
            setPosition({left: time * 10, top: time * 10});
            time++;
        }, 30);
    }
    const {left, top} = position;
    return (
        <div>
            <button onClick={changePosition}>改变位置</button>
            <div className={styles.current} style={{transform: `translate(${left}px, ${top}px)`}}></div>
        </div>
    )
}