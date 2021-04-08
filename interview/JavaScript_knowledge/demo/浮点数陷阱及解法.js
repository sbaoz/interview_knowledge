var a = 1.4000000000000001

// 展示
function strip(num, precision = 12) {
    console.log(num.toPrecision(precision));
    return parseFloat(num.toPrecision(precision))
}

console.log(strip(a) === 1.4);

// 运算
const Float1 = 0.1
const Float2 = 0.2
let r = Float1 + Float2

// 0.1和0.2转换成二进制会无限循环 位数限制会截掉多余的位数 出现精度损失
// 相加后因浮点数小数位的限制而截断的二进制数字在转换成十进制的时候会变成
console.log(r); // 0.30000000000000004

let r1 = (Float1 * 1000 + Float2 * 1000) / 1000
console.log(r1);
