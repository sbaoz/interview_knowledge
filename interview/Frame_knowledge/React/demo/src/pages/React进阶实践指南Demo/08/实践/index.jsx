import React from "react";
import { HomeOutlined, SettingFilled, SmileOutlined, SyncOutlined, LoadingOutlined } from "@ant-design/icons";
import "./index.less";

const ThemeContext = React.createContext(null); // 主题颜色Context

const theme = {
  //主题颜色
  dark: {
    color: "#1890ff",
    background: "#1890ff",
    border: "1px solid blue",
    type: "dark",
  },
  light: {
    color: "#fc4838",
    background: "#fc4838",
    border: "1px solid pink",
    type: "light",
  },
};

/*
* 封装统一的 Input Checkbox Box 组件
* 组件内部消费主题颜色的context 主题改变 统一更新
* 这样就不必在每一个模块都绑定主题 统一使用主体组件就可以了
* */
function Input(props) {
  const { color, border } = React.useContext(ThemeContext);
  const { label, placeholder, id } = props;
  return (
    <div styleName="input">
      <label htmlFor={id} style={{ color }}>
        {label}：
      </label>
      <input
        type="text"
        placeholder={placeholder}
        style={{ border }}
      />
    </div>
  );
}

function Checkbox(props) {
  const { label, name, onChange } = props;
  const { type, color } = React.useContext(ThemeContext);
  return (
    <div styleName="checkbox">
      <label htmlFor={name}>{label}</label>
      <input
        type="checkbox"
        id={name}
        name={name}
        value={type}
        checked={type === name}
        style={{ color }}
        onChange={onChange}
      />
    </div>
  );
}

function Box(props) {
  return (
    <ThemeContext.Consumer>
      {(themeContextVal) => {
        const { border, color } = themeContextVal;
        return (
          <div styleName="context_box" style={{ border, color }}>
            {props.children}
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}

class App extends React.Component {
  static contextType = ThemeContext;
  render() {
    const { border, setTheme, color, background } = this.context;
    return (
      <div styleName="context_app" style={{ border, color }}>
        <div styleName="context_change_theme">
          <span>选择主题：</span>
          <Checkbox
            label="light"
            name="light"
            onChange={() => setTheme(theme.light)}
          ></Checkbox>
          <Checkbox
            label="dark"
            name="dark"
            onChange={() => setTheme(theme.dark)}
          ></Checkbox>
        </div>
        <div styleName="box_content">
          <Box>
            <Input label="姓名" placeholder="请输入姓名" />
            <button styleName="btn" style={{background}}>确定</button>
          </Box>
          <Box>
                <HomeOutlined  twoToneColor={ color } />
                <SettingFilled twoToneColor={ color } />
                <SmileOutlined twoToneColor={ color } />
                <SyncOutlined spin twoToneColor={ color } />
                <SmileOutlined twoToneColor={ color } rotate={180} />
                <LoadingOutlined twoToneColor={ color } />
          </Box>
          <Box>
            <div style={{ color: "#fff", background, height: "100%" }}>
              let us learn React!
            </div>
          </Box>
        </div>
      </div>
    );
  }
}

export default function () {
  const [themeContextVal, setThemeContextVal] = React.useState(theme.dark);
  return (
    <ThemeContext.Provider
      value={{ ...themeContextVal, setTheme: setThemeContextVal }}
    >
      <App />
    </ThemeContext.Provider>
  );
}
