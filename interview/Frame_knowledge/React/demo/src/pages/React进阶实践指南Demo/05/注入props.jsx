import React from 'react';

function Son(props){
    console.log(props); // {name: "alien", age: "28"}
    return <div> hello,world </div>;
}

function Father(prop){
    // 隐式注入 一般通过 React.cloneElement 对 props.chidren 克隆再混入新的 props
    return React.cloneElement(prop.children, {mes: 'let us learn React'});
}

function Index(){
    return (
        <Father>
            {/* 显示注入props */}
            <Son  name="alien"  age="28"  />
        </Father>
    );
}

export default Index;
