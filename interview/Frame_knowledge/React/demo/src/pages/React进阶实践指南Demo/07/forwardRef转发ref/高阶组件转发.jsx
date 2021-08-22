import React from 'react';

function HOC(Component) {
    class Wrap extends React.Component {
        render() {
            const {forwardRef, ...otherProps} = this.props;
            return <Component ref={forwardRef} {...otherProps} />;
        };
    };
    return React.forwardRef((props, ref) => {
        return <Wrap forwardRef={ref} {...props} />
    });
};

class Index extends React.Component {
    render() {
        const {content} = this.props;
        return <div>{content}</div>;
    };
};

const HocIndex = HOC(Index);

export default function () {
    const node = React.useRef(null);
    React.useEffect(() => {
        console.log(node.current);
    });
    return <HocIndex ref={node} content={'hello world'}/>;
};
