import React from "react";

class Children extends React.Component {
  state = {
    numberA: 0,
    numberB: 0,
  };
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(nextProps, nextState, nextContext);
    if (
        nextState.numberA !== this.state.numberA ||
        nextState.numberB !== this.state.numberB
    ) {
      return true;
    }
    return false;
  }

  render() {
    console.log("组件渲染");
    const { numberA, numberB } = this.state;
    return (
      <div>
        <button onClick={() => this.setState({ numberA: numberA + 1 })}>
          改变state中的numA
        </button>
        <button onClick={() => this.setState({ numberB: numberB + 1 })}>
          改变state中的numB
        </button>
      </div>
    );
  }
}

export default function Home() {
  const [numberA, setNumberA] = React.useState(0);
  const [numberB, setNumberB] = React.useState(0);
  return (
    <div>
      <button onClick={() => setNumberA(numberA + 1)}>改变props中numA</button>
      <button onClick={() => setNumberB(numberB + 1)}>改变props中numB</button>
      <Children propsNumA={numberA} propsNumB={numberB} />
    </div>
  );
}
