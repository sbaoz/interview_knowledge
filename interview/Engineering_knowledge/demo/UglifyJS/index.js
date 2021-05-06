const UglifyJS = require('uglify-js');

let code = `
    var a;
    var x = { b: 123 };
    a = 123,
    delete x
`;
// 通过 UglifyJS 把代码解析为 AST
let ast = UglifyJS.parse(code);
ast.figure_out_scope();
compressor = UglifyJS.Compressor();
// 转化为一颗更小的 AST 树
ast = ast.transform(compressor);
// 再把 AST 转化为代码
code = ast.print_to_string();
// var a,x={b:123};a=123,delete x;
console.log('code: ', code);
