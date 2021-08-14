import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Routes from './router/index';

const pages = [
    'asynccloneelement',
];

export const GlobalContext = React.createContext('')

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            global: 'GlobalContext'
        }
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
                <GlobalContext.Provider value={this.state.global}>
                    <Routes />
                    <button onClick={() => {this.setState(state => {
                        return {
                            global: state.global + '!'
                        }
                    })}}>changeContext</button>
                </GlobalContext.Provider>
            </React.Fragment>
        )
    }
}

export default withRouter(App);
