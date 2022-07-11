import React from 'react';

/*
* PureComponent对props和state进行浅比较
* 判断是否相同 来决定是否需要重新渲染组件
* 一般用于性能调优 减少render次数
* */
export default class Index extends React.PureComponent {
    constructor(props){
        super(props)
        this.state={
            data:{
                name:'alien',
                age:28
            }
        }
    }
    handerClick= () =>{
        const { data } = this.state
        data.age++
        /*
        * 因为data在内存中的地址没有改变
        * 进行浅比较时结果相同 所以不会引起render
        * */
        this.setState({ data })
    }
    render(){
        const { data } = this.state
        return <div className="box" >
            <div className="show" >
                <div> 你的姓名是: { data.name } </div>
                <div> 年龄： { data.age  }</div>
                <button onClick={ this.handerClick } >age++</button>
            </div>
        </div>
    }
}
