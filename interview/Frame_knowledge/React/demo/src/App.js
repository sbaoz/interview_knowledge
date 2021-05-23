import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Routes from './router/index';

const pages = [
    'asynccloneelement',
];

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    setLink =() => {
        return pages.map(page => {
            return (
                <Link key={page} to={`/${page}`}>{`${page}   `}</Link>
            )
        })
    }

    render() {
        return (
            <React.Fragment>
                {/*{this.setLink()}*/}
                <Routes />
            </React.Fragment>
        )
    }
}

export default withRouter(App);
