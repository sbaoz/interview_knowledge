import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidUpdate() {
        console.log('parent componentDidUpdate');
    }

    componentDidMount() {
        console.log('parent componentDidMount')
    }

    render() {
        console.log('parents render')
        return (
            <React.Fragment>
                {/*<SetState1 />*/}
                <SetState2 />
            </React.Fragment>
        )
    }
}

class SetState1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    componentDidUpdate() {
        console.log('componentDidUpdate1');
        console.log('state1', this.state.index);
    }

    componentDidMount() {
        console.log('SetState调用setState1');
        this.setState({
            index: this.state.index + 1
        })
        console.log('state1', this.state.index);

        console.log('SetState调用setState1');
        this.setState({
            index: this.state.index + 1
        })
        console.log('state1', this.state.index);
        setTimeout(() => {
            console.log('setTimeout 调用setState1-1');
            this.setState({
                index: this.state.index + 1
            })
            console.log('setTimeout state1-1', this.state.index);
            console.log('setTimeout 调用setState1-2');
            this.setState({
                index: this.state.index + 1
            })
            console.log('setTimeout state1-2', this.state.index);
        }, 0);
    }

    render() {
        console.log('SetState1 render')
        return (
            <div>SetState1</div>
        )
    }
}

class SetState2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    componentDidUpdate() {
        console.log('componentDidUpdate2');
        console.log('state2', this.state.index);
    }

    componentDidMount() {
        console.log('componentDidMount2');
        // console.log('SetState调用setState2');
        // this.setState({
        //     index: this.state.index + 1
        // })
        // console.log('state2', this.state.index);
        //
        // console.log('SetState调用setState2');
        // this.setState({
        //     index: this.state.index + 1
        // })
        // console.log('state2', this.state.index);
        // this.setState({
        //     index: this.state.index + 1
        // }, () => {
        //     console.log('setState2 callback ', this.state.index)
        // })
        // this.setState({
        //     index: this.state.index + 1
        // }, () => {
        //     console.log('setState2 callback ', this.state.index)
        // })
        this.setState(preState => ({index: preState.index + 1}), () => {
            console.log('setState2 function callback ', this.state.index)
        })
        this.setState(preState => ({index: preState.index + 1}), () => {
            console.log('setState2 function callback ', this.state.index)
        })
    }

    render() {
        console.log('SetState2 render')
        return (
            <div>SetState2</div>
        )
    }
}
