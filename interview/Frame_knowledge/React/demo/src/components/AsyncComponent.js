import React from 'react';
export default function (componentFactory) {
    class AsyncComponent extends React.Component {
        state = {component: null};
        async componentDidMount() {
            // let {default: component} = await new Promise(resolve => {
            //     setTimeout(() => {
            //         resolve(componentFactory())
            //     }, 1000);
            // });
            let {default: component} = await componentFactory();
            this.setState({component});
        }
        render() {
            let Comp = this.state.component;
            return Comp ? <Comp {...this.props}/> : <div>loading component</div>;
        }
    }
    return AsyncComponent;
}
