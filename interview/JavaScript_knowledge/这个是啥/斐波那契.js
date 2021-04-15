// 1 1 2 3 5 8 13 21 ...
function fibonacci(num) {
    if (num === 1 || num === 2) {
        return 1
    }
    return fibonacci(num - 1) + fibonacci(num - 2)
}
for (let i = 1; i < 10; i++) {
    console.log(fibonacci(i));
}
