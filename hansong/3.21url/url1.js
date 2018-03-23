'use strict'

const url = require("url"); 

var urlString  = "http://www.baidu.com/a/b";
var obj = url.parse(urlString );
console.log(obj);  

var urlString = "http://user:password@www.baidu.com:8080/a/b?c=d&e=f#abc"; 


var obj = url.parse(urlString,true);

console.log(obj);  
console.log(obj.protocol);//协议,http:  
console.log(obj.slashes);//协议后是否有双斜杠,true  
console.log(obj.auth);//认证或授权,user:password  
console.log(obj.host);//主机名(包含端口号) www.baidu.com:8080  
console.log(obj.port);//端口号,8080  
console.log(obj.hostName);//主机名 www.baidu.com  
console.log(obj.hash);//锚点名称,#abc  
console.log(obj.search);//查询的内容(以?开头),?c=d&e=f  
console.log(obj.query);//查询内容, c=d&e=f ,当parse的第二个参宿为true时,会将query解析为对象{ c: 'd', e: 'f' }  
console.log(obj.pathName);//路径名, /a/b  
console.log(obj.path);//把pathname和search组合起来,  /a/b?c=d&e=f  
console.log(obj.href);//完整的链接地址,http://user:password@www.baidu.com:8080/a/b?c=d&e=f#abc 


//当第三个参数为true时,会把路径//后的内容作为主机名  
var urlString = '//foo/bar';
var obj = url.parse(urlString, true, true);
console.log(obj);

// url 的编码
var obj = {  
    protocol: "http:",  
    host: "127.0.0.1:8080",  
    pathname: "/a/b",  
    search: "c=d"  
}

var str = url.format(obj);

console.log(str);


//路径修改  
//url.resolve(原路径,修改路径);  
var str = url.resolve("/one/two/three","four");  
console.log(str);  
  
var str = url.resolve("/one/two/three","/four");  
console.log(str);  
  
var str = url.resolve("http://www.baidu.com","/one");  
console.log(str);  

// //导入url模块  
// var url = require("url");  
  
// var urlString = "http://www.baidu.com/a/b";  
  
// //url的解析  
// var obj = url.parse(urlString);  
// console.log(obj);  
  
// var urlString = "http://user:password@www.baidu.com:8080/a/b?c=d&e=f#abc";  
// var obj = url.parse(urlString,true);  
// console.log(obj);  
// console.log(obj.protocol);//协议,http:  
// console.log(obj.slashes);//协议后是否有双斜杠,true  
// console.log(obj.auth);//认证或授权,user:password  
// console.log(obj.host);//主机名(包含端口号) www.baidu.com:8080  
// console.log(obj.port);//端口号,8080  
// console.log(obj.hostname);//主机名 www.baidu.com  
// console.log(obj.hash);//锚点名称,#abc  
// console.log(obj.search);//查询的内容(以?开头),?c=d&e=f  
// console.log(obj.query);//查询内容, c=d&e=f ,当parse的第二个参宿为true时,会将query解析为对象{ c: 'd', e: 'f' }  
// console.log(obj.pathname);//路径名, /a/b  
// console.log(obj.path);//把pathname和search组合起来,  /a/b?c=d&e=f  
// console.log(obj.href);//完整的链接地址,http://user:password@www.baidu.com:8080/a/b?c=d&e=f#abc  
  
// //当第三个参数为true时,会把路径//后的内容作为主机名  
// var urlString ="//foo/bar";  
// var obj = url.parse(urlString,true,true);  
// console.log(obj);  
  
// //url的编码  
// var obj = {  
//     protocol: "http:",  
//     host: "127.0.0.1:8080",  
//     pathname: "/a/b",  
//     search: "c=d"  
// }  
  
// var str = url.format(obj);  
// console.log(str);  
  
// //路径修改  
// //url.resolve(原路径,修改路径);  
// var str = url.resolve("/one/two/three","four");  
// console.log(str);  
  
// var str = url.resolve("/one/two/three","/four");  
// console.log(str);  
  
// var str = url.resolve("http://www.baidu.com","/one");  
// console.log(str);  


const http = require('http');

let port = 5000;

let servers = http.createServer((req, res) => {

    res.write('写入成功');
    res.end('发送浏览器')
}).listen(port, () => {
    console.log(`监听到${port}端口`)
})



// const aa = 'aa'
// undefined
// const aa = 'bb'
// VM298:1 Uncaught SyntaxError: Identifier 'aa' has already been declared
//     at <anonymous>:1:1
// (anonymous) @ VM298:1
// var bb = 'aa'
// undefined
// var bb = 'cc'
// undefined
// let cc = 'cc'
// undefined
// cc = '22'
// "22"
// aa ='33'
// VM329:1 Uncaught TypeError: Assignment to constant variable.
//     at <anonymous>:1:4
// let 不能重复定义一个变量，但可以不停的赋值
// const 不能重复定义变量，也不可重复赋值
// var 可重复定义变量，也可重复赋值