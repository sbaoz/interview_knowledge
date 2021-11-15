import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

function getUserInfo(param) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve({
        name: "lala",
      });
    }, 1000);
  });
}

const NOP = () => {};

export default function Index(param) {
  let [useInfo, setUserInfo] = useState(null);
  let [num, setNum] = useState(1);
  // react-hooks 也提供获取元素方法 useRef,它有一个参数可以作为缓存数据的初始值，返回值可以被dom元素ref标记，可以获取被标记的元素节点
  const div = useRef(null);
  // 更新用useRef缓存的数据不会触发渲染，重新渲染的时候数据也不会丢失
  let data = useRef({
    friends: ["xixi"],
    age: 18,
  });
  let data1 = {
    friends: ["xixi"],
    age: 18,
  };

  async function getUserInfoAsync(param) {
    const res = await getUserInfo(param);
    setUserInfo(res);
  }

  /*
   * useEffect的函数会在浏览器完成布局与绘制之后延迟执行
   * 适合用于常见的副作用场景
   * */
  useEffect(() => {
    console.log("useEffect在浏览器完成布局和绘制之后执行");
    console.log("didMount");
    // getUserInfo().then(res => {
    //     setUserInfo(res)
    // })
    // 使用async await需要进行一层包装
    getUserInfoAsync(param);
    // div在dom渲染完成后再移动
    // div.current.style.transform = "translateY(100px)";
    // const timer = setInterval(() => console.log(111), 3000)
    window.addEventListener("resize", NOP);
    return () => {
      console.log("willUnmount");
      // clearInterval(timer)
      window.removeEventListener("resize", NOP);
    };
  }, []);
  useEffect(() => {
    console.log("didUpdate when num is changed", num);
  }, [num]);
  useEffect(() => {
    console.log("didUpdate every time");
    console.log("useRef保存的数据", data.current);
    console.log("普通的变量数据", data1);
  });
  useLayoutEffect(() => {
    console.log("useLayoutEffect在浏览器完成布局和绘制之前执行");
    // div在dom渲染完成是已经移动好
    div.current.style.transform = "translateY(100px)";
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div ref={div} style={{ border: "1px solid #999", position: "absolute", transition: "all 3s ease 1s" }}>
        <span>{num}</span>
        <span>{useInfo && useInfo.name}</span>
        <div>
          useRef:
          {data.current.friends.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </div>
        <div>
          not useRef:
          {data1.friends.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </div>
        <button onClick={() => setNum(num + 1)}>click!</button>
        <button
          onClick={() => {
            data1.friends.push("haha");
            data.current.friends.push("haha");
          }}
        >
          click!!
        </button>
      </div>
    </div>
  );
}
