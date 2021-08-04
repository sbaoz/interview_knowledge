import React from 'react';

function Son(props){
    console.log(props);
    return <div> hello,world </div>;
}

function Father(props){
    // 从父组件 props 中抽离某个属性，再传递给子组件
    const { age,...fatherProps  } = props;
    return <Son  { ...fatherProps }  />;
}
function Index(){
    const indexProps = {
        name:'alien',
        age:'28',
        mes:'let us learn React !'
    }
    return <Father { ...indexProps }  />;
}

export default Index;
