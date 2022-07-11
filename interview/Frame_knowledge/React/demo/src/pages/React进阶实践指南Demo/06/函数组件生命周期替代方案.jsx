import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';

const sleep = (t) => {
    const exitTime = new Date().getTime() + t * 1000;
    while (true) {
        if (new Date().getTime() > exitTime) return Promise.resolve();
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
        sleep(3).then(() => {
            console.log('DidUpdate 222');
        });
        return () => {
            console.log('DidUpdate 111');
        }
    });

    useEffect(() => {
        sleep(3).then(() => {
            console.log('cnt_useEffect: mounted/updated', cnt);
        });
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

    useLayoutEffect(() => {
        sleep(3).then(()=> {
            console.log('useLayoutEffect 222');
        });
        return () => {
            // commit阶段 Mutation阶段 Update时会执行useLayoutEffect的销毁函数
            console.log('useLayoutEffect 111');
        }
    });

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
