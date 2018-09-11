var http= require('http');

http.createServer(function(request, response){ //创建服务器
  // console.log(request)
  response.writeHead(200, { 'Content-Type': 'text/plain'});
  response.end('Hello World') //发送响应数据

}).listen(8080); //server run http://localhost:8080

console.log('Hello weiqi')
