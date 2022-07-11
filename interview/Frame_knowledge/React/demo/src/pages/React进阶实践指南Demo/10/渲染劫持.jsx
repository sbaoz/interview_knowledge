import React from 'react';

class Index extends React.Component {
    render() {
        return (
            <ul>
                <li>React</li>
                <li>React</li>
                <li>React</li>
            </ul>
        )
    }
}

const HOC = (WrapComponent) => {
    return class Wrap extends WrapComponent {
        render() {
            const {loaded} = this.props;
            if (loaded) {
                return super.render();
            } else {
                return <div>loading</div>
            }
        }
    }
}

const HOCIndex = HOC(Index);

export default () => {
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => setLoaded(true), 1500);
    }, []);
    return <HOCIndex loaded={loaded} />
}
