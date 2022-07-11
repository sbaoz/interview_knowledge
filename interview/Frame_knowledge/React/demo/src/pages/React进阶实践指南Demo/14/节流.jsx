import React from 'react';
import styles from './styles.less';

function throttle(func, delay) {
    console.log('throttle bind');
    let timer = null;
    return function () {
        const that = this;
        const args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                func.apply(that, args);
                timer = null;
            }, delay);
        }
    }
}

export default () => {
    /* useCallback 防止每次组件更新都重新绑定节流函数  */
    const handleScroll = React.useCallback(throttle(() => {
        /* 可以做一些操作，比如曝光上报等 */
        console.log('滚动');
    }, 300));
    return (
        <div className={styles.scroll_box} onScroll={handleScroll}>
            <div className={styles.scroll_content}>hello world</div>
        </div>
    )
}