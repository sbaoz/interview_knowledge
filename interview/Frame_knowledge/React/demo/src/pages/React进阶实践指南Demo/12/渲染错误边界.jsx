import React from "react";

function ErrorTest() {
  return;
}
function Test() {
  return <div>let us learn React!</div>;
}
function uploadErrorLog() {}

export default class Index extends React.Component {
  state = { hasError: false };
  // 如果存在getDerivedStateFromError生命周期钩子
  // 那么将不需要在componentDidCatch生命周期里实现降级UI
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(...arg) {
    console.log(arg);
    uploadErrorLog(arg); // 上传错误日志
    // this.setState({ // 降级UI
    //     hasError: true
    // });
  }
  render() {
    const { hasError } = this.state;
    return (
      <div>
        {hasError ? <div>组件出现错误</div> : <ErrorTest />}
        <div> hello, my name is alien! </div>
        <Test />
      </div>
    );
  }
}
