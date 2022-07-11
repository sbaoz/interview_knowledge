import React from 'react';
import styles from './styles.less';

console.log(styles);

export default () => (
    <div>
        {/*searchbtn为.css全局样式*/}
        <button className='searchbtn'>公共样式</button>
        <div className={styles.text + ' text_bg'}>全局变量</div>
        <div className={styles.text_composes}>组合样式</div>
        <div className={styles.a}>
            <span className={styles.b}>嵌套</span>
            <p>嵌套选择器</p>
        </div>
        <p>选择器</p>
    </div>
)
