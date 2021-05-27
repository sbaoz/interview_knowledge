import React from 'react'
import ReactDOM from 'react-dom'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 1
        }
    }

    handerClick = () => {
        setTimeout(() => {
            // 回调中调用setState 不会合并处理 引发多次渲染
            // 用unstable_batchedUpdates可以批量更新
            ReactDOM.unstable_batchedUpdates(() => {
                this.setState({
                    num: this.state.num + 1
                })
                console.log(this.state.num);
                this.setState({
                    num: this.state.num + 1
                })
                console.log(this.state.num);
                this.setState({
                    num: this.state.num + 1
                })
                console.log(this.state.num);
            })
        })
    }

    render() {
        console.log('render');
        return (
            <div>
                <button onClick={this.handerClick}>click</button>
            </div>
        )
    }
}
