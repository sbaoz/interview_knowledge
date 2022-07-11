import React from 'react';

function debounce(fn, wait) {
    let timer = null;
    return function() {
        const that = this;
        const args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            fn.apply(that, args);
            timer = null;
        }, wait);
    }
}

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = debounce(this.handleChange, 300);
        this.handleClick = debounce(this.handleClick, 500);
    }
    handleClick = () => {
        console.log('点击事件-表单提交-调用接口');
    }
    handleChange = () => {
        console.log('搜索框-请求数据');
    }
    render() {
        return (
            <div>
                <input type="text" onChange={this.handleChange} />
                <button onClick={this.handleClick}>click</button>
            </div>
        )
    }
}