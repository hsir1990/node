const fs = require('fs');
const url = require('url');
const routerList = require('./list');
const staticServer = require('../server/static');// 静态文件服务器

const router = function(req, res, params){
    let pathname = url.parse(req.url).pathname;//pathname: '/p/a/t/h',//路径名, /a/b  


    // 关于静态文件服务器的判断
    if(pathname.startsWith('/assets/')){
        return staticServer(res, pathname);
        // startsWith判断当前字符串是否以anotherString作为开头
        // "abcd".startsWith("ab"); // true
        // "abcd".startsWith("bc"); // false
        // "abcd".endsWith("cd");  // true
        // "abcd".endsWith("e");  // false
        // "a".startsWith("a");   // true
        // "a".endsWith("a");    // true
        //但不幸的是，Javascript中没有自带这两个方法，需要的话只能自己写。当然写起来也不难就是了。（hsir亲测浏览器可以用）
        //if (typeof String.prototype.startsWith != 'function') {
        //String.prototype.startsWith = function (prefix){
        //return this.slice(0, prefix.length) === prefix;
        //};
        //}
        //String.slice()和String.substring()类似，都是获得一段子串，但有评测说slice的效率更高。这里不使用indexOf()的原因是，indexOf会扫描整个字符串，如果字符串很长，indexOf的效率就会很差。

        //if (typeof String.prototype.endsWith != 'function') {
        //String.prototype.endsWith = function(suffix) {
        //return this.indexOf(suffix, this.length - suffix.length) !== -1;
        //};
        //}
    }
    // 得到是否存在定义的路由
    let routerItem = routerList.isRouter(pathname);
    // 如果定义了该路由，那么执行定义路由的回掉函数
    if(routerItem) {
        return routerList.list[routerItem](res, pathname, params, req.method);
    }
    // 没有定义路由，那么返回404页面
    res.writeHead(404, {'Content-Type' : 'text/html'});

    fs.createReadStream(__dirname + '/../views/404.html', 'utf8').pipe(res);

}

module.exports = router;