
var http = require('http'); 

http.createServer(function(request,response){ //c创建服务器，
	response.writeHead(200,{'Content-Type': 'text/plain'});
	response.end('Hello World\n');
}).listen(8888);

console.log('浏览器看输出');