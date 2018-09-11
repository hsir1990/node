
// 1.导入express
var express = require('express');

// 2. 创建express服务器
var server = express()

// 3. 访问服务器(get 或者 post)
// get请求
server.get('/home', function (request, response) {
  response.send('get请求成功');
})

// post请求
server.get('/', function (request, response) {
  response.send('post请求成功');
})

// 4.v绑定接口
server.listen(4040);
console.log('启动4040')