import React from 'react';

/*
* 1 子组件暴露方法 fatherSay 供父组件使用，父组件通过调用方法可以设置子组件展示内容。
* 2 父组件提供给子组件 toFather，子组件调用，改变父组件展示内容，实现父 <-> 子 双向通信。
*/
class Son extends React.PureComponent {
    state = {
        fatherMsg: '',
        sonMsg: ''
    };
    fatherSay = fatherMsg => this.setState({fatherMsg});

    render() {
        const { fatherMsg, sonMsg } = this.state;
        return (
            <div>
                <div>子组件</div>
                <p>父组件消息：{fatherMsg}</p>
                <div>向父组件发送：
                    <input type="text" onChange={e => this.setState({ sonMsg: e.target.value })}/>
                </div>
                <button onClick={() => this.props.toFather(sonMsg)}>发送</button>
            </div>
        )
    }
}

export default function Father() {
    const [sonMsg, setSonMsg] = React.useState('');
    const [fatherMsg, setFatherMsg] = React.useState('');
    const sonInstance = React.useRef(null);
    const toSon = () => sonInstance.current.fatherSay(fatherMsg);

    return (
        <div>
            <div>父组件</div>
            <p>子组件消息：{sonMsg}</p>
            <div>向子组件发送：
                <input type="text" onChange={e => setFatherMsg(e.target.value)}/>
            </div>
            <button onClick={toSon}>发送</button>
            <Son ref={sonInstance} toFather={setSonMsg} />
        </div>
    )

}
