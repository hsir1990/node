var url = require("url");  
  
var urlString = "http://www.baidu.com/a/b";  
  
//url的解析  
var obj = url.parse(urlString);  
// console.log(obj);  
  
var urlString = "http://www.baidu.com/a/b";  
var obj = url.parse(urlString,true);  
// console.log(obj);  

var urlString ="//foo/bar";  
var obj = url.parse(urlString,true,true);  
// console.log(obj);

//编辑url
var obj = {  
    protocol: "http:",  
    host: "127.0.0.1:8080",  
    pathname: "/a/b",  
    search: "c=d"  
}  
var str = url.format(obj);  
// console.log(str);

  
var str = url.resolve("/one/two/three","/four");  // 全部替换
console.log(str);  
  
var str = url.resolve("/one/two/three","four"); //替换最后一个/three 
console.log(str);  
  
var str = url.resolve("http://www.baidu.com","one");  //有http://是添加
console.log(str);  



