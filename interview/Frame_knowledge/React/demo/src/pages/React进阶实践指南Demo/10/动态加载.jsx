import React from 'react';
import CC from './修改渲染树';

export default class App extends React.Component {
    state = {C: null, showCC: false};
    render() {
        const {C, showCC} = this.state;
        return (
            <>
                {/* 同步引入会增加包的大小 */}
                <div>
                    <CC style={{display: showCC ? 'block' : 'none'}}/>
                    <button onClick={() => this.setState({
                        showCC: true
                    })}>non-dynamic</button>
                </div>
                {/* 异步引入会按需引入减少包的大小 */}
                <div>
                    {
                        C ? <C /> : null
                    }
                    <button onClick={() => !C ? this.setState({
                        C: dynamicHOC(() => import('./修改渲染树'))
                    }) : null}>dynamic</button>
                </div>
            </>
        );
    }
}

function dynamicHOC(loadRouter) {
    return class Dynamic extends React.Component {
        state = {Component: null};
        componentDidMount() {
            if (this.state.Component) return;
            loadRouter()
                .then(module => {
                    return module.default;
                })
                .then(Component => {
                    this.setState({Component});
                });
        }
        render() {
            const {Component} = this.state;
            return Component ? <Component {...this.props} /> : <div>Loading...</div>
        }
    }
}

