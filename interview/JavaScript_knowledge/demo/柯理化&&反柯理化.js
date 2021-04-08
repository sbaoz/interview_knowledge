// 柯理化
// function add(n1, n2) {
//     return n1 + n2
// }
//
// function curry(fn) {
//     var args = Array.prototype.slice.call(arguments, 1)
//     return function () {
//         var innerArgs = Array.prototype.slice.call(arguments)
//         var finalArgs = args.concat(innerArgs)
//         return fn.apply(null, finalArgs)
//     }
// }
//
// var curriedAdd = curry(add, 5)
// console.log(curriedAdd(5))

// let args = []
// function sum(...arg) {
//     if (arg.length === 0) {
//         return add.apply(null, args)
//     } else {
//         args.push(...arg)
//         return sum
//     }
// }
//
// function add(...args) {
//     return args.reduce(function (sum, cur) {
//         return sum + cur
//     })
// }
//
// console.log(sum(1,2)(2)(3,2)());

// function add(...args) {
//     if (args && args.length) {
//         return args.reduce(function (sum, cur) {
//             return sum + cur
//         })
//     }
//     return 0
// }
//
// // 参数收集 利用闭包把传入的参数存在args中 当满足条件后调用函数返回结果
// function curry(fn, ...arg) {
//     let args = arg || []
//     function curriedFn(...moreArg) {
//         args.push(...moreArg)
//         return curriedFn
//     }
//     // 隐式调用返回结果
//     curriedFn.toString = function () {
//         let result = fn.apply(null, args)
//         args = []
//         return result
//     }
//     // 隐式调用返回结果
//     curriedFn.valueOf = function () {
//         let result = fn.apply(null, args)
//         args = []
//         return result
//     }
//     return curriedFn
// }
//
// let curriedAdd = curry(add, 1, 2)
// console.log(curriedAdd(3, 4)(5).toString());
// console.log(curriedAdd(1).toString());


// 反柯理化 借用其他对象的方法
function Toast(option) {
    this.prompt = ''
}

Toast.prototype = {
    constructor: Toast,
    show: function () {
        console.log(this.prompt)
    }
}

let obj = {
    prompt: '新对象'
}

// 方式一
// function unCurrying(fn) {
//     return function () {
//         let args = Array.prototype.slice.call(arguments)
//         let that = args.shift()
//         return fn.apply(that, args)
//     }
// }
//
// let objShow = unCurrying(Toast.prototype.show)
// 方式二
Function.prototype.unCurrying = function () {
    let that = this
    return function () {
        return Function.prototype.call.apply(that, arguments)
    }
}

// let objShow = Toast.prototype.show.unCurrying()
//
// objShow(obj)

// 实例
// 反柯理化 判断变量类型
const fn = function () {

}
const val = 1
const typeCheck = Object.prototype.toString.unCurrying()
console.log(typeCheck(fn));
console.log(typeCheck(val));

// 柯理化 简化监听事件注册
function nodeListen(node, eventName){
    return function(fn){
        node.addEventListener(eventName, function(){
            fn.apply(this, Array.prototype.slice.call(arguments));
        }, false);
    }
}

let bodyClickListen = nodeListen(document.body, 'click');
bodyClickListen(function(){
    console.log('first listen');
});

bodyClickListen(function(){
    console.log('second listen');
});
