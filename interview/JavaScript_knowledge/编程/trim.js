String.prototype.myTrim = function () {
    var str = this;
    str = str.replace(/^\s*/, '');
    var ws = /\s/;
    var i = str.length;
    while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
}

console.log('   222  sss   '.myTrim());
