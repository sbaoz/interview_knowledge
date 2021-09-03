import React from 'react';
import styles from './styles.less';

function getColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
}

function getPostion(position) {
    const {width, height} = position
    return {left: Math.ceil(Math.random() * width) + 'px', top: Math.ceil(Math.random() * height) + 'px'}
}

function Circle({ position }) {
    const style = React.useMemo(() => { //用useMemo缓存，计算出来的随机位置和色值。
        return {
            background: getColor(),
            ...getPostion(position)
        }
    }, [])
    return <div style={style} className={styles.circle} />
}

class Index extends React.Component {
    state = {
        dataList: [], //数据源列表
        renderList: [], //渲染列表
        position: {},
        eachRenderNum: 500 // 每次渲染数量
    }
    box = React.createRef();
    componentDidMount() {
        const {offsetHeight, offsetWidth} = this.box.current;
        const originList = new Array(20000).fill(1);
        const times = Math.ceil(originList.length / this.state.eachRenderNum); /* 计算需要渲染此次数*/
        this.setState({
            position: {height: offsetHeight, width: offsetWidth},
            dataList: originList
        }, () => {
            this.toRenderList(1, times);
        });
    }
    toRenderList = (index, times) => {
        if (index > times) return; /* 如果渲染完成，那么退出 */
        const {renderList} = this.state;
        renderList.push(this.renderNewList(index)); /* 通过缓存element把所有渲染完成的list缓存下来，下一次更新，直接跳过渲染 */
        this.setState({
            renderList
        });
        window.requestIdleCallback(() => { /* 用 requestIdleCallback 代替 setTimeout 浏览器空闲执行下一批渲染 */
            this.toRenderList(++index, times);
        });
        // setTimeout(() => {
        //     this.toRenderList(++index, times);
        // });
    }
    renderNewList = (index) => { /* 得到最新的渲染列表 */
        const {dataList, position, eachRenderNum} = this.state;
        const list = dataList.slice((index - 1) * eachRenderNum, index * eachRenderNum);
        return (
            <React.Fragment key={index}>
                {
                    list.map((item, index) => <Circle position={position} key={index} />)
                }
            </React.Fragment>
        )
    }
    render() {
        return (
            <div className={styles.big_data_index} ref={this.box}>
                {
                    this.state.renderList
                }
            </div>
        )
    }
}

export default () => {
    const [show, setShow] = React.useState(false);
    const [btnShow, setBtnShow] = React.useState(true);
    const handleClick = () => {
        setBtnShow(false);
        setTimeout(() => {
            setShow(true);
        }, []);
    };
    return <div>
        {btnShow && <button onClick={handleClick}>show</button>}
        {show && <Index/>}
    </div>
}
