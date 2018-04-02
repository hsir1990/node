
var http = require('http'); 

http.createServer((request,response) => { //c创建服务器，
	response.setHeader("Content-Type", "application/json;charset=utf-8");
	response.write('写入成功!');
	response.end('Hello World\n');
}).listen(8888, () =>{
	console.log('监听')
});


console.log('浏览器看输出');