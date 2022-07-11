import React from 'react';
import { unstable_batchedUpdates, flushSync } from 'react-dom';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0
        };
    }

    /*
    * 合并处理setState
    * */
    handleClick1 = () => {
        this.setState({
            number: this.state.number + 1
        }, () => {
            console.log('callback1', this.state.number);
        });
        console.log(this.state.number);
        this.setState({
            number: this.state.number + 1
        }, () => {
            console.log('callback2', this.state.number);
        });
        console.log(this.state.number);
        this.setState({
            number: this.state.number + 1
        }, () => {
            console.log('callback3', this.state.number);
        });
        console.log(this.state.number);
    }

    /*
    * 异步操作不会合并处理setState
    * */
    handleClick2 = () => {
        setTimeout(() => {
            this.setState({
                number: this.state.number + 1
            }, () => {
                console.log('callback1', this.state.number);
            });
            console.log(this.state.number);
            this.setState({
                number: this.state.number + 1
            }, () => {
                console.log('callback2', this.state.number);
            });
            console.log(this.state.number);
            this.setState({
                number: this.state.number + 1
            }, () => {
                console.log('callback3', this.state.number);
            });
            console.log(this.state.number);
        });
    }

    /*
    * 使用unstable_batchedUpdates在异步操作时合并处理setState
    * */
    handleClick3 = () => {
        setTimeout(() => {
            unstable_batchedUpdates(() => {
                this.setState({
                    number: this.state.number + 1
                }, () => {
                    console.log('callback1', this.state.number);
                });
                console.log(this.state.number);
                this.setState({
                    number: this.state.number + 1
                }, () => {
                    console.log('callback2', this.state.number);
                });
                console.log(this.state.number);
                this.setState({
                    number: this.state.number + 1
                }, () => {
                    console.log('callback3', this.state.number);
                });
                console.log(this.state.number);
            });
        });
    }

    /*
    * 使用flushSync提升更新优先级
    * */
    handleClick4 = () => {
        setTimeout(() => {
            this.setState({
                number: this.state.number + 1
            }, () => {
                console.log('callback1', this.state.number);
            });
            console.log('setTimeout', this.state.number);
        });
        this.setState({
            number: this.state.number + 1
        }, () => {
            console.log('callback2', this.state.number);
        });
        console.log('async 1', this.state.number);
        flushSync(() => {
            this.setState({
                number: this.state.number + 1
            }, () => {
                console.log('callback3', this.state.number);
            });
            console.log('flushSync', this.state.number);
        });
        this.setState({
            number: this.state.number + 1
        }, () => {
            console.log('callback4', this.state.number);
        });
        console.log('async 2', this.state.number);
    }

    render() {
        console.log('render');
        return (
            <div onClick={this.handleClick4}>click</div>
        )
    }
}
