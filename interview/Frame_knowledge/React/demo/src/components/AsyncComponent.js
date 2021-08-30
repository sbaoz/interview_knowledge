import React from 'react';
export default function (componentFactory) {
    class AsyncComponent extends React.Component {
        constructor() {
            super();
            this.state = {component: null};
        }
        async componentDidMount() {
            let {default: component} = await new Promise(resolve => {
                setTimeout(() => {
                    resolve(componentFactory())
                }, 1000);
            });
            this.setState({component});
        }
        render() {
            let Comp = this.state.component;
            return Comp ? <Comp {...this.props}/> : <div>loading component</div>;
        }
    }
    return AsyncComponent;
}
