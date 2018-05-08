// crypto.createHmac('sha1', app_secret).update('待加密字串').digest().toString('base64'); 
// const http = require('http');
const crypto = require('crypto');

var http = require('http');

http.createServer(function (request, response) {
    var d = new Date().getTime();
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    var cry = crypto.createHmac('sha1', 'd0c59cab-7119-4d41-b872-c213472d43e1').update('POST|/hmsm/v_1_0/safe_medication|'+d).digest().toString('base64');

    console.log(d);
    // 发送响应数据 "Hello World"
    response.end("HM /embMBCIhZvd6GP/GZWfmA==:"+cry);
    // response.end(cry);
}).listen(8888);
// 
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');