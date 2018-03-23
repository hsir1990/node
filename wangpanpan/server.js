/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-03-23 10:48:05
 * @version $Id$
 */
var http = require("http");

http.createServer(function(request,response){
	// 发送 HTTP头部
	// HTTP 状态值：200：OK
	// 内容类型：text/plain
	response.writeHead(200,{'Content-Type':'text/plain'});
	// 发送响应数据"Hello World"
	response.end('Hello World\n');
}).listen(8888);
// 
console.log('Server running at http://127.0.0.1:8888/');
