import React from 'react';
import { RouterContext } from 'react-router-dom';
import hoistStatics from 'hoist-non-react-statics'

class Index extends React.Component {
    render() {
        console.log(this);

        return (
            <div>hello, world</div>
        )
    }
}

function WithRouter(Component) {
    const displayName = `withRouter(${Component.displayName})`;
    const C = props => {
        const {wrappedComponentRef, ...remainingProps} = props;
        return (
            <RouterContext.Consumer>
                {
                    context => {
                        return (
                            <Component 
                                {...remainingProps}
                                {...context}
                                ref={wrappedComponentRef}
                            />
                        );
                    }
                }
            </RouterContext.Consumer>
        );
    };
    C.displayName = displayName;
    C.WrappedComponent = Component;
    /* 继承静态属性 */
    return hoistStatics(C, Component);
};

const WithRouterndex = WithRouter(Index);

function HOCDemo() {
    React.useEffect(() => {
    }, []);
    return <WithRouterndex />
}

export default HOCDemo;