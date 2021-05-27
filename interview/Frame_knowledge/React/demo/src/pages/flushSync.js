import React from 'react'
import ReactDOM from 'react-dom'

export default class Index extends React.Component {
    state = {number: 0}
    handerClick = () => {
        setTimeout(() => {
            this.setState({number: this.state.number + 1})
            this.setState({number: this.state.number + 1})
        })
        this.setState({number: this.state.number + 1})
        ReactDOM.flushSync(() => {
            this.setState({number: 3})
        })
        this.setState({number: this.state.number + 1})
    }

    render() {
        const {number} = this.state
        console.log(number) // 打印什么？？
        return <div>
            <div>{number}</div>
            <button onClick={this.handerClick}>测试flushSync</button>
        </div>
    }
}
