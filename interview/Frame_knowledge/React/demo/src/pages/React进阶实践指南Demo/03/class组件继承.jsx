import React from 'react';

/* 人类 */
class Person extends React.Component {
    constructor(props) {
        super(props);
        console.log('hello , i am person');
    }

    componentDidMount() {
        console.log(1111);
    }

    eat() {    /* 吃饭 */
    }

    sleep() {  /* 睡觉 */
    }

    ddd() {
        console.log('打豆豆');  /* 打豆豆 */
    }

    render() {
        return <div>
            大家好，我是一个person
        </div>;
    }
}

/* 程序员 */
class Programmer extends Person {
    constructor(props) {
        super(props);
        console.log('hello , i am Programmer too');
    }

    componentDidMount() {
        console.log('覆盖父类的生命周期方法');
        console.log(this);
    }

    code() { /* 敲代码 */
    }

    controlRender = () => {
        const reactElement = super.render();
        console.log(reactElement);
        const newChildren = []
        React.Children.forEach(reactElement, (item, index) => {
            console.log(item);
            const newItem = React.cloneElement(item, {key: item.type + index}, item.props.children + '!!!')
            newChildren.push(newItem);
        });
        return newChildren;
    }

    render() {
        return <div style={{marginTop: '50px'}}>
            { /* 让 Person 中的 render 执行 */}
            {
                this.controlRender()
            }
            我还是一个程序员！ { /* 添加自己的内容 */}
        </div>;
    }
}

export default Programmer;
