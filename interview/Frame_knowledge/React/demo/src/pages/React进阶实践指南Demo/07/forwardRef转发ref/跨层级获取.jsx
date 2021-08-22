import React from 'react';

function Son(props) {
    const {grandRef} = props;
    return (
        <div>
            <span ref={grandRef}>这个是想要获取的元素</span>
        </div>
    )
}

class Father extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Son grandRef={this.props.grandRef}/>
        )
    }
}

// forwardRef 把 ref 变成了可以通过 props 传递和转发
const NewFather = React.forwardRef((props, ref) => {
    return <Father grandRef={ref} {...props} />
})

export default class GrandFather extends React.Component {
    constructor(props) {
        super(props);
        this.node;
    }

    componentDidMount() {
        console.log(this.node);
    }

    render() {
        return (
            <NewFather ref={ref => this.node = ref}/>
        );
    }
}
