import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';

const sleep = (t) => {
    const exitTime = new Date().getTime() + t;
    while (true) {
        if (new Date().getTime() > exitTime) return;
    }
}

const Index = function(props) {
    console.log('function component render');
    const [cnt, setCnt] = useState(0);
    const [arr, setArr] = useState([]);
    const [obj, setObj] = useState({a: 1});

    useEffect(()=>{
        /* 请求数据 ， 事件监听 ， 操纵dom ， 增加定时器，延时器 */
        console.log('DidMount');
        return () => {
            /* 解除事件监听器 ，清除定时器，延时器 */
            console.log('WillUnmount');
        }
    },[]);

    useEffect(() => {
        console.log('DidUpdate');
    });

    useEffect(() => {
        console.log('cnt_useEffect: mounted/updated', cnt);
    }, [cnt]);

    useEffect(() => {
        console.log('arr_useEffect: mounted/updated', arr);
    }, [arr]);

    useEffect(() => {
        console.log('obj_useEffect: mounted/updated', obj);
    }, [obj]);

    useEffect(() => {
        console.log('obj.a_useEffect: mounted/updated', obj.a);
    }, [obj.a]);

    useEffect(() => {
        console.log('props_useEffect: mounted/updated', props);
    }, [props]);

    useEffect(() => {
        console.log('props.match.params.param_useEffect: mounted/updated', props.match.params.param);
    }, [props.match.params.param]);

    const destroy = () =>  {
        props.history.push(`/`);
    }

    const changeUrlParam = () => {
        props.history.replace(`/${cnt + 1}`);
    }

    return (
        <div>
            <div>React函数组件生命周期替代方案</div>
            <div>
                cnt: {cnt}
            </div>
            <div>
                <button onClick={() => setCnt(cnt + 1)}>setCnt</button>
            </div>
            <div>
                <button onClick={() => setArr(arr.concat(1))}>setArr</button>
            </div>
            <div>
                <button onClick={() => {
                    obj.a = obj.a + 1;
                    setObj(obj);
                }}>setObj</button>
            </div>
            <div>
                <button onClick={changeUrlParam}>changeUrlParam</button>
            </div>
            <div>
                <button onClick={destroy}>destroy</button>
            </div>
        </div>
    );
};

export default Index;
