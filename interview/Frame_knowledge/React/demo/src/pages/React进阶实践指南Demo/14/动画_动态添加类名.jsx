import React from 'react';
import classNames from 'classnames';
import styles from './styles.less';

export default () => {
    const [isAnimation, setAnimation] = React.useState(false);

    return (
        <div>
            <button onClick={() => setAnimation(true)}>改变颜色</button>
            <div className={classNames(styles.current, isAnimation ? styles.animation : '')}></div>
        </div>
    )
}