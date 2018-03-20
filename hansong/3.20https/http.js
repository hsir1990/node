'use strict'

const http = require('http');

let servers = http.createServer((req, res) => {
    // header头控制跨域和字库
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-setHeaders", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.write('写入成功!');
    res.end('发送到浏览器显示');
}).listen(5000, () => {
    console.log('监听5000成功')
})
