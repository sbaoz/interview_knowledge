import React, {createElement, createRef} from 'react';

function debounce(fn, delay) {
    let timer;
    return function () {
        const that = this;
        const args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn.apply(that, args);
            timer = null;
        }, delay);
    };
}

export default class ScrollView extends React.Component {
    handleScroll = event => {
        const { scroll } = this.props;
        scroll && scroll(event);
        this.handleScrollToLower();
    }

    handleScrollToLower() {
        const { scrollToLower } = this.props;
        const { scrollHeight, scrollTop, offsetHeight } = this.node.current;
        if (scrollHeight === scrollTop + offsetHeight) {
            scrollToLower && scrollToLower();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.node = createRef();
        this.handleScrollToLower = debounce(this.handleScrollToLower, 200);
    }

    // 绑定事件监听
    componentDidMount() {
        this.node.current.addEventListener('scroll', this.handleScroll);
    }

    // 解绑事件监听
    componentWillUnmount() {
        this.node.current.removeEventListener('scroll', this.handleScroll);
    }

    // 接收props 合并到state
    static getDerivedStateFromProps(nextProps) {
        const { data } = nextProps;
        return {
            list: data.list || []
        }
    }

    // 性能优化 只有列表数据发生变化时才渲染列表
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.list != this.state.list;
    }

    // 获取更新前容器的高度
    getSnapshotBeforeUpdate(prevProps, prevState) {
        return this.node.current.scrollHeight;
    }

    // 获取更新后容器的高度
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('scrollView容器高度变化:' , snapshot, this.node.current.scrollHeight);
    }

    render() {
        const { list } = this.state;
        const { component, className } = this.props;
        return (
            <div ref={this.node} className={className}>
                {
                    list.map(item => {
                        return createElement(component, {item, key: item.id});
                    })
                }
            </div>
        )
    }
};
