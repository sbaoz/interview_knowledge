import React from "react";
import hoistStatics from "hoist-non-react-statics";

const ThemeContext = React.createContext();
class Index extends React.Component {
  static displayName = "Index";
  static staticXXX = "xxx";
  render() {
    const { content, color } = this.props;
    return <div style={{color}}>{content}</div>;
  }
}

function WithTheme(Component) {
  const displayName = `withRouter(${Component.displayName})`;
  const C = (props) => {
    const { wrappedComponentRef, ...remainingProps } = props;
    return (
        <ThemeContext.Consumer>
            {
                context => {
                    return (
                        <Component 
                            {...context}
                            {...remainingProps} 
                            ref={wrappedComponentRef} 
                        />
                    )
                }
            }
        </ThemeContext.Consumer>
    );
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  /* 继承静态属性 */
  hoistStatics(C, Component);
  return React.forwardRef((props, ref) => {
    return <C wrappedComponentRef={ref} {...props} />;
  });
}

const WithThemeIndex = WithTheme(Index);

function HOCDemo(props) {
  const indexRef = React.useRef(null);
  React.useEffect(() => {
    console.log(indexRef);
  }, []);
  return <WithThemeIndex ref={indexRef} content={props.content} />;
}

function App() {
  return (
    <ThemeContext.Provider value={{color: 'red'}}>
        <Index content={"hello, world"} />
        <HOCDemo content={"hello, world"} />
    </ThemeContext.Provider>
  );
}

export default App;
