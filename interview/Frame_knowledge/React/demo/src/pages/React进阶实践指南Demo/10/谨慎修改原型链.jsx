import React from "react";

function HOC1(Component) {
  const proDidMount = Component.prototype.componentDidMount;
  Component.prototype.componentDidMount = function () {
    console.log("劫持生命周期：componentDidMount1");
    proDidMount.call(this);
  };
  return Component;
}

function HOC2(Component) {
  const proDidMount = Component.prototype.componentDidMount;
  Component.prototype.componentDidMount = function () {
    console.log("劫持生命周期：componentDidMount2");
    proDidMount.call(this);
  };
  return Component;
}

class Index extends React.Component {
  componentDidMount() {
    console.log("谨慎修改原型链");
  }
  render() {
    return <div>谨慎修改原型链</div>;
  }
}

const HOCIndex = HOC1(HOC2(Index));

export default () => {
  return <HOCIndex />;
};
