import React from 'react';
import hoistStatics from "hoist-non-react-statics";

function NoPermission() {
    return <div>NoPermission</div>
}
const PermissionContext = React.createContext([]);

function HOC1(authorization) {
    return function (Component) {
        const C = (props) => {
            console.log(`${Component.displayName} HOC1 run`)
            const {loaded, ...otherProps} = props;
            const matchPermission = (val, list) => {
                return list.indexOf(val) !== -1;
            }
            return (
                <PermissionContext.Consumer>
                    {
                        permissionList => {
                            return (
                                loaded ?
                                    (
                                        matchPermission(authorization, permissionList) ?
                                            <Component {...otherProps} /> :
                                            <NoPermission />
                                    ) :
                                    <div>loading permission</div>
                            )
                        }
                    }
                </PermissionContext.Consumer>
            )
        };
        const CC = React.forwardRef((props, ref) => {
            return <C wrappedComponentRef={ref} {...props} />
        });
        CC.displayName = Component.displayName;
        hoistStatics(CC, Component);
        return CC;
    }
}

function HOC2({color}) {
    return function (Component) {
        const C = (props) => {
            console.log(`${Component.displayName} HOC2 run`)
            return <Component {...props} style={{color}}/>
        }
        const CC = React.forwardRef((props, ref) => {
            return <C wrappedComponentRef={ref} {...props} />
        });
        CC.displayName = Component.displayName;
        hoistStatics(CC, Component);
        return CC;
    }
}

function HOC3(Component) {
    // const C = (props) => {
    //     console.log(`${Component.displayName} HOC3 run`)
    //     const isClsComponent = !!Component.prototype.isReactComponent;
    //     const displayName = Component.displayName || 'displayName not set';
    //     const refC = React.useRef(null);
    //     React.useEffect(() => {
    //         if (isClsComponent) {
    //             console.log(`${displayName}原组件实例=======>涉及到获取原始组件的实例，当前的HOC要离原始组件最近`);
    //             console.log(refC.current);
    //         } else {
    //             console.log(`${displayName}函数组件获取不到组件实例`);
    //         }
    //     }, []);
    //     return (
    //         isClsComponent ?
    //             <Component {...props} ref={refC} /> :
    //             <Component {...props} />
    //     )
    // };
    class C extends React.Component {
        constructor(props) {
            super(props);
            this.isClsComponent = !!Component.prototype.isReactComponent;
            this.displayName = Component.displayName || 'displayName not set';
            this.refC = React.createRef(null);
        }
        componentDidMount() {
            if (this.isClsComponent) {
                console.log(`${this.displayName}原组件实例=======>涉及到获取原始组件的实例，当前的HOC要离原始组件最近`);
                console.log(this.refC.current);
            } else {
                console.log(`${this.displayName}函数组件获取不到组件实例`);
            }
        };

        render() {
            console.log(`${Component.displayName} HOC3 run`)
            return (
                this.isClsComponent ?
                <Component {...this.props} ref={this.refC} /> :
                <Component {...this.props} />
            )
        };
    };
    const CC = React.forwardRef((props, ref) => {
        return <C wrappedComponentRef={ref} {...props} />
    });
    CC.displayName = Component.displayName;
    hoistStatics(CC, Component);
    return CC;
}

function HomeFunc(props) {
    const {content, wrappedComponentRef, style} = props;
    console.log(`HomeFunc render ${content}`);
    return <div ref={wrappedComponentRef} style={style}>{content}</div>
}
HomeFunc.displayName = 'HomeFunc';
HomeFunc = HOC1('HomeFunc')(HOC2({color: 'blue'})(HOC3(HomeFunc)));

@HOC1('HomeCls')
@HOC2({color: 'red'})
@HOC3
class HomeCls extends React.Component {
    static displayName = 'HomeCls';
    static staticXXX = 'staticXXX';
    componentDidMount() {
        console.log('HomeCls componentDidMount');
    }
    render() {
        const {wrappedComponentRef, content, style} = this.props;
        console.log(`HomeCls render ${content}`);
        return <div ref={wrappedComponentRef} style={style}>{content}</div>
    }
}

function getRootPermission() {
    return new Promise((resolve) => {
        setTimeout(function () {
            return resolve(['HomeCls', 'HomeFunc']);
        }, 1000);
    })
}
export default () => {
    const refHF = React.useRef(null);
    const refHC = React.useRef(null);
    const [loaded, setLoaded] = React.useState(false);
    const [rootPermission, setRootPermission] = React.useState([]);
    React.useEffect(() => {
        getRootPermission().then(response => {
            setRootPermission(response);
        }).finally(() => {
            setLoaded(true);
            console.log('原始DOM=======>');
            console.log(refHF.current);
            console.log(refHC.current);
        })
    }, []);
    return (
        <PermissionContext.Provider value={rootPermission}>
            <HomeFunc ref={refHF} content="HomeFunc" loaded={loaded} />
            <HomeCls ref={refHC} content="HomeCls" loaded={loaded} />
        </PermissionContext.Provider>
    )
}
