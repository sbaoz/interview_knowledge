import React from 'react';

const Children = (props) => {
    return (
        <div>
            <div>hello, my name is {props.name}</div>
            <div>{props.mes}</div>
            {props.children}
        </div>
    );
}

function Container(props) {
    const containerProps = {
        name: 'alien',
        mes:'let us learn react'
    }

    return props.children.map(item => {
        if (React.isValidElement(item)) {
            return React.cloneElement(item, {...containerProps}, item.props.children);
        } else if (typeof item === 'function') {
            return item(containerProps);
        } else {
            return null;
        }
    });
}

const Index = () => {
    return (
        <Container>
            <Children>
                <div>children</div>
            </Children>
            { (containerProps) => <Children {...containerProps} name={'haha'} /> }
        </Container>
    );
}

export default Index;
