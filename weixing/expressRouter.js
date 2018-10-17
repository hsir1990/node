
// 1. 导入express
var express = require('express')

// 2. 创建express服务器
var server = express()

// 3,访问服务器（get或者post）
server.get('/', function (request, response, next) {
    console.log('从数据库获取数据')
    next();
}, function (request, response) {
   response.send('get请求成功')
})

// 3.绑定端口
server.listen(4040)
console.log('启动4040')